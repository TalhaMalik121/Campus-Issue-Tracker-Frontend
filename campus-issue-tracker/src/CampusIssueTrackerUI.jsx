
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  User,
  PlusCircle,
  FileText,
  CheckCircle,
  Upload,
  Image as ImageIcon,
  Edit3,
  Archive,
  Search,
  X,
} from "lucide-react";

// NOTE: This is a single-file React UI meant as a starter full-page app.
// It uses Tailwind CSS utility classes (no colors specified here — customize your Tailwind theme for brand colors).
// Replace fetch stubs with your real API endpoints.

const mockIssues = [
  {
    id: 1,
    title: "Broken Chair in Lab 203",
    description: "A chair in lab 203 has a broken leg and is unsafe.",
    category: "Maintenance",
    location: "Lab 203",
    status: "New",
    created_by: "Ali",
    created_at: "2025-12-01T10:30:00Z",
  },
  {
    id: 2,
    title: "AC not cooling - Library",
    description: "AC unit is blowing warm air since yesterday.",
    category: "Facilities",
    location: "Central Library",
    status: "In Progress",
    created_by: "Sara",
    created_at: "2025-12-03T08:10:00Z",
  },
];

function useFakeApi() {
  const [issues, setIssues] = useState(mockIssues);
  useEffect(() => {}, []);

  async function fetchIssues() {
    // Replace with: const res = await fetch('/issues'); return await res.json();
    return issues;
  }

  async function createIssue(payload) {
    const id = Date.now();
    const newIssue = { id, ...payload, status: "New", created_at: new Date().toISOString() };
    setIssues((s) => [newIssue, ...s]);
    return newIssue;
  }

  async function updateIssueStatus(id, status) {
    setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i)));
    return { ok: true };
  }

  return { fetchIssues, createIssue, updateIssueStatus };
}

function Sidebar({ role, onNavigate, selected }) {
  return (
    <aside className="w-80 bg-white/60 backdrop-blur-md dark:bg-slate-900/50 border-r border-gray-100 dark:border-slate-800 p-5 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-400 w-12 h-12 flex items-center justify-center shadow-md">
          <FileText className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Campus Issue Tracker</h1>
          <p className="text-sm text-gray-500">Clean, fast & accessible</p>
        </div>
      </div>

      <nav className="flex-1">
        <NavItem label="Dashboard" icon={<FileText />} onClick={() => onNavigate("dashboard")} active={selected === "dashboard"} />
        <NavItem label="Create Issue" icon={<PlusCircle />} onClick={() => onNavigate("create")} active={selected === "create"} />
        <NavItem label="All Issues" icon={<Archive />} onClick={() => onNavigate("issues")} active={selected === "issues"} />
        <NavItem label="Completed" icon={<CheckCircle />} onClick={() => onNavigate("completed")} active={selected === "completed"} />
      </nav>

      <div className="text-xs text-gray-500">Signed in as <strong className="block">{role}</strong></div>
    </aside>
  );
}

function NavItem({ label, icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-3 flex items-center gap-3 hover:bg-gray-50 focus:bg-gray-50 transition ${
        active ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
      }`}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function Topbar({ onSearch, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 bg-white/60 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex items-center gap-3 w-1/2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-full">
          <Search size={16} />
          <input onChange={(e) => onSearch(e.target.value)} placeholder="Search issues, locations, categories..." className="bg-transparent outline-none w-full text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <User />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100" onClick={onToggleTheme}>
          Theme
        </button>
      </div>
    </header>
  );
}

function Dashboard({ issues, onOpenIssue }) {
  const counts = issues.reduce(
    (acc, it) => {
      acc.total++;
      acc[it.status] = (acc[it.status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Issues" value={counts.total} />
        <StatCard label="In Progress" value={counts["In Progress"] || 0} />
        <StatCard label="Completed" value={counts["Completed"] || 0} />
      </div>

      <section className="mt-6">
        <h3 className="font-medium mb-3">Latest Issues</h3>
        <div className="space-y-3">
          {issues.slice(0, 5).map((issue) => (
            <IssueCard key={issue.id} issue={issue} onOpen={() => onOpenIssue(issue)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl p-4 bg-white shadow-sm border">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function IssueCard({ issue, onOpen }) {
  return (
    <motion.button whileHover={{ scale: 1.01 }} className="w-full text-left p-4 rounded-xl bg-white border flex justify-between items-start" onClick={onOpen}>
      <div>
        <div className="flex items-center gap-3">
          <h4 className="font-semibold">{issue.title}</h4>
          <span className="text-xs text-gray-400">• {new Date(issue.created_at).toLocaleDateString()}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{issue.description}</p>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="px-2 py-1 bg-gray-100 rounded-full">{issue.category}</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">{issue.location}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm text-gray-500">{issue.status}</div>
      </div>
    </motion.button>
  );
}

function IssuesList({ issues, onOpenIssue, onUpdateStatus }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Issues</h2>
      <div className="grid grid-cols-3 gap-4">
        {issues.map((issue) => (
          <div key={issue.id} className="col-span-1">
            <IssueCard issue={issue} onOpen={() => onOpenIssue(issue)} />
            <div className="mt-2 flex gap-2">
              <select
                defaultValue={issue.status}
                onChange={(e) => onUpdateStatus(issue.id, e.target.value)}
                className="mt-2 w-full rounded-lg p-2 border"
              >
                <option>New</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateIssueForm({ onCreate }) {
  const [form, setForm] = useState({ title: "", description: "", category: "", location: "" });
  const [attachments, setAttachments] = useState([]);

  function handleFile(e) {
    const files = Array.from(e.target.files);
    setAttachments((s) => [...s, ...files]);
  }

  async function submit(e) {
    e.preventDefault();
    await onCreate({ ...form, attachments, created_by: "Current User" });
    setForm({ title: "", description: "", category: "", location: "" });
    setAttachments([]);
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Create Issue</h2>

      <div className="grid grid-cols-2 gap-4">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="p-3 border rounded-lg w-full" />
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location (e.g., Lab 101)" className="p-3 border rounded-lg w-full" />
      </div>

      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed description" className="w-full p-3 border rounded-lg h-32" />

      <div className="flex gap-3 items-center">
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category (Maintenance, Facilities...)" className="p-3 border rounded-lg w-full" />
        <label className="p-3 border rounded-lg flex items-center gap-2 cursor-pointer">
          <Upload /> Attach
          <input onChange={handleFile} type="file" className="hidden" multiple />
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {attachments.map((f, idx) => (
            <div key={idx} className="p-2 border rounded-lg text-xs">{f.name}</div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium">Create Issue</button>
      </div>
    </form>
  );
}

function IssueModal({ issue, onClose }) {
  if (!issue) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{issue.title}</h3>
            <div className="text-sm text-gray-500">{issue.location} • {issue.category}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X /></button>
        </div>

        <div className="mt-4 text-gray-700">{issue.description}</div>

        <div className="mt-4 flex gap-3 items-center">
          <div className="text-sm text-gray-500">Status:</div>
          <div className="px-3 py-1 bg-gray-100 rounded-full">{issue.status}</div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium">Comments</h4>
          <p className="text-sm text-gray-500">No comments yet — integrate comments API to enable discussion.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function CampusIssueTrackerUI() {
  const api = useFakeApi();
  const [role] = useState("Admin"); // switch to 'Student' for student view
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
                      <IssueCard key={issue.id} issue={issue} onOpen={() => setSelectedIssue(issue)} />
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
