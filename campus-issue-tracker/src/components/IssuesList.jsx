import React, { useState } from "react";
import IssueCard from "./IssueCard";
import { Filter, CheckSquare, Square, Check } from "lucide-react";

// 🔑 ACCEPT updated props
export default function IssuesList({ issues, onOpenIssue, onUpdateStatus, userRole, selectedCategory, setSelectedCategory }) {
  // Check if the current user is an Admin
  const isAdmin = userRole === 'Admin';

  // 🔑 Bulk Selection State
  const [selectedIds, setSelectedIds] = useState([]);

  // Toggle Selection
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Bulk Action Handler
  const handleBulkAction = async (status) => {
    if (!confirm(`Are you sure you want to mark ${selectedIds.length} issues as ${status}?`)) return;

    // In a real app, you'd want a dedicated bulk-update endpoint.
    // For now, we will fire valid statuses sequentially.
    for (const id of selectedIds) {
      await onUpdateStatus(id, status);
    }
    // Clear selection
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6 relative">

      {/* 🔑 BULK ACTION BAR (Floating or Static) */}
      {isAdmin && selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <span className="font-semibold text-sm mr-2">{selectedIds.length} Selected</span>

          <button onClick={() => handleBulkAction('Resolved')} className="flex items-center gap-2 hover:text-emerald-400 font-medium text-sm transition-colors">
            <Check size={16} /> Mark Resolved
          </button>
          <button onClick={() => handleBulkAction('In Progress')} className="flex items-center gap-2 hover:text-indigo-400 font-medium text-sm transition-colors">
            In Progress
          </button>
          <div className="h-4 w-px bg-white/20 mx-2"></div>
          <button onClick={() => setSelectedIds([])} className="text-sm text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      )}

      {/* List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Issues ({issues.length})
        </h2>
        {/* Filter button - kept for future implementation */}
        {/* Functional Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory || "All"}
            onChange={(e) => setSelectedCategory && setSelectedCategory(e.target.value)}
            className="appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-800 transition bg-transparent outline-none cursor-pointer font-medium text-sm"
          >
            <option value="All">All Categories</option>
            <option value="IT/Wi-Fi">IT/Wi-Fi</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue.id} className="flex flex-col gap-3 group relative">

              {/* 🔑 ADMIN CHECKBOX LAYOUT */}
              {isAdmin && (
                <div className="absolute top-3 left-3 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSelect(issue.id || issue._id); }}
                    className={`p-1 rounded bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-colors ${selectedIds.includes(issue.id || issue._id) ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {selectedIds.includes(issue.id || issue._id)
                      ? <CheckSquare size={20} className="fill-current" />
                      : <Square size={20} />}
                  </button>
                </div>
              )}

              <IssueCard issue={issue} onOpen={() => onOpenIssue(issue)} />

              {/* Dynamic Status Dropdown */}
              <select
                defaultValue={issue.status}
                onChange={(e) => onUpdateStatus(issue.id || issue._id, e.target.value)}
                // 🔑 DISABLE THE DROPDOWN IF THE USER IS NOT ADMIN
                disabled={!isAdmin}
                className={`w-full text-sm p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition 
                dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {/* 🔑 Simplify options to show all, relying on the 'disabled' attribute for enforcement */}
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Archived">Archived</option>

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