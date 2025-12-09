import React from "react";
import { FileText, PlusCircle, Archive, CheckCircle, BarChart } from "lucide-react"; // 🔑 Import BarChart
import { motion } from "framer-motion";

function NavItem({ label, icon, onClick, active }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full rounded-xl p-3 flex items-center gap-3 transition-all duration-300 font-medium group overflow-hidden ${active
        ? "bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-900/30 dark:text-primary-300 ring-1 ring-primary-100 dark:ring-primary-800"
        : "text-surface-600 hover:bg-surface-50 dark:text-surface-400 dark:hover:bg-white/5 dark:hover:text-surface-200"
        }`}
    >
      {active && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-l-xl"
        />
      )}
      <span className={`w-5 h-5 transition-colors ${active ? 'text-primary-600 dark:text-primary-400' : 'text-surface-400 dark:text-surface-500 group-hover:text-primary-500'}`}>{icon}</span>
      <span className="text-sm">{label}</span>
    </motion.button>
  );
}

export default function Sidebar({ role, onNavigate, selected, closeSidebar, userName }) {

  const displayName = userName || role;
  const userRoleDisplay = role !== 'Guest' ? role : 'Not Signed In';

  return (
    <aside className="relative h-full w-72 flex flex-col gap-6 p-5 pb-24 md:pb-5 transition-colors z-20">

      {/* Background with Blur (Simulating Glass directly on the sidebar container) */}
      <div className="absolute inset-0 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-r border-surface-200/60 dark:border-surface-800/60 -z-10" />

      <button onClick={closeSidebar} className="md:hidden absolute top-4 right-4 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 p-2 rounded-full transition-colors">✕</button>

      <div className="flex items-center gap-3 px-2 mt-6 md:mt-0">
        <div className="rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 w-10 h-10 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <FileText className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-surface-900 dark:text-white tracking-tight">Campus<span className="text-primary-600">Tracker</span></h1>
          <p className="text-xs text-surface-500 dark:text-surface-400 font-medium">Issue Management System</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 mt-4">
        <NavItem label="Dashboard" icon={<FileText />} onClick={() => onNavigate("dashboard")} active={selected === "dashboard"} />

        {role !== 'Admin' && (
          <NavItem label="Create Issue" icon={<PlusCircle />} onClick={() => onNavigate("create")} active={selected === "create"} />
        )}

        <NavItem label="In Progress" icon={<Archive />} onClick={() => onNavigate("issues")} active={selected === "issues"} />
        <NavItem label="Resolved" icon={<CheckCircle />} onClick={() => onNavigate("resolved")} active={selected === "resolved"} />

        {/* 🔑 ADMIN LINKS */}
        {role === 'Admin' && (
          <>
            <div className="h-px bg-surface-200 dark:bg-surface-800 my-2 mx-2"></div>
            <NavItem label="Reports" icon={<BarChart />} onClick={() => onNavigate("reports")} active={selected === "reports"} /> {/* 🔑 New Link */}
            <NavItem label="Users" icon={<FileText />} onClick={() => onNavigate("users")} active={selected === "users"} />
            <NavItem label="Archives" icon={<Archive />} onClick={() => onNavigate("archives")} active={selected === "archives"} />
          </>
        )}
      </nav>

      <div className="px-2">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-surface-50 to-white border border-surface-200 shadow-sm dark:from-surface-900 dark:to-surface-950 dark:border-surface-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-sm">
              {displayName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-surface-500 dark:text-surface-400 font-medium">Signed in as</p>
              <p className="font-semibold text-sm text-surface-900 dark:text-white truncate max-w-[120px]">{displayName}</p>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}