'use client';

import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, MapPin, Clock, Users, Archive, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Event } from '@/types';

interface EventCardProps {
    event: Event;
    isPast?: boolean;
}

export function EventCard({ event, isPast = false }: EventCardProps) {
    return (
        <div className={`glass-card p-6 ${isPast ? 'opacity-60' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* Date Box */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl ${isPast ? 'bg-zinc-800 border border-white/5' : 'bg-[#E11D48]/10 border border-[#E11D48]/20'} flex flex-col items-center justify-center`}>
                    <span className={`text-xl font-bold font-syne ${isPast ? 'text-zinc-500' : 'text-[#E11D48]'}`}>
                        {format(new Date(event.date), 'd')}
                    </span>
                    <span className={`text-xs uppercase font-syne ${isPast ? 'text-zinc-600' : 'text-[#E11D48]/70'}`}>
                        {format(new Date(event.date), 'MMM', { locale: de })}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        {isPast && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-syne uppercase tracking-wider border border-zinc-700 text-zinc-500 bg-zinc-800/50">
                                <Archive className="w-3 h-3 mr-1" />
                                Vergangen
                            </span>
                        )}
                    </div>

                    <h3 className="font-syne font-bold text-lg text-white mb-1">
                        {event.title}
                    </h3>

                    <p className="text-zinc-500 text-sm mb-3 line-clamp-2 font-manrope">
                        {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-zinc-500 font-manrope">
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#06b6d4]" />
                            {event.time} Uhr
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#06b6d4]" />
                            {event.location}
                        </span>
                        {event.maxAttendees && (
                            <span className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-[#06b6d4]" />
                                {event.registeredCount}/{event.maxAttendees} Plätze
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface NextEventDisplayProps {
    event: Event | null;
    showCountdown: boolean;
}

export function NextEventDisplay({ event }: NextEventDisplayProps) {
    if (!event) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-2xl text-center py-16 px-8 relative overflow-hidden"
            >
                {/* Decorative background pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-[#06b6d4]/5 rounded-full blur-[60px] animate-pulse" />
                </div>

                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mx-auto mb-5">
                        <Radio className="w-7 h-7 text-[#06b6d4]" />
                    </div>
                    <h3 className="font-syne font-bold text-xl text-white mb-3">
                        Nächster Termin wird geplant
                    </h3>
                    <p className="text-zinc-500 max-w-md mx-auto font-manrope text-sm leading-relaxed">
                        Melden Sie sich an, um als Erste/r über das nächste Treffen informiert zu werden.
                        Wir benachrichtigen Sie per E-Mail.
                    </p>
                    <a href="#register" className="inline-block mt-6 primary-button font-syne text-sm uppercase tracking-wider cursor-pointer">
                        Benachrichtigung aktivieren
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8 border-[#06b6d4]/10"
        >
            <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-syne uppercase tracking-wider border border-[#06b6d4]/30 bg-[#06b6d4]/10 text-[#06b6d4]">
                    Nächstes Treffen
                </span>
            </div>

            <h3 className="font-syne font-bold text-2xl text-white mb-3">
                {event.title}
            </h3>

            <p className="text-zinc-400 mb-6 font-manrope">
                {event.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-[#E11D48]/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#E11D48]" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-600 font-syne uppercase tracking-wider">Datum</p>
                        <p className="font-semibold text-white text-sm font-manrope">
                            {format(new Date(event.date), 'EEEE, d. MMMM yyyy', { locale: de })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-[#E11D48]/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-[#E11D48]" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-600 font-syne uppercase tracking-wider">Uhrzeit</p>
                        <p className="font-semibold text-white text-sm font-manrope">{event.time} Uhr</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5 sm:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-[#E11D48]/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#E11D48]" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-600 font-syne uppercase tracking-wider">Ort</p>
                        <p className="font-semibold text-white text-sm font-manrope">{event.location}</p>
                        <p className="text-xs text-zinc-500 font-manrope">{event.address}</p>
                    </div>
                </div>
            </div>

            {event.maxAttendees && (
                <div className="mt-5 p-4 bg-[#06b6d4]/5 rounded-xl border border-[#06b6d4]/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[#06b6d4] font-syne text-xs uppercase tracking-wider">
                            <Users className="w-3.5 h-3.5 inline mr-1.5" />
                            {event.maxAttendees - event.registeredCount} Plätze verfügbar
                        </span>
                        <span className="text-xs text-zinc-500 font-manrope">
                            {event.registeredCount}/{event.maxAttendees}
                        </span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#06b6d4] rounded-full transition-all duration-500"
                            style={{ width: `${(event.registeredCount / event.maxAttendees) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
