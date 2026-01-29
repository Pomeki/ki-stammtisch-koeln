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
    Search,
    Mail,
    Building2,
    Loader2,
    Download
} from 'lucide-react';

interface Member {
    _id: string;
    name: string;
    email: string;
    company: string;
    industry?: string;
    isVerified: boolean;
    createdAt: string;
}

export default function AdminMembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/members');
            const data = await response.json();
            if (data.success) {
                setMembers(data.data);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase()) ||
        member.company.toLowerCase().includes(search.toLowerCase())
    );

    const exportCSV = () => {
        const headers = ['Name', 'E-Mail', 'Firma', 'Branche', 'Registriert'];
        const rows = members.map(m => [
            m.name,
            m.email,
            m.company,
            m.industry || '',
            format(new Date(m.createdAt), 'dd.MM.yyyy', { locale: de })
        ]);

        const csv = [headers, ...rows].map(row => row.join(';')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mitglieder_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        link.click();
    };

    const navItems = [
        { href: '/admin', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/members', icon: Users, label: 'Mitglieder', active: true },
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
                            <h1 className="text-3xl font-bold text-white mb-2">Mitglieder</h1>
                            <p className="text-[#C4B5FD]">{members.length} registrierte Mitglieder</p>
                        </div>
                        <button onClick={exportCSV} className="btn-secondary flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            CSV Export
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B21A8]" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Suchen nach Name, E-Mail oder Firma..."
                            className="w-full pl-12 pr-4 py-3 bg-[#1A1025] border border-[#7C3AED]/30 rounded-xl text-white placeholder-[#6B21A8] focus:outline-none focus:border-[#7C3AED]"
                        />
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
                        </div>
                    ) : filteredMembers.length === 0 ? (
                        <div className="text-center py-20 bg-[#1A1025] rounded-2xl border border-[#7C3AED]/20">
                            <Users className="w-16 h-16 text-[#6B21A8] mx-auto mb-4" />
                            <p className="text-xl text-white mb-2">Keine Mitglieder gefunden</p>
                            <p className="text-[#C4B5FD]">
                                {search ? 'Versuchen Sie eine andere Suche' : 'Noch keine Registrierungen'}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-[#1A1025] rounded-2xl border border-[#7C3AED]/20 overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#7C3AED]/20">
                                        <th className="text-left p-4 text-[#C4B5FD] font-medium">Name</th>
                                        <th className="text-left p-4 text-[#C4B5FD] font-medium">E-Mail</th>
                                        <th className="text-left p-4 text-[#C4B5FD] font-medium">Firma</th>
                                        <th className="text-left p-4 text-[#C4B5FD] font-medium">Branche</th>
                                        <th className="text-left p-4 text-[#C4B5FD] font-medium">Registriert</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map((member) => (
                                        <tr key={member._id} className="border-b border-[#7C3AED]/10 hover:bg-[#7C3AED]/5">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] font-bold">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <span className="text-white">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-[#C4B5FD] hover:text-[#7C3AED]">
                                                    <Mail className="w-4 h-4" />
                                                    {member.email}
                                                </a>
                                            </td>
                                            <td className="p-4">
                                                <span className="flex items-center gap-2 text-[#C4B5FD]">
                                                    <Building2 className="w-4 h-4" />
                                                    {member.company}
                                                </span>
                                            </td>
                                            <td className="p-4 text-[#C4B5FD]">
                                                {member.industry || '-'}
                                            </td>
                                            <td className="p-4 text-[#C4B5FD]">
                                                {format(new Date(member.createdAt), 'd. MMM yyyy', { locale: de })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
