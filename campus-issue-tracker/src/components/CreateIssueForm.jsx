import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

export default function CreateIssueForm({ onCreate }) {
  const [form, setForm] = useState({ title: "", description: "", category: "", location: "" });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleFile(e) {
    const files = Array.from(e.target.files);
    setAttachments((s) => [...s, ...files]);
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(async () => {
        await onCreate({ ...form, attachments, created_by: "Current User" });
        setForm({ title: "", description: "", category: "", location: "" });
        setAttachments([]);
        setLoading(false);
    }, 800);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Create New Issue</h2>
      
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Issue Title</label>
                <input 
                    required
                    value={form.title} 
                    onChange={(e) => setForm({ ...form, title: e.target.value })} 
                    placeholder="e.g. Broken Projector" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:bg-slate-900/50 dark:border-slate-700" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
                <input 
                    required
                    value={form.location} 
                    onChange={(e) => setForm({ ...form, location: e.target.value })} 
                    placeholder="e.g. Lab 101" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:bg-slate-900/50 dark:border-slate-700" 
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
            <textarea 
                required
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                placeholder="Describe the issue in detail..." 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none dark:bg-slate-900/50 dark:border-slate-700" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <input 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value })} 
                    placeholder="e.g. Maintenance" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:bg-slate-900/50 dark:border-slate-700" 
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Attachments</label>
                <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition group dark:border-slate-700 dark:hover:bg-slate-700">
                    <Upload className="text-gray-400 group-hover:text-indigo-500" size={20} />
                    <span className="text-sm text-gray-500 group-hover:text-indigo-600">Click to upload</span>
                    <input onChange={handleFile} type="file" className="hidden" multiple accept="image/*" />
                </label>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {attachments.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium dark:bg-indigo-900/30 dark:text-indigo-300">
                    {f.name}
                    <button type="button" onClick={() => setAttachments(s => s.filter((_, i) => i !== idx))} className="hover:text-indigo-900"><X size={12} /></button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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