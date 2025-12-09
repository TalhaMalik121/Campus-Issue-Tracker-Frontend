import React from "react";
import { motion } from "framer-motion";
import IssueCard from "../components/IssueCard";
import { Archive } from "lucide-react";

export default function ArchivedIssuesPage({ allFiltered, setSelectedIssue, role }) {
    if (role !== "Admin") {
        return <div className="p-8 text-center text-surface-500">Access Denied</div>;
    }

    // Filter ONLY Archived issues
    const archivedIssues = allFiltered.filter(i => i.status === 'Archived');

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-xl">
                    <Archive className="text-surface-600 dark:text-surface-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-display font-bold text-surface-900 dark:text-white">Archives</h1>
                    <p className="text-surface-500 dark:text-surface-400">View discarded and archived issues</p>
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {archivedIssues.map((issue) => (
                    <IssueCard
                        key={issue.id}
                        issue={issue}
                        onOpen={() => setSelectedIssue(issue)}
                    />
                ))}

                {archivedIssues.length === 0 && (
                    <div className="col-span-full py-20 text-center text-surface-400">
                        <p className="text-lg">No archived issues found.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
