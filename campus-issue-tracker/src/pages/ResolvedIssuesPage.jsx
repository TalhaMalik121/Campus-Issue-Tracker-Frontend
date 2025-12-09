import React from "react";
import IssueCard from "../components/IssueCard";
import { motion } from "framer-motion";

export default function ResolvedIssuesPage({ allFiltered, setSelectedIssue }) {
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
                            <IssueCard key={issue.id} issue={issue} onOpen={() => setSelectedIssue(issue)} />
                        ))
                    ) : (
                        <p className="col-span-full text-gray-500 text-center py-10">No resolved issues found.</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
