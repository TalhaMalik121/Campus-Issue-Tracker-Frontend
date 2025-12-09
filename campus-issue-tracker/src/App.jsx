import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { api, authApi } from "./api/api";
import { AnimatePresence, motion } from "framer-motion";

// Components
import MainLayout from "./components/MainLayout";
import CreateIssueForm from "./components/CreateIssueForm";

// Pages
import DashboardPage from "./pages/DashboardPage";
import IssuesPage from "./pages/IssuesPage";
import ResolvedIssuesPage from "./pages/ResolvedIssuesPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UsersPage from "./pages/UsersPage";
import ArchivedIssuesPage from "./pages/ArchivedIssuesPage";
import ReportsPage from "./pages/ReportsPage"; // 🔑 Import

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("Guest");
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userRollNo, setUserRollNo] = useState(null); // 🔑 New State
    // 🔑 Fix: Auth Check Loading State
    const [isAuthChecking, setIsAuthChecking] = useState(true);

    const [issues, setIssues] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);
    // 🔑 NEW: Date Range & Category State
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    // --- Auth Logic ---
    const handleLogout = () => {
        authApi.logout();
        setIsLoggedIn(false);
        setRole("Guest");
        setUserName(null);
        setUserEmail(null);
        setUserRollNo(null);
        navigate('/login');
    };

    // --- Dark Mode Logic ---
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" ||
                (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // --- On Mount Check ---
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setIsLoggedIn(true);
            const user = JSON.parse(userData);
            setRole(user.role || "Admin");
            setUserName(user.name);
            setUserEmail(user.email);
            setUserRollNo(user.rollNo);
        } else {
            setIsLoggedIn(false);
            // Only redirect if we are not already on auth pages
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                navigate('/login');
            }
        }
        // 🔑 Finished Check
        setIsAuthChecking(false);
    }, [navigate]);



    // --- Data Loading ---
    const fetchAllIssues = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            const res = await api.fetchIssues();
            setIssues(res);
        } catch (err) {
            console.error("Failed to load issues:", err);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchAllIssues();
    }, [fetchAllIssues]);

    // --- CRUD Handlers ---
    const handleCreate = useCallback(async (payload) => {
        try {
            // 🔑 Attach Name and Roll No to the issue
            const author = userRollNo ? `${userName} (${userRollNo})` : userName;
            const finalPayload = { ...payload, created_by: author };

            const created = await api.createIssue(finalPayload);
            setIssues((s) => [created, ...s]);
            navigate("/"); // Navigate to dashboard after creation
        } catch (err) {
            console.error("Failed to create issue:", err);
            alert("Error creating issue.");
        }
    }, [navigate]);

    const handleUpdateStatus = useCallback(async (id, status) => {
        try {
            await api.updateIssueStatus(id, status);
            setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i)));
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    }, []);

    // --- Filter Logic ---
    const getSearchedIssues = useCallback(() => {
        // 🔑 Filter out Archived issues from the global search/filter context
        // This ensures they don't show up in Dashboard, Issues List, or Resolved view
        let filtered = issues.filter(i => i.status !== 'Archived');

        // 1. Text Search
        if (query) {
            filtered = filtered.filter((i) =>
                [i.title, i.description, i.location, i.category]
                    .join(" ")
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        }

        // 2. 🔑 Date Filter
        if (dateRange.start) {
            filtered = filtered.filter(i => new Date(i.created_at) >= new Date(dateRange.start));
        }
        if (dateRange.end) {
            // Set end date to end of day to include the selected day
            const endDate = new Date(dateRange.end);
            endDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(i => new Date(i.created_at) <= endDate);
        }

        // 3. 🔑 Category Filter
        if (selectedCategory && selectedCategory !== "All") {
            filtered = filtered.filter(i => i.category === selectedCategory);
        }

        return filtered;
    }, [query, issues, dateRange, selectedCategory]);

    const allFiltered = getSearchedIssues();

    // 🔑 PREVENT RENDER UNTIL AUTH CHECK IS DONE
    if (isAuthChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">Loading Session...</p>
                </div>
            </div>
        );
    }

    // --- Render ---
    return (
        <Routes>
            <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            {isLoggedIn ? (
                <Route
                    element={
                        <MainLayout
                            role={role}
                            setRole={setRole}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            userName={userName}
                            userEmail={userEmail}
                            handleLogout={handleLogout}
                            selectedIssue={selectedIssue}
                            setSelectedIssue={setSelectedIssue}
                            onSearch={setQuery}
                            // 🔑 Pass Filter Props
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    }
                >
                    <Route index element={
                        <DashboardPage
                            allFiltered={allFiltered}
                            setSelectedIssue={setSelectedIssue}
                            handleUpdateStatus={handleUpdateStatus}
                            role={role}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    } />
                    <Route path="issues" element={
                        <IssuesPage
                            allFiltered={allFiltered}
                            setSelectedIssue={setSelectedIssue}
                            handleUpdateStatus={handleUpdateStatus}
                            role={role}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    } />
                    <Route path="resolved" element={
                        <ResolvedIssuesPage
                            allFiltered={allFiltered}
                            setSelectedIssue={setSelectedIssue}
                            role={role}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    } />
                    <Route path="create" element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CreateIssueForm onCreate={handleCreate} />
                        </motion.div>
                    } />

                    {/* 🔑 ADMIN ROUTES */}
                    <Route path="users" element={<UsersPage role={role} />} />
                    <Route path="archives" element={
                        <ArchivedIssuesPage
                            allFiltered={issues} // Pass raw issues, waiting for filter
                            setSelectedIssue={setSelectedIssue}
                            role={role}
                        />
                    } />
                    <Route path="reports" element={<ReportsPage issues={issues} />} />  {/* 🔑 New Route */}
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}
        </Routes>
    );
}