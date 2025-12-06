import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function IssueModal({ issue, onClose }) {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{issue.title}</h3>
            <div className="text-sm text-gray-500">{issue.location} • {issue.category}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X /></button>
        </div>

        <div className="mt-4 text-gray-700">{issue.description}</div>

        <div className="mt-4 flex gap-3 items-center">
          <div className="text-sm text-gray-500">Status:</div>
          <div className="px-3 py-1 bg-gray-100 rounded-full">{issue.status}</div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium">Comments</h4>
          <p className="text-sm text-gray-500">No comments yet — integrate comments API to enable discussion.</p>
        </div>
      </motion.div>
    </div>
  );
}
