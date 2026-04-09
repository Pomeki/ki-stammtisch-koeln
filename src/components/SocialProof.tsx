'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Calendar, Briefcase } from 'lucide-react';

function Counter({ from, to, duration, suffix = '' }: { from: number; to: number; duration: number; suffix?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(from);

    useEffect(() => {
        if (!inView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);
            
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - percentage, 4);
            
            setCount(Math.floor(from + (to - from) * easeProgress));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [inView, from, to, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

export function SocialProof() {
    const stats = [
        {
            icon: Users,
            value: 250,
            suffix: '+',
            label: 'Aktive Teilnehmer',
            description: 'aus dem Raum Köln'
        },
        {
            icon: Calendar,
            value: 12,
            suffix: '',
            label: 'Erfolgreiche Treffen',
            description: 'seit der Gründung'
        },
        {
            icon: Briefcase,
            value: 30,
            suffix: '+',
            label: 'Verschiedene Branchen',
            description: 'von Tech bis Medizin'
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E11D48]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-syne text-[var(--color-cyan)] uppercase tracking-[0.2em] mb-3"
                    >
                        Community
                    </motion.h2>
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-syne font-bold mb-6"
                    >
                        Wachsen Sie mit uns
                    </motion.h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:border-[#06b6d4]/30 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <stat.icon className="w-6 h-6 text-[var(--color-cyan)]" />
                            </div>
                            <div className="text-5xl font-syne font-bold mb-2 text-glow-cyan">
                                <Counter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
                            </div>
                            <h4 className="text-lg font-syne font-bold mb-2">{stat.label}</h4>
                            <p className="text-sm font-manrope text-[var(--text-muted)]">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
