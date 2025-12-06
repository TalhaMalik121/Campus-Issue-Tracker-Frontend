import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function IssueModal({ issue, onClose }) {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.98 }} 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-6 transition-colors"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{issue.title}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{issue.location} • {issue.category}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"><X /></button>
        </div>

        <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{issue.description}</div>

        <div className="mt-4 flex gap-3 items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Status:</div>
          <div className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300 rounded-full text-sm font-medium">{issue.status}</div>
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-slate-800 pt-4">
          <h4 className="font-medium text-slate-900 dark:text-white">Comments</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No comments yet — integrate comments API to enable discussion.</p>
        </div>
      </motion.div>
    </div>
  );
}