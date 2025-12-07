import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react'; 

// 🔑 ACCEPT titleOverride and subtitleOverride
export default function AuthLayout({ children, formType, titleOverride, subtitleOverride }) {
    
    // Fallback logic remains, but overrides are prioritized
    const defaultTitle = formType === 'login' ? 'CampusTracker' : 'Create Account';
    const defaultSubtitle = formType === 'login' 
        ? 'Sign in to access the Campus Issue Tracker.'
        : 'Register to start logging new issues.';
    
    // 🔑 Use overrides if provided
    const title = titleOverride || defaultTitle;
    const subtitle = subtitleOverride || defaultSubtitle;
    
    // Choose the icon based on the form type
    const Icon = formType === 'login' ? Shield : User;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-200 dark:bg-gray-900 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', damping: 15, stiffness: 100 }}
                className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8 transition-colors duration-500"
            >
                <div className="text-center space-y-2">
                    {/* Icon for visual context */}
                    <Icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" />
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light">{subtitle}</p>
                </div>
                
                {children}

            </motion.div>
        </div>
    );
}