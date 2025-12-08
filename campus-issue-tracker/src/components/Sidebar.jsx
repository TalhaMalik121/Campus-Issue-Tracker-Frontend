// import React from "react";
// import { FileText, PlusCircle, Archive, CheckCircle } from "lucide-react";

// function NavItem({ label, icon, onClick, active }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full rounded-xl p-3 flex items-center gap-3 transition-colors ${
//         active
//           ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-400"
//           : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
//       }`}
//     >
//       <span className="w-5 h-5">{icon}</span>
//       <span className="text-sm font-medium">{label}</span>
//     </button>
//   );
// }

// // 🔑 UPDATED: Added userName prop
// export default function Sidebar({ role, onNavigate, selected, closeSidebar, userName }) {
    
//     // Fallback display if userName is null, otherwise show the name.
//     const displayName = userName || role;
//     const userRoleDisplay = role !== 'Guest' ? role : 'Not Signed In';

//   return (
//     <aside className="relative h-full w-72 bg-white border-r border-gray-100 flex flex-col gap-6 p-5 dark:bg-slate-950 dark:border-slate-800 transition-colors">

//       <button
//         onClick={closeSidebar}
//         className="md:hidden absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-1 rounded-full text-base"
//       >
//         ✕
//       </button>

//       <div className="flex items-center gap-3 px-2 mt-6 md:mt-0">
//         <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 flex items-center justify-center shadow-lg">
//           <FileText className="text-white w-6 h-6" />
//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-slate-900 dark:text-white">CampusTracker</h1>
//           <p className="text-xs text-gray-500 dark:text-gray-400">Issue Management System</p>
//         </div>
//       </div>

//       <nav className="flex-1 space-y-1 mt-3">
//         <NavItem label="Dashboard" icon={<FileText />} onClick={() => onNavigate("dashboard")} active={selected === "dashboard"} />
//         <NavItem label="Create Issue" icon={<PlusCircle />} onClick={() => onNavigate("create")} active={selected === "create"} />
//         <NavItem label="In Progress" icon={<Archive />} onClick={() => onNavigate("issues")} active={selected === "issues"} />
//         <NavItem label="Resolved" icon={<CheckCircle />} onClick={() => onNavigate("resolved")} active={selected === "resolved"} />
//       </nav>

//       <div className="px-2">
//         <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-slate-900 dark:border-slate-800">
//           <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Signed in as</p>
//           {/* 🔑 FIX: Displays the user's name */}
//           <p className="font-semibold text-sm text-slate-900 dark:text-white">{displayName}</p>
//           {/* Displaying role as secondary info */}
//           {displayName !== userRoleDisplay && (
//             <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">({userRoleDisplay})</p>
//           )}
//         </div>
//       </div>

//     </aside>
//   );
// }
import React from "react";
import { FileText, PlusCircle, Archive, CheckCircle } from "lucide-react";

function NavItem({ label, icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-3 flex items-center gap-3 transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-400"
          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default function Sidebar({ role, onNavigate, selected, closeSidebar, userName }) {
    
    const displayName = userName || role;
    const userRoleDisplay = role !== 'Guest' ? role : 'Not Signed In';

  return (
    <aside className="relative h-full w-72 bg-white border-r border-gray-100 flex flex-col gap-6 p-5 dark:bg-slate-950 dark:border-slate-800 transition-colors">

      <button onClick={closeSidebar} className="md:hidden absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-1 rounded-full text-base">✕</button>

      <div className="flex items-center gap-3 px-2 mt-6 md:mt-0">
        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 flex items-center justify-center shadow-lg">
          <FileText className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">CampusTracker</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Issue Management System</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 mt-3">
        <NavItem label="Dashboard" icon={<FileText />} onClick={() => onNavigate("dashboard")} active={selected === "dashboard"} />
        
        {/* 🔑 HIDE CREATE ISSUE FOR ADMINS */}
        {role !== 'Admin' && (
            <NavItem label="Create Issue" icon={<PlusCircle />} onClick={() => onNavigate("create")} active={selected === "create"} />
        )}

        <NavItem label="In Progress" icon={<Archive />} onClick={() => onNavigate("issues")} active={selected === "issues"} />
        <NavItem label="Resolved" icon={<CheckCircle />} onClick={() => onNavigate("resolved")} active={selected === "resolved"} />
      </nav>

      <div className="px-2">
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-slate-900 dark:border-slate-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Signed in as</p>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">{displayName}</p>
          {displayName !== userRoleDisplay && (
            <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">({userRoleDisplay})</p>
          )}
        </div>
      </div>

    </aside>
  );
}