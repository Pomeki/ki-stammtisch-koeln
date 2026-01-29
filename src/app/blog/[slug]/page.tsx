import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Navbar, Footer } from '@/components';
import { getPostBySlug, getPostContent, getPublishedPosts } from '@/lib/blog';
import { BLOG_CATEGORIES } from '@/types';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Beitrag nicht gefunden' };
    }

    return {
        title: `${post.title} | KI-Stammtisch Köln Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt.toISOString(),
            authors: [post.author],
        },
    };
}

export async function generateStaticParams() {
    const posts = getPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || !post.isPublished) {
        notFound();
    }

    const content = await getPostContent(slug);

    // Estimate reading time (200 words per minute)
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Get related posts from same category
    const relatedPosts = getPublishedPosts()
        .filter((p) => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    return (
        <>
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="container mx-auto px-6">
                    {/* Back Link */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[#7C3AED] hover:text-[#5B21B6] cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Zurück zum Blog
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="max-w-3xl mx-auto mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="badge badge-primary">
                                {BLOG_CATEGORIES[post.category]}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-[#6B21A8]">
                                <Clock className="w-4 h-4" />
                                {readingTime} Min. Lesezeit
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4C1D95] mb-6">
                            {post.title}
                        </h1>

                        <p className="text-xl text-[#6B21A8] mb-8">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B21A8] pb-8 border-b border-[#7C3AED]/10">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#7C3AED]" />
                                {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#7C3AED]" />
                                {format(new Date(post.publishedAt), 'd. MMMM yyyy', { locale: de })}
                            </span>
                            {post.updatedAt && (
                                <span className="text-[#6B21A8]/60">
                                    (aktualisiert: {format(new Date(post.updatedAt), 'd. MMM yyyy', { locale: de })})
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Content */}
                    <div
                        className="prose max-w-3xl mx-auto mb-12"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="max-w-3xl mx-auto mb-16 pt-8 border-t border-[#7C3AED]/10">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Tag className="w-5 h-5 text-[#7C3AED]" />
                                {post.tags.map((tag) => (
                                    <span key={tag} className="badge badge-primary">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-[#4C1D95] mb-6">
                                Ähnliche Beiträge
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="card p-5 hover:bg-[#FAF5FF] cursor-pointer"
                                    >
                                        <span className="text-xs text-[#7C3AED] font-medium">
                                            {BLOG_CATEGORIES[relatedPost.category]}
                                        </span>
                                        <h3 className="font-poppins font-bold text-[#4C1D95] mt-2 line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </>
    );
}
