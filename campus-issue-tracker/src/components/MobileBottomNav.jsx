// // // import React from "react";
// // // import { Home, List, Plus, CheckCircle, User } from "lucide-react";

// // // export default function MobileBottomNav({ view, onNavigate }) {
// // //   const navItems = [
// // //     { id: "dashboard", icon: <Home size={24} />, label: "Home" },
// // //     { id: "issues", icon: <List size={24} />, label: "Issues" },
// // //     { id: "create", icon: <Plus size={28} />, label: "Create", isFab: true }, // Special styling for Create
// // //     { id: "completed", icon: <CheckCircle size={24} />, label: "Done" },
// // //     { id: "profile", icon: <User size={24} />, label: "Profile" },
// // //   ];

// // //   return (
// // //     <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:hidden">
// // //       <div className="flex justify-between items-end pb-3">
// // //         {navItems.map((item) => {
// // //           const isActive = view === item.id;
          
// // //           if (item.isFab) {
// // //             return (
// // //               <button
// // //                 key={item.id}
// // //                 onClick={() => onNavigate(item.id)}
// // //                 className="relative -top-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-300 dark:shadow-indigo-900/50 hover:scale-105 transition-transform"
// // //               >
// // //                 {item.icon}
// // //               </button>
// // //             );
// // //           }

// // //           return (
// // //             <button
// // //               key={item.id}
// // //               onClick={() => onNavigate(item.id)}
// // //               className={`flex flex-col items-center gap-1 transition-colors ${
// // //                 isActive
// // //                   ? "text-indigo-600 dark:text-indigo-400"
// // //                   : "text-gray-400 dark:text-gray-600"
// // //               }`}
// // //             >
// // //               {item.icon}
// // //               <span className="text-[10px] font-medium">{item.label}</span>
// // //             </button>
// // //           );
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect } from "react";
// // import { Home, List, Plus, CheckCircle, User } from "lucide-react";

// // // ADDED: isDarkMode prop to track the theme state
// // export default function MobileBottomNav({ view, onNavigate, isDarkMode }) {
  
// //   // --- NEW CODE START ---
// //   // This effect updates the phone's system navigation bar color
// //   useEffect(() => {
// //     // 1. Find the meta tag
// //     let metaThemeColor = document.querySelector("meta[name=theme-color]");

// //     // 2. If it doesn't exist, create it (safe-guard)
// //     if (!metaThemeColor) {
// //       metaThemeColor = document.createElement("meta");
// //       metaThemeColor.name = "theme-color";
// //       document.head.appendChild(metaThemeColor);
// //     }

// //     // 3. Update the color
// //     // If Dark: Use #0f172a (Tailwind slate-900)
// //     // If Light: Use #ffffff (White)
// //     metaThemeColor.setAttribute("content", isDarkMode ? "#0f172a" : "#ffffff");
    
// //   }, [isDarkMode]); // Re-run this whenever isDarkMode changes
// //   // --- NEW CODE END ---

// //   const navItems = [
// //     { id: "dashboard", icon: <Home size={24} />, label: "Home" },
// //     { id: "issues", icon: <List size={24} />, label: "Issues" },
// //     { id: "create", icon: <Plus size={28} />, label: "Create", isFab: true },
// //     { id: "completed", icon: <CheckCircle size={24} />, label: "Done" },
// //     { id: "profile", icon: <User size={24} />, label: "Profile" },
// //   ];

// //   return (
// //     <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:hidden">
// //       <div className="flex justify-between items-end pb-3">
// //         {navItems.map((item) => {
// //           const isActive = view === item.id;
          
// //           if (item.isFab) {
// //             return (
// //               <button
// //                 key={item.id}
// //                 onClick={() => onNavigate(item.id)}
// //                 className="relative -top-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-300 dark:shadow-indigo-900/50 hover:scale-105 transition-transform"
// //               >
// //                 {item.icon}
// //               </button>
// //             );
// //           }

// //           return (
// //             <button
// //               key={item.id}
// //               onClick={() => onNavigate(item.id)}
// //               className={`flex flex-col items-center gap-1 transition-colors ${
// //                 isActive
// //                   ? "text-indigo-600 dark:text-indigo-400"
// //                   : "text-gray-400 dark:text-gray-600"
// //               }`}
// //             >
// //               {item.icon}
// //               <span className="text-[10px] font-medium">{item.label}</span>
// //             </button>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect } from "react";
// import { Home, List, Plus, CheckCircle, User } from "lucide-react";

// export default function MobileBottomNav({ view, onNavigate, isDarkMode }) {
  
//   // Logic to sync phone system bar color
//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (isDarkMode) {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }

//     let metaThemeColor = document.querySelector("meta[name=theme-color]");
//     if (!metaThemeColor) {
//       metaThemeColor = document.createElement("meta");
//       metaThemeColor.name = "theme-color";
//       document.head.appendChild(metaThemeColor);
//     }
//     metaThemeColor.setAttribute("content", isDarkMode ? "#0f172a" : "#ffffff");
//   }, [isDarkMode]);

//   const navItems = [
//     { id: "dashboard", icon: <Home size={24} />, label: "Home" },
//     { id: "issues", icon: <List size={24} />, label: "Issues" },
//     { id: "create", icon: <Plus size={28} />, label: "Create", isFab: true },
//     { id: "completed", icon: <CheckCircle size={24} />, label: "Done" },
//     { id: "profile", icon: <User size={24} />, label: "Profile" },
//   ];

//   return (
//     // 1. REMOVED 'px-6' so it touches the edges
//     // 2. Kept 'pb-safe pt-2' for vertical spacing
//     <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:hidden transition-colors duration-300">
      
//       {/* CHANGED from 'flex justify-between' to 'grid grid-cols-5' 
//           This ensures the items span the full width starting from the very left. */}
//       <div className="grid grid-cols-5 items-end pb-3 w-full">
//         {navItems.map((item) => {
//           const isActive = view === item.id;
          
//           if (item.isFab) {
//             return (
//               <div key={item.id} className="flex justify-center">
//                 <button
//                   onClick={() => onNavigate(item.id)}
//                   className="relative -top-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-300 dark:shadow-indigo-900/50 hover:scale-105 transition-transform"
//                 >
//                   {item.icon}
//                 </button>
//               </div>
//             );
//           }

//           return (
//             <div key={item.id} className="flex justify-center">
//               <button
//                 onClick={() => onNavigate(item.id)}
//                 className={`flex flex-col items-center gap-1 transition-colors ${
//                   isActive
//                     ? "text-indigo-600 dark:text-indigo-400"
//                     : "text-gray-400 dark:text-gray-600"
//                 }`}
//               >
//                 {item.icon}
//                 <span className="text-[10px] font-medium">{item.label}</span>
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { Home, List, Plus, CheckCircle, User } from "lucide-react";

export default function MobileBottomNav({ view, onNavigate, isDarkMode }) {
  
  // 1. Sync System Bar Color
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');

    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", isDarkMode ? "#0f172a" : "#ffffff");
  }, [isDarkMode]);

  // 2. Updated Array: We pass the Component Name (Home), not <Home />
  // This allows us to style the size dynamically below.
  const navItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "issues", icon: List, label: "Issues" },
    { id: "create", icon: Plus, label: "Create", isFab: true },
    { id: "completed", icon: CheckCircle, label: "Done" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:hidden transition-colors duration-300">
      
      <div className="grid grid-cols-5 items-end pb-3 w-full">
        {navItems.map((item) => {
          const isActive = view === item.id;
          const IconComponent = item.icon; // Get the icon component
          
          // Special "Floating Action Button" (The Plus Button)
          if (item.isFab) {
            return (
              <div key={item.id} className="flex justify-center">
                <button
                  onClick={() => onNavigate(item.id)}
                  // FLUID SIZING: p-[clamp(...)] adjusts padding based on screen width
                  className="relative -top-6 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300 dark:shadow-indigo-900/50 hover:scale-105 transition-transform
                             p-[clamp(12px,3.5vw,18px)]" 
                >
                  {/* FLUID ICON: w-[clamp(...)] grows with screen */}
                  <IconComponent className="w-[clamp(28px,7vw,36px)] h-[clamp(28px,7vw,36px)]" />
                </button>
              </div>
            );
          }

          // Standard Buttons
          return (
            <div key={item.id} className="flex justify-center">
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors w-full py-1 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {/* FLUID ICON: 
                    min: 22px (Small phones)
                    ideal: 6vw (Scales)
                    max: 28px (Big phones) 
                */}
                <IconComponent className="w-[clamp(22px,6vw,28px)] h-[clamp(22px,6vw,28px)]" />
                
                {/* FLUID TEXT: Scales between 10px and 12px */}
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