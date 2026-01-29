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
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-poppins font-bold text-lg text-[#4C1D95] hidden sm:block">
                        KI-Stammtisch <span className="text-[#E11D48]">Köln</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/#about"
                        className="text-[#6B21A8] hover:text-[#7C3AED] transition-colors font-medium cursor-pointer"
                    >
                        Über uns
                    </Link>
                    <Link
                        href="/#events"
                        className="text-[#6B21A8] hover:text-[#7C3AED] transition-colors font-medium cursor-pointer"
                    >
                        Events
                    </Link>
                    <Link
                        href="/blog"
                        className="text-[#6B21A8] hover:text-[#7C3AED] transition-colors font-medium cursor-pointer"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/#register"
                        className="btn-primary cursor-pointer"
                    >
                        Jetzt anmelden
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-[#7C3AED]/10 transition-colors cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="w-6 h-6 text-[#7C3AED]" />
                    ) : (
                        <Menu className="w-6 h-6 text-[#7C3AED]" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-[#7C3AED]/10 pt-4">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/#about"
                            className="text-[#6B21A8] hover:text-[#7C3AED] transition-colors font-medium cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Über uns
                        </Link>
                        <Link
                            href="/#events"
                            className="text-[#6B21A8] hover:text-[#7C3AED] transition-colors font-medium cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Events
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[#6B21A8] hover:text-[#7C3AED] transition-colors font-medium cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/#register"
                            className="btn-cta text-center cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Jetzt anmelden
                        </Link>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
