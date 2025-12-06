import { useState, useEffect } from "react";

const mockIssues = [
  { id: 1, title: "Broken Chair in Lab 203", description: "A chair in lab 203 has a broken leg and is unsafe.", category: "Maintenance", location: "Lab 203", status: "New", created_by: "Ali", created_at: "2025-12-01T10:30:00Z" },
  { id: 2, title: "AC not cooling - Library", description: "AC unit is blowing warm air since yesterday.", category: "Facilities", location: "Central Library", status: "In Progress", created_by: "Sara", created_at: "2025-12-03T08:10:00Z" },
];

export default function useFakeApi() {
  const [issues, setIssues] = useState(mockIssues);

  useEffect(() => {}, []);

  async function fetchIssues() {
    return issues;
  }

  async function createIssue(payload) {
    const id = Date.now();
    const newIssue = { id, ...payload, status: "New", created_at: new Date().toISOString() };
    setIssues((s) => [newIssue, ...s]);
    return newIssue;
  }

  async function updateIssueStatus(id, status) {
    setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i)));
    return { ok: true };
  }

  return { fetchIssues, createIssue, updateIssueStatus };
}
