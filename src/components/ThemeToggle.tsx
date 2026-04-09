'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-xl flex items-center justify-center hover:border-[var(--color-brand)]/30 transition-all duration-300 cursor-pointer group"
            aria-label={theme === 'dark' ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <Sun className="w-4.5 h-4.5 text-[var(--text-muted)] group-hover:text-amber-400 transition-colors" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <Moon className="w-4.5 h-4.5 text-[var(--text-muted)] group-hover:text-indigo-400 transition-colors" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
