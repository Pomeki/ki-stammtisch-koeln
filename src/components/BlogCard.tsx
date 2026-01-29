import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types';
import { BLOG_CATEGORIES } from '@/types';

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link href={`/blog/${post.slug}`} className="blog-card block cursor-pointer group h-full">
                {/* Image Area */}
                <div className="blog-card-image relative overflow-hidden h-48">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex items-center justify-center">
                            <svg className="w-16 h-16 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="badge badge-primary bg-white/90 backdrop-blur-sm">
                            {BLOG_CATEGORIES[post.category]}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-[#6B21A8] mb-3">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(post.publishedAt), 'd. MMMM yyyy', { locale: de })}
                        </span>
                        <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-poppins font-bold text-xl text-[#4C1D95] mb-2 group-hover:text-[#7C3AED] transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#6B21A8] mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                            <Tag className="w-4 h-4 text-[#7C3AED]" />
                            {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Read More */}
                    <span className="inline-flex items-center gap-2 text-[#7C3AED] font-semibold group-hover:gap-3 transition-all">
                        Weiterlesen
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-[#6B21A8] text-lg">
                    Noch keine Beiträge vorhanden.
                </p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}
