'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from '@/types';
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
    EyeOff
} from 'lucide-react';

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'ki-news' as BlogCategory,
        author: 'Admin',
        tags: '',
        isPublished: true,
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'ki-news',
            author: 'Admin',
            tags: '',
            isPublished: true,
        });
        setShowModal(true);
    };

    const openEditModal = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            tags: post.tags.join(', '),
            isPublished: post.isPublished,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingPost ? `/api/posts?slug=${editingPost.slug}` : '/api/posts';
            const method = editingPost ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                }),
            });

            const data = await response.json();
            if (data.success) {
                setShowModal(false);
                fetchPosts();
            }
        } catch (error) {
            console.error('Error saving post:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Möchten Sie diesen Beitrag wirklich löschen?')) return;

        try {
            const response = await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                fetchPosts();
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const navItems = [
        { href: '/admin', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/members', icon: Users, label: 'Mitglieder' },
        { href: '/admin/events', icon: Calendar, label: 'Events' },
        { href: '/admin/posts', icon: FileText, label: 'Blog', active: true },
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
                            <h1 className="text-3xl font-bold text-white mb-2">Blog-Beiträge</h1>
                            <p className="text-[#C4B5FD]">{posts.length} Beiträge gesamt</p>
                        </div>
                        <button onClick={openCreateModal} className="btn-cta flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Neuer Beitrag
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 bg-[#1A1025] rounded-2xl border border-[#7C3AED]/20">
                            <FileText className="w-16 h-16 text-[#6B21A8] mx-auto mb-4" />
                            <p className="text-xl text-white mb-2">Keine Beiträge vorhanden</p>
                            <p className="text-[#C4B5FD] mb-6">Erstellen Sie Ihren ersten Blog-Beitrag</p>
                            <button onClick={openCreateModal} className="btn-primary">
                                <Plus className="w-5 h-5 mr-2" />
                                Beitrag erstellen
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.slug} className="bg-[#1A1025] rounded-2xl p-6 border border-[#7C3AED]/20">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 rounded-full text-xs bg-[#7C3AED]/20 text-[#A78BFA]">
                                                    {BLOG_CATEGORIES[post.category]}
                                                </span>
                                                {!post.isPublished && (
                                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                                                        <EyeOff className="w-3 h-3" />
                                                        Entwurf
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1 truncate">{post.title}</h3>
                                            <p className="text-[#C4B5FD] text-sm mb-2 line-clamp-1">{post.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-[#6B21A8]">
                                                <span>{post.author}</span>
                                                <span>•</span>
                                                <span>{format(new Date(post.publishedAt), 'd. MMM yyyy', { locale: de })}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 rounded-lg hover:bg-[#7C3AED]/20 text-[#C4B5FD] hover:text-white cursor-pointer"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => openEditModal(post)}
                                                className="p-2 rounded-lg hover:bg-[#7C3AED]/20 text-[#7C3AED] cursor-pointer"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.slug)}
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
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1A1025] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-[#7C3AED]/20">
                            <h2 className="text-xl font-bold text-white">
                                {editingPost ? 'Beitrag bearbeiten' : 'Neuer Beitrag'}
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
                                    placeholder="Titel des Beitrags"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Kurzfassung</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(f => ({ ...f, excerpt: e.target.value }))}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                                    placeholder="Kurze Zusammenfassung des Beitrags..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Inhalt (Markdown) *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData(f => ({ ...f, content: e.target.value }))}
                                    required
                                    rows={10}
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] resize-none font-mono text-sm"
                                    placeholder="# Überschrift&#10;&#10;Ihr Inhalt hier...&#10;&#10;## Unterüberschrift&#10;&#10;- Aufzählung 1&#10;- Aufzählung 2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Kategorie</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(f => ({ ...f, category: e.target.value as BlogCategory }))}
                                        className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    >
                                        {Object.entries(BLOG_CATEGORIES).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Autor</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData(f => ({ ...f, author: e.target.value }))}
                                        className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#C4B5FD] mb-2">Tags (kommagetrennt)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData(f => ({ ...f, tags: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white focus:outline-none focus:border-[#7C3AED]"
                                    placeholder="ki, chatgpt, automatisierung"
                                />
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-[#0F0A1A] rounded-xl">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData(f => ({ ...f, isPublished: e.target.checked }))}
                                    className="w-5 h-5 rounded border-[#7C3AED] text-[#7C3AED] focus:ring-[#7C3AED]"
                                />
                                <label htmlFor="isPublished" className="text-[#C4B5FD] cursor-pointer">
                                    Beitrag veröffentlichen
                                </label>
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
