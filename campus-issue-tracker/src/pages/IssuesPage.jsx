import React from "react";
import IssuesList from "../components/IssuesList";
import { motion } from "framer-motion";

export default function IssuesPage({ allFiltered, setSelectedIssue, handleUpdateStatus, role }) {
    return (
        <motion.div
            key="issues"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">In Progress</h2>
                <p className="text-gray-500 dark:text-gray-400">Issues currently being worked on.</p>
            </div>

            <IssuesList
                issues={allFiltered.filter(i => i.status === "In Progress")}
                onOpenIssue={setSelectedIssue}
                onUpdateStatus={handleUpdateStatus}
                userRole={role}
            />
        </motion.div>
    );
}
