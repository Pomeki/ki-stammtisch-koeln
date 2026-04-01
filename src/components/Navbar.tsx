'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BrainCircuit } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

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
                    <div className="w-10 h-10 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-center group-hover:border-[#E11D48]/50 transition-colors">
                        <BrainCircuit className="w-5 h-5 text-[#E11D48]" />
                    </div>
                    <span className="font-syne font-bold text-lg text-white hidden sm:block tracking-wide">
                        KI-Stammtisch <span className="text-[#E11D48]">Köln</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 font-manrope text-sm font-medium">
                    <Link href="/#about" className="text-zinc-400 hover:text-white transition-colors tracking-wide cursor-pointer">Über uns</Link>
                    <Link href="/#events" className="text-zinc-400 hover:text-white transition-colors tracking-wide cursor-pointer">Events</Link>
                    <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors tracking-wide cursor-pointer">Blog</Link>
                    <Link href="/#register" className="glass-pill hover:text-[#06b6d4] hover:border-[#06b6d4]/50 transition-all duration-300 cursor-pointer">
                        Anmelden
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden fixed top-[80px] left-4 right-4 glass-panel rounded-2xl p-6 mt-2 border border-white/10">
                    <div className="flex flex-col gap-6 font-syne text-lg">
                        <Link href="/#about" className="text-zinc-300 hover:text-[#E11D48] transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>Über uns</Link>
                        <Link href="/#events" className="text-zinc-300 hover:text-[#E11D48] transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>Events</Link>
                        <Link href="/blog" className="text-zinc-300 hover:text-[#E11D48] transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/#register" className="text-[#06b6d4] font-bold cursor-pointer" onClick={() => setIsOpen(false)}>Jetzt anmelden</Link>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
