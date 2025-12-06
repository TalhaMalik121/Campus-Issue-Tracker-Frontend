import React from "react";
import StatCard from "./StatCard";
import IssueCard from "./IssueCard";

export default function Dashboard({ issues, onOpenIssue }) {
  const counts = issues.reduce(
    (acc, it) => {
      acc.total++;
      acc[it.status] = (acc[it.status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Issues" value={counts.total} />
        <StatCard label="In Progress" value={counts["In Progress"] || 0} />
        <StatCard label="Completed" value={counts["Completed"] || 0} />
      </div>

      <section className="mt-6">
        <h3 className="font-medium mb-3">Latest Issues</h3>
        <div className="space-y-3">
          {issues.slice(0, 5).map((issue) => (
            <IssueCard key={issue.id} issue={issue} onOpen={() => onOpenIssue(issue)} />
          ))}
        </div>
      </section>
    </div>
  );
}
