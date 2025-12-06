import React from "react";
import IssueCard from "./IssueCard";
import { Filter } from "lucide-react";

export default function IssuesList({ issues, onOpenIssue, onUpdateStatus }) {
  return (
    <div className="space-y-6">
      {/* List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Issues ({issues.length})
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-800 transition">
            <Filter size={16} /> <span className="text-sm font-medium">Filter</span>
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue.id} className="flex flex-col gap-3 group">
              <IssueCard issue={issue} onOpen={() => onOpenIssue(issue)} />
              
              {/* Dynamic Status Dropdown */}
              <select
                defaultValue={issue.status}
                onChange={(e) => onUpdateStatus(issue.id, e.target.value)}
                className="w-full text-sm p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition 
                dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700"
              >
                {/* LOGIC: Options depend on the current status */}
                
                {/* 1. If Status is NEW: Show all options */}
                {issue.status === "New" && (
                    <>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </>
                )}

                {/* 2. If Status is IN PROGRESS: Only show 'In Progress' and 'Mark as Resolved' */}
                {issue.status === "In Progress" && (
                    <>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Mark as Resolved</option>
                    </>
                )}

                {/* 3. If Status is RESOLVED: Read only essentially */}
                {issue.status === "Resolved" && (
                    <option value="Resolved">Resolved</option>
                )}
              </select>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">
            No issues found in this category.
          </div>
        )}
      </div>
    </div>
  );
}