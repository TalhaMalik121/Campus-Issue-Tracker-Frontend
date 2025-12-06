import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function CreateIssueForm({ onCreate }) {
  const [form, setForm] = useState({ title: "", description: "", category: "", location: "" });
  const [attachments, setAttachments] = useState([]);

  function handleFile(e) {
    const files = Array.from(e.target.files);
    setAttachments((s) => [...s, ...files]);
  }

  async function submit(e) {
    e.preventDefault();
    await onCreate({ ...form, attachments, created_by: "Current User" });
    setForm({ title: "", description: "", category: "", location: "" });
    setAttachments([]);
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Create Issue</h2>

      <div className="grid grid-cols-2 gap-4">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="p-3 border rounded-lg w-full" />
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location (e.g., Lab 101)" className="p-3 border rounded-lg w-full" />
      </div>

      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed description" className="w-full p-3 border rounded-lg h-32" />

      <div className="flex gap-3 items-center">
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category (Maintenance, Facilities...)" className="p-3 border rounded-lg w-full" />
        <label className="p-3 border rounded-lg flex items-center gap-2 cursor-pointer">
          <Upload /> Attach
          <input onChange={handleFile} type="file" className="hidden" multiple />
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {attachments.map((f, idx) => (
            <div key={idx} className="p-2 border rounded-lg text-xs">{f.name}</div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium">Create Issue</button>
      </div>
    </form>
  );
}
