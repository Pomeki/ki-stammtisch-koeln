'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BrainCircuit } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pt-6 px-4`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={`w-full max-w-5xl transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between ${isScrolled ? 'glass-panel' : 'bg-transparent'}`}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[#E11D48]/50 transition-colors">
                        <BrainCircuit className="w-5 h-5 text-[var(--color-red)]" />
                    </div>
                    <span className="font-syne font-bold text-lg text-[var(--text-heading)] hidden sm:block tracking-wide">
                        KI-Stammtisch <span className="text-[var(--color-red)]">Köln</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 font-manrope text-sm font-medium">
                    <Link href="/#about" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors tracking-wide cursor-pointer">Über uns</Link>
                    <Link href="/#events" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors tracking-wide cursor-pointer">Events</Link>
                    <Link href="/blog" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors tracking-wide cursor-pointer">Blog</Link>
                    <ThemeToggle />
                    <Link href="/#register" className="glass-pill hover:text-[var(--color-cyan)] hover:border-[#06b6d4]/50 transition-all duration-300 cursor-pointer">
                        Anmelden
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden fixed top-[80px] left-4 right-4 glass-panel rounded-2xl p-6 mt-2">
                    <div className="flex flex-col gap-6 font-syne text-lg">
                        <Link href="/#about" className="text-[var(--text-body)] hover:text-[var(--color-red)] transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>Über uns</Link>
                        <Link href="/#events" className="text-[var(--text-body)] hover:text-[var(--color-red)] transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>Events</Link>
                        <Link href="/blog" className="text-[var(--text-body)] hover:text-[var(--color-red)] transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/#register" className="text-[var(--color-cyan)] font-bold cursor-pointer" onClick={() => setIsOpen(false)}>Jetzt anmelden</Link>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
