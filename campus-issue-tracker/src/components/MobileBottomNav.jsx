import React, { useEffect } from "react";
import { Home, List, Plus, CheckCircle, User, Menu } from "lucide-react";

// 🔑 ACCEPT role & onOpenMenu PROPS
export default function MobileBottomNav({ view, onNavigate, isDarkMode, role, onOpenMenu }) {

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDarkMode]);

  // 1. Define distinct navigation lists for Roles
  const adminNavItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "issues", icon: List, label: "In-Progress" },
    { id: "resolved", icon: CheckCircle, label: "Resolved" },
    { id: "menu", icon: Menu, label: "Menu", isAction: true, action: onOpenMenu }, // 🔑 Admin Menu Action
  ];

  const userNavItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "issues", icon: List, label: "In-Progress" },
    { id: "create", icon: Plus, label: "Create", isFab: true },
    { id: "resolved", icon: CheckCircle, label: "Resolved" },
  ];

  const items = role === 'Admin' ? adminNavItems : userNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[60] md:hidden transition-colors duration-300">

      {/* 🔑 FLEXBOX LAYOUT: Handles any number of items elegantly */}
      <div className="flex justify-around items-end pb-3 w-full px-2">
        {items.map((item) => {

          const isActive = view === item.id;
          const IconComponent = item.icon;

          // 2. Render FAB (Only for User Create)
          if (item.isFab) {
            return (
              <div key={item.id} className="flex justify-center w-full">
                <button
                  onClick={() => onNavigate(item.id)}
                  className="relative -top-6 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300 dark:shadow-indigo-900/50 hover:scale-105 transition-transform
                             p-[clamp(12px,3.5vw,18px)] border-none"
                >
                  <IconComponent className="w-[clamp(28px,7vw,36px)] h-[clamp(28px,7vw,36px)]" />
                </button>
              </div>
            );
          }

          // 3. Render Standard Tab (Including Admin Menu)
          return (
            <div key={item.id} className="flex justify-center w-full">
              <button
                onClick={item.isAction ? item.action : () => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors w-full py-1 bg-transparent border-none ${isActive && !item.isAction // Menu doesn't have active state usually
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 dark:text-slate-400"
                  }`}
              >
                <IconComponent className="w-[clamp(22px,6vw,28px)] h-[clamp(22px,6vw,28px)]" />
                <span className="text-[clamp(10px,2.8vw,12px)] font-medium leading-none">
                  {item.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}