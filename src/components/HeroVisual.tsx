'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MouseEvent } from 'react';

interface HeroVisualProps {
    nextEvent: any;
    memberCount?: number;
}

export function HeroVisual({ nextEvent, memberCount = 120 }: HeroVisualProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 10 });

    function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <motion.div
            className="relative w-full h-[500px] hidden lg:block perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/20 rounded-full blur-[100px]"
            />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E11D48]/10 rounded-full blur-[80px]" />

            {/* Main Event Card (Tilted) */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="absolute top-10 left-10 w-[380px] bg-[#1A1025]/90 backdrop-blur-xl border border-[#7C3AED]/30 rounded-3xl p-6 shadow-2xl z-20"
            >
                <div
                    className="flex justify-between items-start mb-6"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <div className="inline-flex px-3 py-1 rounded-full bg-[#7C3AED]/20 text-[#A78BFA] text-sm font-semibold border border-[#7C3AED]/20">
                        Nächstes Event
                    </div>
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1025] bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center text-[10px] text-white font-bold">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-[#1A1025] bg-[#22C55E] flex items-center justify-center text-[10px] text-white font-bold">
                            +
                        </div>
                    </div>
                </div>

                <div style={{ transform: "translateZ(30px)" }}>
                    {nextEvent ? (
                        <>
                            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                                {nextEvent.title}
                            </h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-[#C4B5FD]">
                                    <Calendar className="w-5 h-5 text-[#7C3AED]" />
                                    <span>
                                        {format(new Date(nextEvent.date), 'd. MMMM yyyy', { locale: de })} • {nextEvent.time} Uhr
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[#C4B5FD]">
                                    <MapPin className="w-5 h-5 text-[#7C3AED]" />
                                    <span className="truncate">{nextEvent.location}</span>
                                </div>
                            </div>
                            <div className="w-full bg-[#7C3AED] h-1.5 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="bg-[#22C55E] h-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                            <p className="text-xs text-[#A78BFA] text-right">Plätze schnell gesichert!</p>
                        </>
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-white">Termin wird bald bekanntgegeben</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Community Card (Floating) */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [5, 2, 5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 w-[280px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-xl z-30"
                style={{ transform: 'rotate(5deg)' }}
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <div>
                        <p className="text-sm text-[#6B21A8] font-medium">Community</p>
                        <p className="text-2xl font-bold text-[#4C1D95]">{memberCount}+</p>
                    </div>
                </div>
                <p className="text-sm text-[#6B21A8]">
                    Technologie-Enthusiasten aus Köln sind bereits dabei.
                </p>
            </motion.div>

            {/* Decorative Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [12, 18, 12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-0 right-20"
            >
                <div className="w-16 h-16 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🚀</span>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-40 left-0"
            >
                <div className="w-14 h-14 bg-gradient-to-br from-[#E11D48] to-[#BE123C] rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                    <span className="text-2xl">💡</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
