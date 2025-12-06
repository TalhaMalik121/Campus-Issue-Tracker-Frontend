import React from "react";
import { Search, Bell, User } from "lucide-react";

export default function Topbar({ onSearch, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 bg-white/60 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="flex items-center gap-3 w-1/2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-full">
          <Search size={16} />
          <input onChange={(e) => onSearch(e.target.value)} placeholder="Search issues, locations, categories..." className="bg-transparent outline-none w-full text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100"><Bell /></button>
        <button className="p-2 rounded-lg hover:bg-gray-100"><User /></button>
        <button className="p-2 rounded-lg hover:bg-gray-100" onClick={onToggleTheme}>Theme</button>
      </div>
    </header>
  );
}
