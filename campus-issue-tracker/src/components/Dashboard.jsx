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
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening across the campus today.
        </p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
            label="Total Issues" 
            value={counts.total} 
            icon={<BarChart3 className="text-indigo-500" />} 
            trend="+12% from last week"
        />
        <StatCard 
            label="In Progress" 
            value={counts["In Progress"] || 0} 
            icon={<Clock className="text-amber-500" />}
        />
        <StatCard 
            label="Completed" 
            value={counts["Completed"] || 0} 
            icon={<CheckCircle2 className="text-emerald-500" />} 
        />
      </div>

      {/* Recent Issues Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Latest Reported Issues</h3>
          
          {/* FIX: Lighter indigo color for dark mode */}
          <button 
            onClick={onViewAll} 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline 
            dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {issues.slice(0, 6).map((issue) => (
            <IssueCard key={issue.id} issue={issue} onOpen={() => onOpenIssue(issue)} />
          ))}
        </div>
      </section>
    </div>
  );
}