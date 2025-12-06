import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer";
import IssuesList from "./components/IssuesList";
import CreateIssueForm from "./components/CreateIssueForm";
import IssueModal from "./components/IssueModal";
import IssueCard from "./components/IssueCard";
import Dashboard from "./components/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

// Mock API 
const mockApi = {
  fetchIssues: async () => [
    { id: 1, title: "Broken Projector", status: "New", category: "Hardware", location: "Lab 1", description: "Projector not turning on." },
    { id: 2, title: "AC Leak", status: "In Progress", category: "Maintenance", location: "Library", description: "Water dripping from AC unit." },
    { id: 3, title: "Wifi Down", status: "Resolved", category: "Network", location: "Cafeteria", description: "Fixed router restart." }, 
    { id: 4, title: "Broken Chair", status: "New", category: "Furniture", location: "Classroom 3B", description: "Leg is loose." },
  ],
  createIssue: async (data) => ({ ...data, id: Math.random(), status: "New" }),
  updateIssueStatus: async () => {},
};

export default function App() {
  const api = mockApi;
  const [role] = useState("Admin");
  const [view, setView] = useState("dashboard");
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

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

  useEffect(() => {
    (async () => {
      const res = await api.fetchIssues();
      setIssues(res);
    })();
  }, []);

  function getSearchedIssues() {
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
    setView("dashboard"); 
  }

  async function handleUpdateStatus(id, status) {
    if (role !== "Admin") return; 
    await api.updateIssueStatus(id, status);
    setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  const allFiltered = getSearchedIssues();

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
        />

        <main className="flex-1 overflow-y-auto flex flex-col scroll-smooth pb-24 md:pb-0">
          <div className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatePresence mode="wait">
                
                {/* DASHBOARD: Stats + New Issues Only */}
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

                {/* IN PROGRESS: In Progress Issues Only */}
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

                {/* RESOLVED: Resolved Issues Only */}
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