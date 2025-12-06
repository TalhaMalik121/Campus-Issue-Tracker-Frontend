import React, { useState } from "react";
import { Search, Bell, User, Sun, Moon, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar({ onSearch, onToggleTheme, isDark }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-8 py-4 
      bg-white/80 backdrop-blur-xl border-b border-gray-100 
      dark:bg-slate-950/80 dark:border-slate-800 transition-colors"> {/* DARK MODE MATCH: Matches body bg */}
      
      <div className="flex items-center gap-3 w-full max-w-lg">
        <div className="relative flex items-center w-full group">
          <Search className="absolute left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search issues, locations..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all 
            dark:bg-slate-900 dark:text-white dark:placeholder-gray-500 dark:focus:bg-slate-800" 
          />
        </div>
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Theme Toggle - Fixed Colors */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 
          dark:text-indigo-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications - Fixed Colors */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 
            dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
          </button>
          
          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 origin-top-right
                dark:bg-slate-900 dark:border-slate-800"
              >
                <h3 className="font-semibold mb-3 dark:text-white">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer dark:hover:bg-slate-800">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium dark:text-gray-200">New Issue Reported</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Broken projector in Room 301</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
             onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
             className="p-1 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200
             dark:hover:bg-slate-800 dark:hover:border-slate-700"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-md">
              A
            </div>
          </button>

          {/* Profile Menu */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 origin-top-right
                dark:bg-slate-900 dark:border-slate-800"
              >
                <div className="p-3 border-b border-gray-100 dark:border-slate-800 mb-2">
                  <p className="font-semibold dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@campus.edu</p>
                </div>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-600 transition dark:text-gray-300 dark:hover:bg-slate-800">
                  <Settings size={16} /> Settings
                </button>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm text-gray-600 transition mt-1 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                  <LogOut size={16} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}