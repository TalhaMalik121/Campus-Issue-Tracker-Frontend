import React from "react";

export default function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl p-4 bg-white shadow-sm border">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
