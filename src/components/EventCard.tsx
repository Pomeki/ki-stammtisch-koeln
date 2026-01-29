import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, MapPin, Clock, Users, Archive } from 'lucide-react';
import type { Event } from '@/types';

interface EventCardProps {
    event: Event;
    isPast?: boolean;
}

export function EventCard({ event, isPast = false }: EventCardProps) {
    return (
        <div className={`card ${isPast ? 'opacity-70' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Date Box */}
                <div className={`flex-shrink-0 w-20 h-20 rounded-2xl ${isPast ? 'bg-gray-200' : 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]'} flex flex-col items-center justify-center text-white`}>
                    <span className={`text-2xl font-bold font-poppins ${isPast ? 'text-gray-500' : ''}`}>
                        {format(new Date(event.date), 'd')}
                    </span>
                    <span className={`text-sm uppercase ${isPast ? 'text-gray-500' : ''}`}>
                        {format(new Date(event.date), 'MMM', { locale: de })}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        {isPast && (
                            <span className="badge bg-gray-100 text-gray-500">
                                <Archive className="w-3 h-3 mr-1" />
                                Vergangen
                            </span>
                        )}
                    </div>

                    <h3 className="font-poppins font-bold text-xl text-[#4C1D95] mb-2">
                        {event.title}
                    </h3>

                    <p className="text-[#6B21A8] mb-4 line-clamp-2">
                        {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-[#6B21A8]">
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#7C3AED]" />
                            {event.time} Uhr
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#7C3AED]" />
                            {event.location}
                        </span>
                        {event.maxAttendees && (
                            <span className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#7C3AED]" />
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
            <div className="card text-center py-12">
                <Calendar className="w-16 h-16 text-[#7C3AED] mx-auto mb-4 opacity-50" />
                <h3 className="font-poppins font-bold text-xl text-[#4C1D95] mb-2">
                    Kein Event geplant
                </h3>
                <p className="text-[#6B21A8]">
                    Melden Sie sich an, um über das nächste Treffen informiert zu werden.
                </p>
            </div>
        );
    }

    return (
        <div className="card bg-gradient-to-br from-white to-[#FAF5FF] border-2 border-[#7C3AED]/20">
            <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-success">Nächstes Event</span>
            </div>

            <h3 className="font-poppins font-bold text-2xl text-[#4C1D95] mb-3">
                {event.title}
            </h3>

            <p className="text-[#6B21A8] mb-6">
                {event.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <div>
                        <p className="text-sm text-[#6B21A8]">Datum</p>
                        <p className="font-semibold text-[#4C1D95]">
                            {format(new Date(event.date), 'EEEE, d. MMMM yyyy', { locale: de })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <div>
                        <p className="text-sm text-[#6B21A8]">Uhrzeit</p>
                        <p className="font-semibold text-[#4C1D95]">{event.time} Uhr</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl sm:col-span-2">
                    <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <div>
                        <p className="text-sm text-[#6B21A8]">Ort</p>
                        <p className="font-semibold text-[#4C1D95]">{event.location}</p>
                        <p className="text-sm text-[#6B21A8]">{event.address}</p>
                    </div>
                </div>
            </div>

            {event.maxAttendees && (
                <div className="mt-6 p-4 bg-[#22C55E]/10 rounded-xl">
                    <div className="flex items-center justify-between">
                        <span className="text-[#15803d] font-medium">
                            <Users className="w-4 h-4 inline mr-2" />
                            {event.maxAttendees - event.registeredCount} Plätze verfügbar
                        </span>
                        <span className="text-sm text-[#15803d]">
                            {event.registeredCount}/{event.maxAttendees} angemeldet
                        </span>
                    </div>
                    <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                            style={{ width: `${(event.registeredCount / event.maxAttendees) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
