import React from "react";
import IssueCard from "./IssueCard";
import { Filter } from "lucide-react";

export default function IssuesList({ issues, onOpenIssue, onUpdateStatus }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">All Issues</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-800 transition">
            <Filter size={16} /> <span className="text-sm font-medium">Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {issues.map((issue) => (
          <div key={issue.id} className="flex flex-col gap-3 group">
            <IssueCard issue={issue} onOpen={() => onOpenIssue(issue)} />
            
            {/* Status Dropdown */}
            <select
              defaultValue={issue.status}
              onChange={(e) => onUpdateStatus(issue.id, e.target.value)}
              className="w-full text-sm p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition 
              dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700"
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}