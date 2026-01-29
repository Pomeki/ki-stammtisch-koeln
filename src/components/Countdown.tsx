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

    if (!isClient) {
        return (
            <div className="flex gap-3 md:gap-4 justify-center">
                {['Tage', 'Std', 'Min', 'Sek'].map((label) => (
                    <div key={label} className="countdown-box">
                        <div className="countdown-number">--</div>
                        <div className="countdown-label">{label}</div>
                    </div>
                ))}
            </div>
        );
    }

    const boxes = [
        { value: timeLeft.days, label: 'Tage' },
        { value: timeLeft.hours, label: 'Std' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Sek' },
    ];

    return (
        <div className="flex gap-3 md:gap-4 justify-center">
            {boxes.map(({ value, label }) => (
                <div key={label} className="countdown-box animate-pulse-glow">
                    <div className="countdown-number">
                        {value.toString().padStart(2, '0')}
                    </div>
                    <div className="countdown-label">{label}</div>
                </div>
            ))}
        </div>
    );
}
