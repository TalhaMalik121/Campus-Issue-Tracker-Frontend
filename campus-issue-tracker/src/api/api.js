// src/api.js
const API_URL = "http://localhost:3000/api";

export const api = {
  fetchIssues: async () => {
    const res = await fetch(`${API_URL}/issues`);
    if (!res.ok) throw new Error("Server error");
    return res.json();
  },

  createIssue: async (issueData) => {
    const formData = new FormData();
    formData.append("title", issueData.title);
    formData.append("description", issueData.description);
    formData.append("category", issueData.category);
    formData.append("location", issueData.location);
    formData.append("created_by", issueData.created_by);
    
    // Append files if they exist
    if (issueData.attachments && issueData.attachments.length > 0) {
      Array.from(issueData.attachments).forEach(file => {
        formData.append("attachments", file);
      });
    }

    const res = await fetch(`${API_URL}/issues`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to create");
    return res.json();
  },

  updateIssueStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/issues/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
};