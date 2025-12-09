import React, { useState } from "react";
import { Upload, X, Loader2, ChevronDown } from "lucide-react";

export default function CreateIssueForm({ onCreate }) {
  // 🔑 Updated initial category to be empty or the first option
  const [form, setForm] = useState({ title: "", description: "", category: "Infrastructure", location: "" });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔑 Defined Categories
  const CATEGORIES = [
    "Infrastructure",
    "IT/Wi-Fi",
    "Electrical",
    "Cleanliness",
    "Academic",
    "Other"
  ];

  function handleFile(e) {
    const files = Array.from(e.target.files);
    setAttachments((s) => [...s, ...files]);
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await onCreate({ ...form, attachments, created_by: "Current User" });
      // Reset form
      setForm({ title: "", description: "", category: "Infrastructure", location: "" });
      setAttachments([]);
      setLoading(false);
    }, 800);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-display font-bold tracking-tight mb-6 text-surface-900 dark:text-white">Create New Issue</h2>

      <div className="bg-white dark:bg-surface-800 p-8 rounded-3xl shadow-sm border border-surface-100 dark:border-surface-700 transition-colors">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">Issue Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Broken Projector"
                className="w-full p-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition dark:bg-surface-900 dark:border-surface-600 dark:text-white dark:placeholder-surface-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">Location</label>
              <input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Lab 101"
                className="w-full p-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition dark:bg-surface-900 dark:border-surface-600 dark:text-white dark:placeholder-surface-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">Description</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the issue in detail..."
              className="w-full p-3 bg-surface-50 border border-surface-200 rounded-xl h-32 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-none dark:bg-surface-900 dark:border-surface-600 dark:text-white dark:placeholder-surface-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">Category</label>
              <div className="relative">
                {/* 🔑 Custom Select Dropdown */}
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition appearance-none dark:bg-surface-900 dark:border-surface-600 dark:text-white cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">Attachments</label>
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-surface-200 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition group dark:border-surface-600 dark:hover:bg-surface-700 dark:hover:border-primary-400">
                <Upload className="text-surface-400 group-hover:text-primary-500 dark:text-surface-400 dark:group-hover:text-primary-400" size={20} />
                <span className="text-sm text-surface-500 group-hover:text-primary-600 dark:text-surface-400 dark:group-hover:text-primary-300">Click to upload</span>
                <input onChange={handleFile} type="file" className="hidden" multiple accept="image/*,video/*" />
              </label>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {attachments.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium dark:bg-primary-900/40 dark:text-primary-300 border border-transparent dark:border-primary-500/30">
                  {f.name}
                  <button type="button" onClick={() => setAttachments(s => s.filter((_, i) => i !== idx))} className="hover:text-primary-900 dark:hover:text-primary-100"><X size={12} /></button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Creating..." : "Create Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}