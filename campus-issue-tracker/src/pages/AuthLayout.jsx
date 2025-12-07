import React from 'react';
import { motion } from 'framer-motion';

// This component acts as the visual wrapper for both the Login and Signup forms.
export default function AuthLayout({ children, formType }) {
    
    const title = formType === 'login' ? 'Welcome Back!' : 'Create Account';
    const subtitle = formType === 'login' 
        ? 'Sign in to access the Campus Issue Tracker.'
        : 'Register to start logging new issues.';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 space-y-6"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{subtitle}</p>
                </div>
                
                {children}

            </motion.div>
        </div>
    );
}