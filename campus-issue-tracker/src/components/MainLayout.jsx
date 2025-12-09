import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileBottomNav from "./MobileBottomNav";
import Footer from "./Footer";
import IssueModal from "./IssueModal";
import { AnimatePresence } from "framer-motion";

export default function MainLayout({
    role,
    setRole,
    darkMode,
    setDarkMode,
    userName,
    userEmail,
    handleLogout,
    selectedIssue,
    setSelectedIssue,
    onSearch,
    dateRange,
    setDateRange,
    selectedCategory,
    setSelectedCategory,
    onUpdateStatus
}) {
    const navigate = useNavigate();
    const location = useLocation();
    // 🔑 Mobile Sidebar State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Map current path to view name for sidebar highlighting (simple mapping)
    const getCurrentView = () => {
        const path = location.pathname;
        if (path === "/") return "dashboard";
        if (path === "/issues") return "issues";
        if (path === "/create") return "create";
        if (path === "/resolved") return "resolved";
        if (path === "/reports") return "reports"; // 🔑 Handle reports path
        if (path === "/users") return "users";
        if (path === "/archives") return "archives";
        return "dashboard";
    };

    const currentView = getCurrentView();

    const handleNavigate = (newView) => {
        if (newView === "dashboard") navigate("/");
        else if (newView === "issues") navigate("/issues");
        else if (newView === "create") navigate("/create");
        else if (newView === "resolved") navigate("/resolved");
        else if (newView === "reports") navigate("/reports"); // 🔑 Handle reports nav
        else if (newView === "users") navigate("/users");
        if (newView === "archives") navigate("/archives");

        // Close sidebar on navigate (mobile UX)
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden transition-colors duration-300 bg-surface-50 dark:bg-surface-950 relative selection:bg-primary-500/30 selection:text-primary-900 text-surface-900 dark:text-surface-100 font-sans">

            {/* AMBIENT BACKGROUND GRADIENTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-400/10 dark:bg-primary-600/10 blur-[120px] animate-float" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-400/10 dark:bg-violet-600/10 blur-[120px] animate-float decoration-delay-1000" style={{ animationDelay: '1s' }} />
            </div>

            <div className="hidden md:block h-full shrink-0 z-20">
                <Sidebar
                    role={role}
                    onNavigate={handleNavigate}
                    selected={currentView}
                    userName={userName}
                    closeSidebar={() => { }}
                />
            </div>

            {/* 🔑 MOBILE SIDEBAR DRAWER */}
            <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Sidebar Container */}
                <div className={`absolute top-0 left-0 bottom-0 w-72 h-full shadow-2xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar
                        role={role}
                        onNavigate={handleNavigate}
                        selected={currentView}
                        userName={userName}
                        closeSidebar={() => setIsSidebarOpen(false)}
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                <Topbar
                    userName={userName}
                    userEmail={userEmail}
                    onSearch={onSearch}
                    onToggleTheme={() => setDarkMode(!darkMode)}
                    isDark={darkMode}
                    setRole={setRole}
                    onLogout={handleLogout}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <main className="flex-1 overflow-y-auto flex flex-col scroll-smooth pb-24 md:pb-0 custom-scrollbar">
                    <div className="flex-1 p-4 md:p-8">
                        <div className="max-w-7xl mx-auto w-full">
                            <AnimatePresence mode="wait">
                                {/* The Outlet renders the child route matching the URL */}
                                <Outlet />
                            </AnimatePresence>
                        </div>
                    </div>

                    <Footer />
                </main>
            </div>

            <MobileBottomNav
                view={currentView}
                onNavigate={handleNavigate}
                isDarkMode={darkMode}
                role={role}
                onOpenMenu={() => setIsSidebarOpen(prev => !prev)}
            />

            <AnimatePresence>
                {selectedIssue && (
                    <IssueModal
                        issue={selectedIssue}
                        onClose={() => setSelectedIssue(null)}
                        onUpdateStatus={onUpdateStatus}
                        /* Need to know if user is admin to show discard button. 
                           I can verify distinct role prop or just checking if onUpdateStatus is present isn't enough.
                           MainLayout has role, pass it.
                        */
                        role={role}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
/* Note: Added 'custom-scrollbar' class to main but logic is in index.css scrollbar selectors */
