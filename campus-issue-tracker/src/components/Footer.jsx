import React from "react";
import { Github, Twitter, Mail, MapPin, Phone, FileText } from "lucide-react"; 

// Helper Component for Social Icons
function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href} 
      className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 
      dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white transition-all duration-200"
    >
      {icon}
    </a>
  );
}

export default function Footer() {
  return (
    // 🔑 UPDATED BG & SHADOW: Using a slightly darker gray (100) and a subtle shadow 
    // to differentiate it clearly from the white main background in light mode.
    <footer className="w-full bg-gray-100 border-t border-gray-200 dark:bg-slate-900 dark:border-slate-800 transition-colors shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 lg:px-8">
        
        {/* SIMPLIFIED GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
          
          {/* Column 1: Brand & Contact Summary (Left) */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-500" />
              CampusTracker
            </h3>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Mail size={16} className="shrink-0 text-indigo-500" />
                    <span>support@campus.edu</span>
                </li>
                <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Phone size={16} className="shrink-0 text-indigo-500" />
                    <span>+1 (555) 123-4567</span>
                </li>
            </ul>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Submit Issue</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Resolved Issues</a></li>
            </ul>
          </div>
          
          {/* Column 3: Social/Address (Right) */}
          <div className="space-y-4 flex flex-col items-start lg:items-end text-left lg:text-right">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Connect
            </h4>
            <div className="flex gap-3">
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Mail size={18} />} href="#" />
            </div>
            <div className="flex items-start lg:justify-end gap-3 text-sm text-gray-500 dark:text-gray-400 pt-2">
                <MapPin size={18} className="shrink-0 text-indigo-500 lg:order-2" />
                <span>
                    Admin Block B, Room 101<br />
                    123 University Ave
                </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} CampusTracker System. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-xs font-medium text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}