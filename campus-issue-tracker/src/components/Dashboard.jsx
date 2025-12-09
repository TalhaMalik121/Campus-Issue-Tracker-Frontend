import React from "react";
import StatCard from "./StatCard";
import { BarChart3, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard({ issues }) {
  // Calculate stats
  const counts = issues.reduce(
    (acc, it) => {
      acc.total++;
      acc[it.status] = (acc[it.status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <header className="relative">
        <motion.div variants={item}>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-surface-900 dark:text-white">
            Dashboard
          </h2>
          <p className="text-base text-surface-500 dark:text-surface-400 mt-2 max-w-2xl leading-relaxed">
            Here's what's happening across the campus today. You have <span className="font-bold text-primary-600 dark:text-primary-400">{counts.total} total issues</span> tracked.
          </p>
        </motion.div>
      </header>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {/* Total Issues */}
        <div className="col-span-2 md:col-span-1">
          <StatCard
            label="Total Issues"
            value={counts.total}
            icon={<BarChart3 className="text-primary-500" />}
            trend="+12%"
          />
        </div>

        {/* In Progress Count */}
        <StatCard
          label="In Progress"
          value={counts["In Progress"] || 0}
          icon={<Clock className="text-amber-500" />}
        />

        {/* Resolved Count */}
        <StatCard
          label="Resolved"
          value={counts["Resolved"] || 0}
          icon={<CheckCircle2 className="text-emerald-500" />}
        />
      </motion.div>
    </motion.div>
  );
}