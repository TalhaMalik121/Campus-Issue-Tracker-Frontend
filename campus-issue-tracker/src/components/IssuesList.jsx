import React from "react";
import IssueCard from "./IssueCard";

export default function IssuesList({ issues, onOpenIssue, onUpdateStatus }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Issues</h2>
      <div className="grid grid-cols-3 gap-4">
        {issues.map((issue) => (
          <div key={issue.id} className="col-span-1">
            <IssueCard issue={issue} onOpen={() => onOpenIssue(issue)} />
            <div className="mt-2 flex gap-2">
              <select defaultValue={issue.status} onChange={(e) => onUpdateStatus(issue.id, e.target.value)} className="mt-2 w-full rounded-lg p-2 border">
                <option>New</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
