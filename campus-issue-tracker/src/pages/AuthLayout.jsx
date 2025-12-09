import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User } from 'lucide-react';

export default function AuthLayout({ children, formType, titleOverride, subtitleOverride }) {

    // Fallback logic
    const defaultTitle = formType === 'login' ? 'Welcome Back' : 'Create Account';
    const defaultSubtitle = formType === 'login'
        ? 'Sign in to access your dashboard'
        : 'Register to start logging issues';

    const title = titleOverride || defaultTitle;
    const subtitle = subtitleOverride || defaultSubtitle;
    const Icon = formType === 'login' ? Shield : User;

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 p-4 relative overflow-hidden font-sans">

            {/* AMBIENT BACKGROUNDS */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-500/10 blur-[100px] animate-float" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg glass-panel p-8 md:p-10 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
                        <Icon className="w-7 h-7" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-2">{title}</h1>
                    <p className="text-surface-500 dark:text-surface-400">{subtitle}</p>
                </div>

                {children}

            </motion.div>
        </div>
    );
}