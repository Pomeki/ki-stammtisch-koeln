'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function StickyCTA() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const docHeight = typeof document !== 'undefined' ? document.body.scrollHeight : 0;
        const winHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        const formIsVisible = latest > (docHeight - winHeight - 1200);
        
        setIsVisible(latest > 600 && !formIsVisible);
    });

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
                y: isVisible ? 0 : 100,
                opacity: isVisible ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 z-40 md:hidden pointer-events-none"
        >
            <div className="glass-panel rounded-2xl p-3 flex items-center justify-between pointer-events-auto border-[#E11D48]/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                <div>
                    <p className="font-syne font-bold text-sm text-[var(--text-heading)]">Nächster Stammtisch</p>
                    <p className="font-manrope text-xs text-[var(--text-muted)]">Sichern Sie sich Ihren Platz</p>
                </div>
                <a 
                    href="#register" 
                    className="bg-[#E11D48] hover:bg-[#be123c] transition-colors text-white rounded-xl px-5 py-2.5 font-syne text-xs uppercase tracking-wider font-bold flex items-center gap-2"
                >
                    Anmelden
                    <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>
        </motion.div>
    );
}
