'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const calculateTimeLeft = (): TimeLeft => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const boxes = [
        { value: isClient ? timeLeft.days : 0, label: 'Tage' },
        { value: isClient ? timeLeft.hours : 0, label: 'Std' },
        { value: isClient ? timeLeft.minutes : 0, label: 'Min' },
        { value: isClient ? timeLeft.seconds : 0, label: 'Sek' },
    ];

    return (
        <div className="flex gap-3 justify-center lg:justify-start">
            {boxes.map(({ value, label }) => (
                <div
                    key={label}
                    className="bg-[#18181b]/60 backdrop-blur-md border border-white/5 rounded-xl px-4 py-3 min-w-[70px] text-center hover:border-[#E11D48]/20 transition-colors"
                >
                    <div className="font-syne font-bold text-2xl text-white leading-none mb-1">
                        {isClient ? value.toString().padStart(2, '0') : '--'}
                    </div>
                    <div className="text-[10px] text-zinc-600 font-syne uppercase tracking-wider">
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
}
