import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer";
import IssuesList from "./components/IssuesList";
import CreateIssueForm from "./components/CreateIssueForm";
import IssueModal from "./components/IssueModal";
import IssueCard from "./components/IssueCard";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login"; // Import the pages from the previous step
import Signup from "./pages/Signup"; // Import the pages from the previous step
import { AnimatePresence, motion } from "framer-motion";
import { api,authApi } from "./api/api"; 
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';// IMPORT THE REAL API (Needs update for auth headers)

// --- Define the Authenticated App Component ---
function AuthenticatedApp({ role, setRole, issues, setIssues, query, setQuery, view, setView, darkMode, setDarkMode, selectedIssue, setSelectedIssue, handleCreate, handleUpdateStatus, allFiltered,handleLogout }) {
    
    // This is the core application structure you provided, now wrapped in a function
    // to separate it from the router logic.

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
            
            <div className="hidden md:block h-full shrink-0">
                <Sidebar role={role} onNavigate={setView} selected={view} />
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <Topbar 
                    onSearch={setQuery}
                    onToggleTheme={() => setDarkMode(!darkMode)}
                    isDark={darkMode}
                    setRole={setRole}
                    onLogout={handleLogout} // Pass role setter for logout logic
                />

                <main className="flex-1 overflow-y-auto flex flex-col scroll-smooth pb-24 md:pb-0">
                    <div className="flex-1 p-4 md:p-8">
                        <div className="max-w-7xl mx-auto w-full">
                            <AnimatePresence mode="wait">
                            
                            {/* DASHBOARD */}
                            {view === "dashboard" && (
                                <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                    <Dashboard issues={allFiltered} />
                                    
                                    <div className="mt-8 mb-6">
                                        <h2 className="text-2xl font-bold tracking-tight">New Issues</h2>
                                        <p className="text-gray-500 dark:text-gray-400">Issues that need to be reviewed.</p>
                                    </div>
                                    
                                    <IssuesList 
                                        issues={allFiltered.filter(i => i.status === "New")} 
                                        onOpenIssue={setSelectedIssue} 
                                        onUpdateStatus={handleUpdateStatus} 
                                    />
                                </motion.div>
                            )}

                            {/* IN PROGRESS */}
                            {view === "issues" && (
                                <motion.div key="issues" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                    <div className="mb-6">
                                        <h2 className="text-3xl font-bold tracking-tight">In Progress</h2>
                                        <p className="text-gray-500 dark:text-gray-400">Issues currently being worked on.</p>
                                    </div>
                                    
                                    <IssuesList 
                                        issues={allFiltered.filter(i => i.status === "In Progress")} 
                                        onOpenIssue={setSelectedIssue} 
                                        onUpdateStatus={handleUpdateStatus} 
                                    />
                                </motion.div>
                            )}

                            {/* CREATE */}
                            {view === "create" && (
                                <motion.div key="create" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                    <CreateIssueForm onCreate={handleCreate} />
                                </motion.div>
                            )}

                            {/* RESOLVED */}
                            {view === "resolved" && (
                                <motion.div key="resolved" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold tracking-tight">Resolved Issues</h2>
                                    <p className="text-gray-500 dark:text-gray-400">History of completed tasks.</p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {allFiltered.filter((i) => i.status === "Resolved").length > 0 ? (
                                            allFiltered.filter((i) => i.status === "Resolved").map((issue) => (
                                                <IssueCard key={issue.id} issue={issue} onOpen={() => setSelectedIssue(issue)} />
                                            ))
                                        ) : (
                                            <p className="col-span-full text-gray-500 text-center py-10">No resolved issues found.</p>
                                        )}
                                    </div>
                                </div>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <Footer />
                </main>
            </div>

            <MobileBottomNav view={view} onNavigate={setView} isDarkMode={darkMode} />
            
            <AnimatePresence>
                {selectedIssue && (
                    <IssueModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

// --- The Root App Component with Router and Auth Logic ---
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("Guest"); // Use "Guest" before login
    const [view, setView] = useState("dashboard");
    const [issues, setIssues] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);
    const navigate = useNavigate(); // Get navigate from router


    const handleLogout = () => {
    // This is the function definition that was missing or misplaced
    authApi.logout(); 
    setIsLoggedIn(false);
    setRole("Guest");
    navigate('/login'); 
    };

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" || 
            (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        return false;
    });

    // --- Dark Mode Logic (Keep as is) ---
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // --- AUTH CHECK: Check for Token on Mount ---
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setIsLoggedIn(true);
            const user = JSON.parse(userData);
            // In a real app, you would fetch the user's role from a protected API route. 
            // For now, we hardcode Admin/User or use a fallback.
            setRole(user.role || "Admin"); 
        } else {
            setIsLoggedIn(false);
            setRole("Guest");
            // Automatically redirect to login if no token is found on the root path
            if (window.location.pathname === '/') {
                navigate('/login');
            }
        }
    }, [navigate]);
    
    // --- Data Loading Logic (Now dependent on login state) ---
    const fetchAllIssues = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            // Note: api.fetchIssues must be updated to include the Authorization header!
            const res = await api.fetchIssues(); 
            setIssues(res);
        } catch (err) {
            console.error("Failed to load issues:", err);
            // Handle 401 Unauthorized errors here (e.g., localStorage.clear(), navigate('/login'))
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchAllIssues();
    }, [fetchAllIssues]);


    // --- CRUD Handlers (Keep as is, but ensure API uses token) ---
    const handleCreate = useCallback(async (payload) => {
        try {
            // Note: api.createIssue must be updated to include the Authorization header!
            const created = await api.createIssue(payload); 
            setIssues((s) => [created, ...s]);
            setView("dashboard"); 
        } catch (err) {
            console.error("Failed to create issue:", err);
            alert("Error creating issue.");
        }
    }, []);

    const handleUpdateStatus = useCallback(async (id, status) => {
        // if (role !== "Admin") return; 
        try {
            // Note: api.updateIssueStatus must be updated to include the Authorization header!
            await api.updateIssueStatus(id, status); 
            setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i)));
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    }, []);

    // --- Filter Logic (Keep as is) ---
    const getSearchedIssues = useCallback(() => {
        if (!query) return issues;
        return issues.filter((i) =>
            [i.title, i.description, i.location, i.category]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
        );
    }, [query, issues]);

    const allFiltered = getSearchedIssues();

    // --- Render Logic ---
    if (!isLoggedIn) {
        // Display Login/Signup routes if not logged in
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
                    {/* Default redirect to login for any other unauthorized path */}
                    <Route path="*" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} /> 
                </Routes>
            </div>
        );
    }
    
    // Display the main app structure if logged in
    return (
        <Routes>
            <Route path="/" element={
                <AuthenticatedApp
                    role={role} setRole={setRole}
                    issues={issues} setIssues={setIssues}
                    query={query} setQuery={setQuery}
                    view={view} setView={setView}
                    darkMode={darkMode} setDarkMode={setDarkMode}
                    selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}
                    handleCreate={handleCreate} handleUpdateStatus={handleUpdateStatus}
                    allFiltered={allFiltered}
                    handleLogout={handleLogout}
                />
            } />
            {/* Catch any route that is not '/' and redirect */}
            <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
    );
}