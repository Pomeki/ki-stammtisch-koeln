'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BrainCircuit, Cpu, Network, Sparkles, Database, Bot } from 'lucide-react';

export function HeroVisual() {
    const floatingNodes = [
        { Icon: BrainCircuit, top: '20%', left: '20%', delay: 0, yOffset: -30, xOffset: 20 },
        { Icon: Cpu, top: '25%', left: '75%', delay: 1, yOffset: 40, xOffset: -30 },
        { Icon: Network, top: '50%', left: '10%', delay: 2, yOffset: -20, xOffset: -20 },
        { Icon: Sparkles, top: '55%', left: '85%', delay: 3, yOffset: 30, xOffset: 40 },
        { Icon: Database, top: '80%', left: '30%', delay: 4, yOffset: -40, xOffset: -10 },
        { Icon: Bot, top: '75%', left: '70%', delay: 5, yOffset: 20, xOffset: 30 },
    ];

    return (
        <div className="relative w-full h-[600px] hidden lg:flex items-center justify-center perspective-1000">
            {/* Core Neural Network Visuals */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-[#E11D48]/30 opacity-50"
                />
                
                {/* Middle Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[350px] h-[350px] rounded-full border border-[#06b6d4]/20 border-t-[#06b6d4] opacity-70"
                />
                
                {/* Inner Glowing Core */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[200px] h-[200px] bg-[#E11D48] rounded-full blur-[70px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute w-[150px] h-[150px] bg-[#06b6d4] rounded-full blur-[50px] mix-blend-screen"
                />

                {/* Skyline Silhouette */}
                <div className="absolute z-10 w-[280px] h-[140px] flex items-center justify-center">
                    {/* Pulsing light effect on the skyline itself to match the glow */}
                    <motion.div 
                        className="relative w-full h-full"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image 
                            src="/koeln-skyline.png"
                            alt="Köln Skyline"
                            fill
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </motion.div>
                </div>

                {/* Tech Icon Nodes */}
                {floatingNodes.map((node, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 0, x: 0 }}
                        animate={{
                            y: [0, node.yOffset, 0],
                            x: [0, node.xOffset, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                        className="absolute w-14 h-14 bg-[#18181b]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 group"
                        style={{
                            top: node.top,
                            left: node.left,
                        }}
                    >
                        <node.Icon className={`w-6 h-6 ${i % 2 === 0 ? 'text-[#E11D48] drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'}`} />
                    </motion.div>
                ))}
            </div>

            {/* Glowing Accent Orbs */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-[#E11D48]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#06b6d4]/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
}
