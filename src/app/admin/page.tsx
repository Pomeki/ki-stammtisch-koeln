import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { MemberModel, EventModel, getSettings } from '@/models';
import { getAllPosts } from '@/lib/blog';
import {
    BrainCircuit,
    Users,
    Calendar,
    FileText,
    Settings,
    LogOut,
    TrendingUp,
    ArrowRight,
    Eye
} from 'lucide-react';

async function getDashboardData() {
    await connectToDatabase();

    const [memberCount, eventCount, upcomingEvents, recentMembers] = await Promise.all([
        MemberModel.countDocuments(),
        EventModel.countDocuments(),
        EventModel.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(3).lean(),
        MemberModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const posts = getAllPosts();
    const settings = await getSettings();

    return {
        stats: {
            members: memberCount,
            events: eventCount,
            posts: posts.length,
            publishedPosts: posts.filter(p => p.isPublished).length,
        },
        upcomingEvents: JSON.parse(JSON.stringify(upcomingEvents)),
        recentMembers: JSON.parse(JSON.stringify(recentMembers)),
        settings: JSON.parse(JSON.stringify(settings)),
    };
}

export default async function AdminDashboard() {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    const { stats, upcomingEvents, recentMembers, settings } = await getDashboardData();

    const navItems = [
        { href: '/admin', icon: TrendingUp, label: 'Dashboard', active: true },
        { href: '/admin/members', icon: Users, label: 'Mitglieder' },
        { href: '/admin/events', icon: Calendar, label: 'Events' },
        { href: '/admin/posts', icon: FileText, label: 'Blog' },
        { href: '/admin/settings', icon: Settings, label: 'Einstellungen' },
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
                    <form action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/admin/login' });
                    }}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#C4B5FD] hover:bg-red-500/10 hover:text-red-400 w-full transition-colors cursor-pointer"
                        >
                            <LogOut className="w-5 h-5" />
                            Abmelden
                        </button>
                    </form>

                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#C4B5FD] hover:bg-[#7C3AED]/10 hover:text-white transition-colors cursor-pointer mt-2"
                    >
                        <Eye className="w-5 h-5" />
                        Website ansehen
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-[#C4B5FD]">Willkommen zurück, {session.user?.name || 'Admin'}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Mitglieder', value: stats.members, icon: Users, color: 'from-[#7C3AED] to-[#5B21B6]' },
                            { label: 'Events', value: stats.events, icon: Calendar, color: 'from-[#22C55E] to-[#15803d]' },
                            { label: 'Blog-Beiträge', value: stats.posts, icon: FileText, color: 'from-[#E11D48] to-[#BE123C]' },
                            { label: 'Veröffentlicht', value: stats.publishedPosts, icon: TrendingUp, color: 'from-[#F59E0B] to-[#D97706]' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-[#C4B5FD]">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Settings Quick View */}
                    <div className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Schnelleinstellungen</h2>
                            <Link href="/admin/settings" className="text-[#7C3AED] hover:text-[#A78BFA] text-sm cursor-pointer">
                                Alle Einstellungen →
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 bg-[#0F0A1A] rounded-xl">
                                <span className="text-[#C4B5FD]">Countdown anzeigen</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${settings.showCountdown ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {settings.showCountdown ? 'Aktiv' : 'Inaktiv'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[#0F0A1A] rounded-xl">
                                <span className="text-[#C4B5FD]">Event-Archiv anzeigen</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${settings.showEventArchive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {settings.showEventArchive ? 'Aktiv' : 'Inaktiv'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Recent Members */}
                        <div className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Neue Mitglieder</h2>
                                <Link href="/admin/members" className="text-[#7C3AED] hover:text-[#A78BFA] flex items-center gap-1 cursor-pointer">
                                    Alle <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            {recentMembers.length === 0 ? (
                                <p className="text-[#6B21A8] text-center py-8">Noch keine Mitglieder</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentMembers.map((member: { _id: string; name: string; company: string; email: string }) => (
                                        <div key={member._id} className="flex items-center gap-4 p-3 bg-[#0F0A1A] rounded-xl">
                                            <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium truncate">{member.name}</p>
                                                <p className="text-sm text-[#C4B5FD] truncate">{member.company}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Kommende Events</h2>
                                <Link href="/admin/events" className="text-[#7C3AED] hover:text-[#A78BFA] flex items-center gap-1 cursor-pointer">
                                    Alle <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            {upcomingEvents.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-[#6B21A8] mb-4">Keine kommenden Events</p>
                                    <Link href="/admin/events" className="btn-primary cursor-pointer">
                                        Event erstellen
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingEvents.map((event: { _id: string; title: string; date: string; location: string }) => (
                                        <div key={event._id} className="p-4 bg-[#0F0A1A] rounded-xl">
                                            <p className="text-white font-medium mb-1">{event.title}</p>
                                            <p className="text-sm text-[#C4B5FD]">
                                                {new Date(event.date).toLocaleDateString('de-DE')} • {event.location}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
