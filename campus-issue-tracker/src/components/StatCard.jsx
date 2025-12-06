import React from "react";

export default function StatCard({ label, value, icon, trend }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
           {icon}
        </div>
        {trend && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full dark:bg-green-900/20 dark:text-green-400">{trend}</span>}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</div>
      </div>
    </div>
  );
}