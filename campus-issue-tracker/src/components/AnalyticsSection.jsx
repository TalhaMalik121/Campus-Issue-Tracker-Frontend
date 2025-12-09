import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

export default function AnalyticsSection({ issues }) {

    // 1. Data for Pie Chart: Issues by Category
    const categoryData = useMemo(() => {
        const counts = {};
        issues.forEach(issue => {
            const cat = issue.category || 'Uncategorized';
            counts[cat] = (counts[cat] || 0) + 1;
        });

        return Object.keys(counts).map(key => ({
            name: key,
            value: counts[key]
        }));
    }, [issues]);

    // 2. Data for Bar Chart: Created vs Resolved
    const barData = useMemo(() => {
        const dataMap = {};

        issues.forEach(issue => {
            const cat = issue.category || 'Uncategorized';
            if (!dataMap[cat]) {
                dataMap[cat] = { name: cat, Created: 0, Resolved: 0 };
            }
            // "Created" counts ALL issues in this category
            dataMap[cat].Created++;

            // "Resolved" counts only resolved ones
            if (issue.status === 'Resolved') {
                dataMap[cat].Resolved++;
            }
        });

        return Object.values(dataMap);
    }, [issues]);

    // Colors for Pie Chart
    const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];

    if (!issues || issues.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 self-start w-full">Issues by Category</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                                isAnimationActive={false}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Created vs Resolved Bar Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 self-start w-full">Created vs Resolved</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={barData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                            <Bar dataKey="Created" fill="#6366f1" isAnimationActive={false}>
                                <LabelList dataKey="Created" position="top" fill="#6366f1" fontSize={12} fontWeight="bold" />
                            </Bar>
                            <Bar dataKey="Resolved" fill="#10b981" isAnimationActive={false}>
                                <LabelList dataKey="Resolved" position="top" fill="#10b981" fontSize={12} fontWeight="bold" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
