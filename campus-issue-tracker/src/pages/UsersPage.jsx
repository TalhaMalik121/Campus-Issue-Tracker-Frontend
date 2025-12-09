import React, { useEffect, useState } from "react";
import { adminApi } from "../api/api";
import { motion } from "framer-motion";
import { User, Shield, ShieldOff, Loader2 } from "lucide-react";

export default function UsersPage({ role }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await adminApi.fetchUsers();
            setUsers(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleBlock = async (id) => {
        try {
            const updatedUser = await adminApi.toggleBlockUser(id);
            setUsers(users.map(u => u._id === updatedUser._id ? { ...u, isBlocked: updatedUser.isBlocked } : u));
        } catch (err) {
            alert("Failed to update user status");
        }
    };

    if (role !== "Admin") {
        return <div className="p-8 text-center text-surface-500">Access Denied</div>;
    }

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary-500" /></div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="text-3xl font-display font-bold text-surface-900 dark:text-white">User Management</h1>

            <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-sm border border-surface-200 dark:border-surface-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-50 dark:bg-surface-800/50 text-surface-500 dark:text-surface-400 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Roll No</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 flex items-center justify-center font-bold text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-surface-900 dark:text-white">{user.name}</p>
                                                <p className="text-xs text-surface-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-surface-600 dark:text-surface-300">
                                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-surface-600 dark:text-surface-300">{user.rollNo || '-'}</td>
                                    <td className="p-4">
                                        {user.isBlocked ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full">
                                                Blocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                                                Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleToggleBlock(user._id)}
                                            disabled={user.role === 'Admin'} // Cannot block admins logic handled in backend too
                                            className={`p-2 rounded-lg transition-colors ${user.isBlocked
                                                ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                                : "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {user.isBlocked ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
