import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer"; // <--- 1. Import Footer
import Dashboard from "./components/Dashboard";
import IssuesList from "./components/IssuesList";
import CreateIssueForm from "./components/CreateIssueForm";
import IssueModal from "./components/IssueModal";
import IssueCard from "./components/IssueCard";
import useFakeApi from "./api/useFakeApi";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const api = useFakeApi();
  const [role] = useState("Admin");
  const [view, setView] = useState("dashboard");
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
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

  useEffect(() => {
    (async () => {
      const res = await api.fetchIssues();
      setIssues(res);
    })();
  }, []);

  function filtered() {
    if (!query) return issues;
    return issues.filter((i) =>
      [i.title, i.description, i.location, i.category]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }

  async function handleCreate(payload) {
    const created = await api.createIssue(payload);
    setIssues((s) => [created, ...s]);
    setView("issues");
  }

  async function handleUpdateStatus(id, status) {
    await api.updateIssueStatus(id, status);
    setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block h-full shrink-0">
        <Sidebar role={role} onNavigate={setView} selected={view} />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* TOPBAR */}
        <Topbar 
          onSearch={setQuery}
          onToggleTheme={() => setDarkMode(!darkMode)}
          isDark={darkMode}
        />

        {/* SCROLLABLE PAGE CONTENT */}
        {/* Flex-col ensures Footer pushes to bottom if content is short */}
        <main className="flex-1 overflow-y-auto flex flex-col scroll-smooth pb-24 md:pb-0">
            
          {/* Content Wrapper */}
          <div className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatePresence mode="wait">
                {view === "dashboard" && (
                    <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <Dashboard issues={filtered()} onOpenIssue={setSelectedIssue} onViewAll={() => setView('issues')} />
                    </motion.div>
                )}

                {view === "issues" && (
                    <motion.div key="issues" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <IssuesList issues={filtered()} onOpenIssue={setSelectedIssue} onUpdateStatus={handleUpdateStatus} />
                    </motion.div>
                )}

                {view === "create" && (
                    <motion.div key="create" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <CreateIssueForm onCreate={handleCreate} />
                    </motion.div>
                )}

                {view === "completed" && (
                    <motion.div key="completed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Completed Issues</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {issues.filter((i) => i.status === "Completed").map((issue) => (
                            <IssueCard key={issue.id} issue={issue} onOpen={() => setSelectedIssue(issue)} />
                        ))}
                        </div>
                    </div>
                    </motion.div>
                )}
                
                {view === "profile" && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600 font-bold text-2xl">A</div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin User</h2>
                        <p>admin@campus.edu</p>
                    </div>
                )}
                </AnimatePresence>
            </div>
          </div>

          {/* FOOTER PLACEMENT */}
          <Footer /> {/* <--- 2. Place Footer here (inside main, after content div) */}

        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <MobileBottomNav view={view} onNavigate={setView} isDarkMode={isDark} />
      

      <AnimatePresence>
        {selectedIssue && (
          <IssueModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}