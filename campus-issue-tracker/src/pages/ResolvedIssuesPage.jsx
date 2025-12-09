import React from "react";
import IssueCard from "../components/IssueCard";
import { motion } from "framer-motion";

export default function ResolvedIssuesPage({ allFiltered, setSelectedIssue, role, onUpdateStatus }) {
    const isAdmin = role === 'Admin';
    return (
        <motion.div
            key="resolved"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Resolved Issues</h2>
                <p className="text-gray-500 dark:text-gray-400">History of completed tasks.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allFiltered.filter((i) => i.status === "Resolved").length > 0 ? (
                        allFiltered.filter((i) => i.status === "Resolved").map((issue) => (
                            <div key={issue.id} className="flex flex-col gap-3 group relative">
                                <IssueCard issue={issue} onOpen={() => setSelectedIssue(issue)} />
                                <select
                                    defaultValue={issue.status}
                                    onChange={(e) => onUpdateStatus(issue.id || issue._id, e.target.value)}
                                    disabled={!isAdmin}
                                    className={`w-full text-sm p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition 
                                    dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-gray-500 text-center py-10">No resolved issues found.</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
