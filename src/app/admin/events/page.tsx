'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import {
    BrainCircuit,
    Users,
    Calendar,
    FileText,
    Settings,
    TrendingUp,
    Eye,
    Plus,
    Edit,
    Trash2,
    Loader2,
    X,
    Save,
    MapPin,
    Clock
} from 'lucide-react';

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    address: string;
    maxAttendees?: number;
    registeredCount: number;
    isActive: boolean;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '19:00',
        location: '',
        address: '',
        maxAttendees: '',
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            const data = await response.json();
            if (data.success) {
                setEvents(data.data);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '19:00',
            location: '',
            address: '',
            maxAttendees: '',
        });
        setShowModal(true);
    };

    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: format(new Date(event.date), 'yyyy-MM-dd'),
            time: event.time,
            location: event.location,
            address: event.address,
            maxAttendees: event.maxAttendees?.toString() || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingEvent ? `/api/events/${editingEvent._id}` : '/api/events';
            const method = editingEvent ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setShowModal(false);
                fetchEvents();
            }
        } catch (error) {
            console.error('Error saving event:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Möchten Sie dieses Event wirklich löschen?')) return;

        try {
            const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                fetchEvents();
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const navItems = [
        { href: '/admin', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/members', icon: Users, label: 'Mitglieder' },
        { href: '/admin/events', icon: Calendar, label: 'Events', active: true },
        { href: '/admin/posts', icon: FileText, label: 'Blog' },
        { href: '/admin/settings', icon: Settings, label: 'Einstellungen' },
    ];

    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
    const pastEvents = events.filter(e => new Date(e.date) < new Date());

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1A1025] border-r border-[#7C3AED]/20 p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="font-poppins font-bold text-white">Admin</span>
                        <p className="text-xs text-[#C4B5FD]">KI-Stammtisch</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${item.active
                                    ? 'bg-[#7C3AED] text-white'
                                    : 'text-[#C4B5FD] hover:bg-[#7C3AED]/10 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-[#7C3AED]/20 mt-8">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#C4B5FD] hover:bg-[#7C3AED]/10 hover:text-white transition-colors cursor-pointer"
                    >
                        <Eye className="w-5 h-5" />
                        Website ansehen
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
                            <p className="text-[#C4B5FD]">{events.length} Events gesamt</p>
                        </div>
                        <button onClick={openCreateModal} className="btn-cta flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Neues Event
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Upcoming Events */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">Kommende Events ({upcomingEvents.length})</h2>
                                {upcomingEvents.length === 0 ? (
                                    <div className="text-center py-12 bg-[#1A1025] rounded-2xl border border-[#7C3AED]/20">
                                        <Calendar className="w-12 h-12 text-[#6B21A8] mx-auto mb-3" />
                                        <p className="text-[#C4B5FD]">Keine kommenden Events</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {upcomingEvents.map((event) => (
                                            <div key={event._id} className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex gap-4">
                                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex flex-col items-center justify-center text-white">
                                                            <span className="text-xl font-bold">{format(new Date(event.date), 'd')}</span>
                                                            <span className="text-xs uppercase">{format(new Date(event.date), 'MMM', { locale: de })}</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                                                            <p className="text-[#C4B5FD] text-sm mb-2">{event.description}</p>
                                                            <div className="flex items-center gap-4 text-sm text-[#C4B5FD]">
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4" /> {event.time} Uhr
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <MapPin className="w-4 h-4" /> {event.location}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => openEditModal(event)}
                                                            className="p-2 rounded-lg hover:bg-[#7C3AED]/20 text-[#7C3AED] cursor-pointer"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(event._id)}
                                                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Past Events */}
                            {pastEvents.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">Vergangene Events ({pastEvents.length})</h2>
                                    <div className="space-y-4">
                                        {pastEvents.map((event) => (
                                            <div key={event._id} className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/10 opacity-60">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex gap-4">
                                                        <div className="w-16 h-16 rounded-xl bg-gray-700 flex flex-col items-center justify-center text-gray-400">
                                                            <span className="text-xl font-bold">{format(new Date(event.date), 'd')}</span>
                                                            <span className="text-xs uppercase">{format(new Date(event.date), 'MMM', { locale: de })}</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-400 mb-1">{event.title}</h3>
                                                            <p className="text-gray-500 text-sm">{event.location}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(event._id)}
                                                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400/50 hover:text-red-400 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1A1025] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-[#7C3AED]/20">
                            <h2 className="text-xl font-bold text-white">
                                {editingEvent ? 'Event bearbeiten' : 'Neues Event'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-[#C4B5FD] hover:text-white cursor-pointer">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Titel *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(f => ({ ...f, title: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    placeholder="z.B. KI-Stammtisch #5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Beschreibung *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                                    placeholder="Beschreiben Sie das Event..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Datum *</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData(f => ({ ...f, date: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Uhrzeit *</label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData(f => ({ ...f, time: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Location *</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData(f => ({ ...f, location: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    placeholder="z.B. Café Central"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Adresse *</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData(f => ({ ...f, address: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    placeholder="z.B. Schildergasse 1, 50667 Köln"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Max. Teilnehmer (optional)</label>
                                <input
                                    type="number"
                                    value={formData.maxAttendees}
                                    onChange={(e) => setFormData(f => ({ ...f, maxAttendees: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    placeholder="z.B. 30"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn-secondary flex-1"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn-primary flex-1 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Speichern
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
