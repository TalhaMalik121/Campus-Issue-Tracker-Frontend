// // import React from "react";
// // import StatCard from "./StatCard";
// // import IssueCard from "./IssueCard";
// // import { BarChart3, Clock, CheckCircle2 } from "lucide-react";

// // export default function Dashboard({ issues, onOpenIssue, onViewAll }) {
// //   const counts = issues.reduce(
// //     (acc, it) => {
// //       acc.total++;
// //       acc[it.status] = (acc[it.status] || 0) + 1;
// //       return acc;
// //     },
// //     { total: 0 }
// //   );

// //   return (
// //     <div className="space-y-6 md:space-y-8">
// //       <header>
// //         <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h2>
// //         <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
// //           Here's what's happening across the campus today.
// //         </p>
// //       </header>

// //       {/* Stats Row - HORIZONTAL SCROLL ON MOBILE */}
// //       <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 md:pb-0 snap-x scrollbar-hide">
// //         <div className="min-w-[85%] md:min-w-0 snap-center">
// //             <StatCard 
// //                 label="Total Issues" 
// //                 value={counts.total} 
// //                 icon={<BarChart3 className="text-indigo-500" />} 
// //                 trend="+12% from last week"
// //             />
// //         </div>
// //         <div className="min-w-[85%] md:min-w-0 snap-center">
// //             <StatCard 
// //                 label="In Progress" 
// //                 value={counts["In Progress"] || 0} 
// //                 icon={<Clock className="text-amber-500" />}
// //             />
// //         </div>
// //         <div className="min-w-[85%] md:min-w-0 snap-center">
// //             <StatCard 
// //                 label="Completed" 
// //                 value={counts["Completed"] || 0} 
// //                 icon={<CheckCircle2 className="text-emerald-500" />} 
// //             />
// //         </div>
// //       </div>

// //       {/* Recent Issues Section */}
// //       <section>
// //         <div className="flex items-center justify-between mb-4 md:mb-6">
// //           <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">Latest Reported Issues</h3>
          
// //           <button 
// //             onClick={onViewAll} 
// //             className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline 
// //             dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
// //           >
// //             View all
// //           </button>
// //         </div>
        
// //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
// //           {issues.slice(0, 6).map((issue) => (
// //             <IssueCard key={issue.id} issue={issue} onOpen={() => onOpenIssue(issue)} />
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// import React from "react";
// import StatCard from "./StatCard";
// import IssueCard from "./IssueCard";
// import { BarChart3, Clock, CheckCircle2 } from "lucide-react";

// export default function Dashboard({ issues, onOpenIssue, onViewAll }) {
//   const counts = issues.reduce(
//     (acc, it) => {
//       acc.total++;
//       acc[it.status] = (acc[it.status] || 0) + 1;
//       return acc;
//     },
//     { total: 0 }
//   );

//   return (
//     <div className="space-y-6 md:space-y-8">
//       <header>
//         <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h2>
//         <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
//           Here's what's happening across the campus today.
//         </p>
//       </header>

//       {/* UPDATED SECTION:
//          1. Removed 'overflow-x-auto', 'flex', 'snap-x' (which caused the scrolling).
//          2. Added 'grid grid-cols-1' for mobile (vertical stack).
//          3. Kept 'md:grid-cols-3' for tablets/laptops.
//       */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
//         <StatCard 
//             label="Total Issues" 
//             value={counts.total} 
//             icon={<BarChart3 className="text-indigo-500" />} 
//             trend="+12% from last week"
//         />
        
//         <StatCard 
//             label="In Progress" 
//             value={counts["In Progress"] || 0} 
//             icon={<Clock className="text-amber-500" />}
//         />
        
//         <StatCard 
//             label="Completed" 
//             value={counts["Completed"] || 0} 
//             icon={<CheckCircle2 className="text-emerald-500" />} 
//         />
//       </div>

//       {/* Recent Issues Section */}
//       <section>
//         <div className="flex items-center justify-between mb-4 md:mb-6">
//           <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">Latest Reported Issues</h3>
          
//           <button 
//             onClick={onViewAll} 
//             className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline 
//             dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
//           >
//             View all
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
//           {issues.slice(0, 6).map((issue) => (
//             <IssueCard key={issue.id} issue={issue} onOpen={() => onOpenIssue(issue)} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";
import StatCard from "./StatCard";
import IssueCard from "./IssueCard";
import { BarChart3, Clock, CheckCircle2 } from "lucide-react";

export default function Dashboard({ issues, onOpenIssue, onViewAll }) {
  const counts = issues.reduce(
    (acc, it) => {
      acc.total++;
      acc[it.status] = (acc[it.status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="space-y-6 md:space-y-8">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening across the campus today.
        </p>
      </header>

      {/* UPDATED LAYOUT:
         - 'grid-cols-2': Creates a 2-column grid on mobile.
         - 'gap-3': Smaller gap on mobile to save space.
         - 'md:grid-cols-3': Switches back to 3 columns on laptop.
      */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        
        {/* Card 1: Total Issues 
            - 'col-span-2': Spans across BOTH columns on mobile (Full Width)
            - 'md:col-span-1': Takes 1 column on laptop
        */}
        <div className="col-span-2 md:col-span-1">
            <StatCard 
                label="Total Issues" 
                value={counts.total} 
                icon={<BarChart3 className="text-indigo-500" />} 
                trend="+12%" // Shortened text for mobile
            />
        </div>
        
        {/* Card 2: In Progress 
            - Standard size (takes 1 slot)
        */}
        <StatCard 
            label="In Progress" 
            value={counts["In Progress"] || 0} 
            icon={<Clock className="text-amber-500" />}
        />
        
        {/* Card 3: Completed 
            - Standard size (takes 1 slot)
        */}
        <StatCard 
            label="Completed" 
            value={counts["Completed"] || 0} 
            icon={<CheckCircle2 className="text-emerald-500" />} 
        />
      </div>

      {/* Recent Issues Section */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">Latest Reported Issues</h3>
          
          <button 
            onClick={onViewAll} 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline 
            dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {issues.slice(0, 6).map((issue) => (
            <IssueCard key={issue.id} issue={issue} onOpen={() => onOpenIssue(issue)} />
          ))}
        </div>
      </section>
    </div>
  );
}