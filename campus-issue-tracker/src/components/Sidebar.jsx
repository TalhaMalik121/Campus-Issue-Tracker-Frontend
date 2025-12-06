import React from "react";
import { FileText, PlusCircle, Archive, CheckCircle } from "lucide-react";

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

export default function Sidebar({ role, onNavigate, selected }) {
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
