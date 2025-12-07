import React, { useState, useEffect } from "react";
import { Search, Bell, Sun, Moon, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. ACCEPT NEW PROPS: userName and userEmail
export default function Topbar({ onSearch, onToggleTheme, isDark, onLogout, userName, userEmail }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const handleSignOut = () => {
    setShowProfile(false); 
    if (onLogout) {
      onLogout();
    }
  };

  // Helper to generate initials for the avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

    // 🔑 Ref to attach to the profile container
    const profileRef = React.useRef(null);
    const notifsRef = React.useRef(null);

    // 🔑 useEffect for click-outside logic (No change to logic)
    useEffect(() => {
        function handleClickOutside(event) {
            // Close profile dropdown if clicked outside its area
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
            // Close notification dropdown if clicked outside its area
            if (notifsRef.current && !notifsRef.current.contains(event.target)) {
                setShowNotifs(false);
            }
        }
        
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Empty dependency array ensures it runs only on mount/unmount

  return (
    // 🔑 UPDATED LIGHT MODE STYLES: 
    // - bg-gray-100/90 (less transparent, slightly darker white)
    // - shadow-sm (adds subtle separation from content)
    <header className="sticky top-0 z-30 flex flex-col justify-center px-4 md:px-8 py-4 
      bg-gray-100/90 backdrop-blur-xl border-b border-gray-200 shadow-sm
      dark:bg-slate-950/80 dark:border-slate-800 transition-colors">
      
      {/* Main Row */}
      <div className="flex items-center justify-between w-full gap-4">

        {/* 1. LOGO (Mobile Only) */}
        <div className="md:hidden font-bold text-lg text-indigo-600 dark:text-indigo-400">
          CampusTracker
        </div>

        {/* 2. DESKTOP SEARCH (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-3 w-full max-w-lg">
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

        {/* 3. RIGHT ICONS AREA */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          
          {/* Mobile Search Toggle */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
             {showMobileSearch ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 md:p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 
            dark:text-indigo-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifsRef}> {/* 🔑 ATTACH REF */}
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
              className="p-2 md:p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 
              dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            
            <AnimatePresence>
              {showNotifs && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 origin-top-right
                  dark:bg-slate-900 dark:border-slate-800"
                >
                   <h3 className="font-semibold mb-3 dark:text-white">Notifications</h3>
                   <div className="space-y-3">
                     <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer dark:hover:bg-slate-800">
                       <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                       <div>
                         <p className="text-sm font-medium dark:text-gray-200">New Issue Reported</p>
                       </div>
                     </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}> {/* 🔑 ATTACH REF */}
            <button
               onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
               className="p-1 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200
               dark:hover:bg-slate-800 dark:hover:border-slate-700"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-md">
                {/* Displays the user's initials */}
                {getInitials(userName)}
              </div>
            </button>
            
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
                    {/* DISPLAY ACTUAL USER NAME */}
                    <p className="font-semibold dark:text-white">{userName || 'User'}</p>
                    {/* DISPLAY ACTUAL USER EMAIL */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail || 'email@example.com'}</p>
                  </div>
                    {/* REMOVED: Settings button removed here */}
                  <button 
                         onClick={handleSignOut}
                         className="w-full flex items-center gap-2 p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm text-gray-600 transition dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Input (No Change) */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="md:hidden w-full overflow-hidden"
          >
            <div className="relative flex items-center w-full group">
              <Search className="absolute left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                autoFocus
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search issues..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all 
                dark:bg-slate-900 dark:text-white dark:placeholder-gray-500 dark:focus:bg-slate-800" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}