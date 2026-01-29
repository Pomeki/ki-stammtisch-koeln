'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    BrainCircuit,
    Users,
    Calendar,
    FileText,
    Settings,
    LogOut,
    TrendingUp,
    Eye,
    Save,
    Loader2,
    Check,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

interface SettingsData {
    showCountdown: boolean;
    showEventArchive: boolean;
    heroTitle: string;
    heroSubtitle: string;
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SettingsData>({
        showCountdown: true,
        showEventArchive: true,
        heroTitle: 'KI-Stammtisch Köln',
        heroSubtitle: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);

        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            const data = await response.json();
            if (data.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setSaving(false);
        }
    };

    const navItems = [
        { href: '/admin', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/members', icon: Users, label: 'Mitglieder' },
        { href: '/admin/events', icon: Calendar, label: 'Events' },
        { href: '/admin/posts', icon: FileText, label: 'Blog' },
        { href: '/admin/settings', icon: Settings, label: 'Einstellungen', active: true },
    ];

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
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Einstellungen</h1>
                        <p className="text-[#C4B5FD]">Konfigurieren Sie die Website-Einstellungen</p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Toggle Settings */}
                            <div className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                                <h2 className="text-xl font-bold text-white mb-6">Anzeige-Optionen</h2>

                                <div className="space-y-6">
                                    {/* Countdown Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-[#0F0A1A] rounded-xl">
                                        <div>
                                            <p className="text-white font-medium">Countdown anzeigen</p>
                                            <p className="text-sm text-[#C4B5FD]">Zeigt einen Countdown zum nächsten Event auf der Startseite</p>
                                        </div>
                                        <button
                                            onClick={() => setSettings(s => ({ ...s, showCountdown: !s.showCountdown }))}
                                            className="cursor-pointer"
                                        >
                                            {settings.showCountdown ? (
                                                <ToggleRight className="w-12 h-12 text-[#22C55E]" />
                                            ) : (
                                                <ToggleLeft className="w-12 h-12 text-[#6B21A8]" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Event Archive Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-[#0F0A1A] rounded-xl">
                                        <div>
                                            <p className="text-white font-medium">Event-Archiv anzeigen</p>
                                            <p className="text-sm text-[#C4B5FD]">Zeigt vergangene Events auf der Startseite</p>
                                        </div>
                                        <button
                                            onClick={() => setSettings(s => ({ ...s, showEventArchive: !s.showEventArchive }))}
                                            className="cursor-pointer"
                                        >
                                            {settings.showEventArchive ? (
                                                <ToggleRight className="w-12 h-12 text-[#22C55E]" />
                                            ) : (
                                                <ToggleLeft className="w-12 h-12 text-[#6B21A8]" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Settings */}
                            <div className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                                <h2 className="text-xl font-bold text-white mb-6">Hero-Bereich</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#C4B5FD] mb-2">
                                            Titel
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.heroTitle}
                                            onChange={(e) => setSettings(s => ({ ...s, heroTitle: e.target.value }))}
                                            className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#C4B5FD] mb-2">
                                            Untertitel
                                        </label>
                                        <textarea
                                            value={settings.heroSubtitle}
                                            onChange={(e) => setSettings(s => ({ ...s, heroSubtitle: e.target.value }))}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="btn-primary disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Speichern...
                                        </>
                                    ) : saved ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Gespeichert!
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Einstellungen speichern
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
