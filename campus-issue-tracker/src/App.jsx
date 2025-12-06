import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import IssuesList from "./components/IssuesList";
import CreateIssueForm from "./components/CreateIssueForm";
import IssueModal from "./components/IssueModal";
import useFakeApi from "./api/useFakeApi";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const api = useFakeApi();
  const [role] = useState("Admin");
  const [view, setView] = useState("dashboard");
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.fetchIssues();
      setIssues(res);
    })();
  }, []);

  function filtered() {
    if (!query) return issues;
    return issues.filter((i) => [i.title, i.description, i.location, i.category].join(" ").toLowerCase().includes(query.toLowerCase()));
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
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar role={role} onNavigate={setView} selected={view} />
      <div className="flex-1 flex flex-col">
        <Topbar onSearch={setQuery} onToggleTheme={() => {}} />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {view === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Dashboard issues={filtered()} onOpenIssue={(i) => setSelectedIssue(i)} />
              </motion.div>
            )}

            {view === "issues" && (
              <motion.div key="issues" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <IssuesList issues={filtered()} onOpenIssue={(i) => setSelectedIssue(i)} onUpdateStatus={handleUpdateStatus} />
              </motion.div>
            )}

            {view === "create" && (
              <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CreateIssueForm onCreate={handleCreate} />
              </motion.div>
            )}

            {view === "completed" && (
              <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Completed Issues</h2>
                  <div className="space-y-3">
                    {issues.filter((i) => i.status === "Completed").map((issue) => (
                      <Dashboard.IssueCard key={issue.id} issue={issue} onOpen={() => setSelectedIssue(issue)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>{selectedIssue && <IssueModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} />}</AnimatePresence>
    </div>
  );
}
