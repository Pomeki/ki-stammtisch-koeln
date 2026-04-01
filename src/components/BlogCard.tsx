'use client';

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
    isHorizontal?: boolean;
}

export function BlogCard({ post, isHorizontal = false }: BlogCardProps) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={isHorizontal ? "" : "h-full"}
        >
            <Link href={`/blog/${post.slug}`} className={`block cursor-pointer group h-full bg-[#18181b]/40 backdrop-blur-xl border border-white/[0.03] rounded-2xl overflow-hidden hover:border-[#E11D48]/20 transition-all duration-500 ${isHorizontal ? 'flex flex-col md:flex-row' : ''}`}>
                {/* Image Area */}
                <div className={`relative overflow-hidden bg-zinc-900 border-white/5 ${isHorizontal ? 'md:w-2/5 h-64 md:h-auto border-b md:border-b-0 md:border-r' : 'h-48 border-b'}`}>
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <svg className="w-14 h-14 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-syne uppercase tracking-wider border border-[#E11D48]/30 bg-black/60 backdrop-blur-md text-[#E11D48]">
                            {BLOG_CATEGORIES[post.category]}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${isHorizontal ? 'md:w-3/5 md:p-8 flex flex-col justify-center' : ''}`}>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-zinc-600 mb-3 font-manrope">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(post.publishedAt), 'd. MMMM yyyy', { locale: de })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {post.author}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-syne font-bold text-lg text-white mb-2 group-hover:text-[#E11D48] transition-colors duration-300">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2 font-manrope leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                            <Tag className="w-3.5 h-3.5 text-[#06b6d4]" />
                            {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-0.5 rounded-full font-syne uppercase tracking-wider">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Read More */}
                    <span className="inline-flex items-center gap-2 text-[#E11D48] font-syne font-bold text-sm group-hover:gap-3 transition-all duration-300">
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
                <p className="text-zinc-500 text-lg font-manrope">
                    Noch keine Beiträge vorhanden.
                </p>
            </div>
        );
    }

    return (
        <div className={`grid gap-6 ${posts.length === 1 ? 'max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} isHorizontal={posts.length === 1} />
            ))}
        </div>
    );
}
