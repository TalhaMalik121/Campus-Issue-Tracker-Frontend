import React from "react";
import { Github, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 dark:bg-slate-950 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:px-8">
        
        {/* Adjusted Grid: Now 2 columns instead of 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              CampusTracker
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              Streamlining campus maintenance and issue resolution. A central hub for students, faculty, and facility management.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Mail size={18} />} href="#" />
            </div>
          </div>

          {/* Column 2: Contact Info */}
          {/* md:items-end md:text-right pushes this to the right on desktop for better balance */}
          <div className="flex flex-col md:items-end md:text-right">
            <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Contact Us
                </h4>
                <ul className="space-y-3">
                <li className="flex items-start md:justify-end gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={18} className="shrink-0 text-indigo-500 md:order-2" />
                    <span>
                    123 University Ave,<br />
                    Admin Block B, Room 101
                    </span>
                </li>
                <li className="flex items-center md:justify-end gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <Phone size={18} className="shrink-0 text-indigo-500 md:order-2" />
                    <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center md:justify-end gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <Mail size={18} className="shrink-0 text-indigo-500 md:order-2" />
                    <span>support@campus.edu</span>
                </li>
                </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left">
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

// Helper Component for Social Icons
function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href} 
      className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 
      dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white transition-all duration-200"
    >
      {icon}
    </a>
  );
}