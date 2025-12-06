import React from "react";
import StatCard from "./StatCard";
import { BarChart3, Clock, CheckCircle2 } from "lucide-react";

export default function Dashboard({ issues }) {
  // Calculate stats from ALL issues passed to it
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

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {/* Total Issues */}
        <div className="col-span-2 md:col-span-1">
            <StatCard 
                label="Total Issues" 
                value={counts.total} 
                icon={<BarChart3 className="text-indigo-500" />} 
                trend="+12%" 
            />
        </div>
        
        {/* In Progress Count */}
        <StatCard 
            label="In Progress" 
            value={counts["In Progress"] || 0} 
            icon={<Clock className="text-amber-500" />}
        />
        
        {/* Resolved Count */}
        <StatCard 
            label="Resolved" 
            value={counts["Resolved"] || 0} 
            icon={<CheckCircle2 className="text-emerald-500" />} 
        />
      </div>
    </div>
  );
}