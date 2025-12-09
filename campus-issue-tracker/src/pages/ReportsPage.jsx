import React, { useState, useMemo } from 'react';
import AnalyticsSection from '../components/AnalyticsSection';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FileText, Filter, Calendar, Download, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ReportsPage({ issues }) {
    // --- Filters State ---
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [selectedCategory, setSelectedCategory] = useState('All');

    // --- Derived Data: Filtered Issues ---
    const filteredIssues = useMemo(() => {
        let result = issues;

        // 1. Category Filter
        if (selectedCategory !== 'All') {
            result = result.filter(i => i.category === selectedCategory);
        }

        // 2. Date Filter
        if (dateRange.start) {
            result = result.filter(i => new Date(i.created_at) >= dateRange.start);
        }
        if (dateRange.end) {
            const endDate = new Date(dateRange.end);
            endDate.setHours(23, 59, 59, 999);
            result = result.filter(i => new Date(i.created_at) <= endDate);
        }

        return result;
    }, [issues, selectedCategory, dateRange]);

    // --- Stats Calculation ---
    const stats = useMemo(() => {
        const total = filteredIssues.length;
        const resolved = filteredIssues.filter(i => i.status === 'Resolved').length;
        const pending = filteredIssues.filter(i => i.status === 'In Progress' || i.status === 'New').length;
        const newIssues = filteredIssues.filter(i => i.status === 'New').length;

        return { total, resolved, pending, newIssues };
    }, [filteredIssues]);

    // --- 🔑 Category Stats Calculation ---
    const categoryStats = useMemo(() => {
        const statsMap = {};

        filteredIssues.forEach(issue => {
            const cat = issue.category || 'Uncategorized';
            if (!statsMap[cat]) {
                statsMap[cat] = { category: cat, total: 0, resolved: 0, unresolved: 0 };
            }
            statsMap[cat].total++;
            if (issue.status === 'Resolved') {
                statsMap[cat].resolved++;
            } else {
                statsMap[cat].unresolved++;
            }
        });

        // Convert to array and sort by total issues descending
        return Object.values(statsMap).sort((a, b) => b.total - a.total);
    }, [filteredIssues]);

    // Get unique categories for dropdown
    const categories = useMemo(() => {
        const cats = new Set(issues.map(i => i.category).filter(Boolean));
        return ['All', ...Array.from(cats)];
        return ['All', ...Array.from(cats)];
    }, [issues]);

    // --- 🔑 CSV Export Logic ---
    // --- 🔑 Enhanced CSV Export Logic ---
    const handleDownloadCSV = () => {
        if (!filteredIssues.length) return;

        // 1. Category Breakdown Section
        const categoryHeaders = ["Category", "Total Reported", "Resolved", "Unresolved", "Resolution Rate %"];
        const categoryRows = categoryStats.map(stat => [
            stat.category,
            stat.total,
            stat.resolved,
            stat.unresolved,
            ((stat.resolved / stat.total) * 100).toFixed(1) + "%"
        ].join(","));

        // Combine Sections
        const csvContent = [
            "CATEGORY BREAKDOWN",
            categoryHeaders.join(","),
            ...categoryRows,
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `campus_reports_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- 🔑 PDF Export Logic (Full Height) ---
    const handleDownloadPDF = async () => {
        const element = document.getElementById('report-content');
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff' // Ensure white background
            });

            const imgData = canvas.toDataURL('image/png');

            // Calculate dimensions relative to A4 Landscape width (297mm)
            const pdfWidth = 297;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Create PDF with dynamic height to fit content
            const pdf = new jsPDF({
                orientation: pdfHeight > pdfWidth ? 'p' : 'l',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`campus_report_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Export failed:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    return (
        <motion.div
            id="report-content" // 🔑 ID for PDF capture
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <FileText className="text-indigo-500" />
                        Reports & Analytics
                    </h1>
                    <p className="text-slate-500 mt-1">Generate insights by filtering issues.</p>
                </div>

                {/* Filters Zone */}
                <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    {/* Category Select */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg w-full md:w-auto">
                        <Filter size={16} className="text-gray-400 shrink-0" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 dark:text-gray-300 w-full"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Picker */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg w-full md:w-auto">
                        <Calendar size={16} className="text-gray-400 shrink-0" />
                        <DatePicker
                            selected={dateRange.start}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setDateRange({ start, end });
                            }}
                            startDate={dateRange.start}
                            endDate={dateRange.end}
                            selectsRange
                            placeholderText="Select Date Range"
                            wrapperClassName="w-full md:w-auto" // Fix mobile width
                            className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 dark:text-gray-300 w-full md:w-48"
                        />
                    </div>

                    {/* Download Buttons Group */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <button
                            onClick={handleDownloadCSV}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm"
                        >
                            <Download size={16} /> CSV
                        </button>

                        <button
                            onClick={handleDownloadPDF}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium text-sm"
                        >
                            <FileDown size={16} /> PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard label="Total Issues" value={stats.total} color="bg-blue-500" />
                <SummaryCard label="New Issues" value={stats.newIssues} color="bg-amber-500" />
                <SummaryCard label="In Progress" value={stats.pending - stats.newIssues} color="bg-indigo-500" />
                <SummaryCard label="Resolved" value={stats.resolved} color="bg-emerald-500" />
            </div>


            {/* Detailed Text Breakdown */}
            {/* 🔑 Detailed Category Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Category Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-slate-950/50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Total Reported</th>
                                <th className="px-6 py-4 text-emerald-600 dark:text-emerald-400">Resolved</th>
                                <th className="px-6 py-4 text-amber-600 dark:text-amber-400">Unresolved</th>
                                <th className="px-6 py-4">Resolution Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {categoryStats.length > 0 ? (
                                categoryStats.map((stat) => (
                                    <tr key={stat.category} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{stat.category}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{stat.total}</td>
                                        <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-medium">{stat.resolved}</td>
                                        <td className="px-6 py-4 text-amber-600 dark:text-amber-400 font-medium">{stat.unresolved}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {((stat.resolved / stat.total) * 100).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No data available for the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Charts Section (Moved Below) */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Visual Breakdown</h2>
                <AnalyticsSection issues={filteredIssues} />
            </div>

        </motion.div>
    );
}

function SummaryCard({ label, value, color }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color} mb-1`} />
            <span className="text-4xl font-bold text-slate-900 dark:text-white">{value}</span>
            <span className="text-sm text-slate-500 font-medium">{label}</span>
        </div>
    );
}
