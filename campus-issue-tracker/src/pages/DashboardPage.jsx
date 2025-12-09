import React from "react";
import Dashboard from "../components/Dashboard";
import IssuesList from "../components/IssuesList";
import AnalyticsSection from "../components/AnalyticsSection"; // Import
import { motion } from "framer-motion";

export default function DashboardPage({ allFiltered, setSelectedIssue, handleUpdateStatus, role, selectedCategory, setSelectedCategory }) {
    return (
        <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <Dashboard issues={allFiltered} />

            <div className="mt-8 mb-6">
                <h2 className="text-2xl font-bold tracking-tight">New Issues</h2>
                <p className="text-gray-500 dark:text-gray-400">Issues that need to be reviewed.</p>
            </div>

            <IssuesList
                issues={allFiltered.filter(i => i.status === "New")}
                onOpenIssue={setSelectedIssue}
                onUpdateStatus={handleUpdateStatus}
                userRole={role}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
        </motion.div>
    );
}
