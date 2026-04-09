import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer, BlogList } from '@/components';
import { getPublishedPosts } from '@/lib/blog';
import { BLOG_CATEGORIES, type BlogCategory } from '@/types';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog | KI-Stammtisch Köln',
    description: 'Aktuelle Beiträge zu KI-News, Use Cases, Event-Recaps und Tutorials vom KI-Stammtisch Köln.',
};

interface BlogPageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const category = params.category as BlogCategory | undefined;

    let posts = getPublishedPosts();

    if (category && category in BLOG_CATEGORIES) {
        posts = posts.filter((post) => post.category === category);
    }

    return (
        <>
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[var(--color-cyan)] hover:text-[var(--color-red)] mb-6 cursor-pointer transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Zurück zur Startseite
                        </Link>

                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#be123c] flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Blog
                        </h1>
                        <p className="text-xl text-[var(--text-body)]">
                            Neuigkeiten, Einblicke und Wissen rund um Künstliche Intelligenz
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <Link
                            href="/blog"
                            className={`badge cursor-pointer transition-colors ${!category ? 'bg-[#E11D48] text-white' : 'badge-primary hover:bg-[#E11D48]/20'
                                }`}
                        >
                            Alle
                        </Link>
                        {Object.entries(BLOG_CATEGORIES).map(([key, label]) => (
                            <Link
                                key={key}
                                href={`/blog?category=${key}`}
                                className={`badge cursor-pointer transition-colors ${category === key ? 'bg-[#E11D48] text-white' : 'badge-primary hover:bg-[#E11D48]/20'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Posts List */}
                    <BlogList posts={posts} />
                </div>
            </main>

            <Footer />
        </>
    );
}
