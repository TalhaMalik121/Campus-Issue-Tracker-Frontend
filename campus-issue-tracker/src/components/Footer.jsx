import React from "react";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-10 py-8 px-4 bg-white border-t border-gray-200 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">CampusTracker</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Making campus life smoother, one issue at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors">
            <Github size={18} />
          </button>
          <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors">
            <Twitter size={18} />
          </button>
          <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors">
            <Mail size={18} />
          </button>
        </div>
      </div>
      
      {/* Copyright Line */}
      <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-slate-800 pt-4">
        &copy; {new Date().getFullYear()} CampusTracker System. All rights reserved.
      </div>
    </footer>
  );
}