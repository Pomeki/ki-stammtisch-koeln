import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost, BlogCategory } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Ensure directory exists
function ensureDirectory() {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
    }
}

export function getAllPosts(): BlogPost[] {
    ensureDirectory();

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt || '',
                content,
                author: data.author || 'Admin',
                category: (data.category || 'ki-news') as BlogCategory,
                coverImage: data.coverImage,
                publishedAt: new Date(data.publishedAt || Date.now()),
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
                isPublished: data.isPublished !== false,
                tags: data.tags || [],
            } as BlogPost;
        });

    return allPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getPublishedPosts(): BlogPost[] {
    return getAllPosts().filter((post) => post.isPublished);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
    return getPublishedPosts().filter((post) => post.category === category);
}

export function getPostBySlug(slug: string): BlogPost | null {
    ensureDirectory();

    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        content,
        author: data.author || 'Admin',
        category: (data.category || 'ki-news') as BlogCategory,
        coverImage: data.coverImage,
        publishedAt: new Date(data.publishedAt || Date.now()),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
        isPublished: data.isPublished !== false,
        tags: data.tags || [],
    };
}

export async function getPostContent(slug: string): Promise<string> {
    const post = getPostBySlug(slug);
    if (!post) return '';

    const processedContent = await remark().use(html).process(post.content);
    return processedContent.toString();
}

export function createPost(post: Omit<BlogPost, 'slug'> & { slug?: string }): BlogPost {
    ensureDirectory();

    const slug = post.slug || generateSlug(post.title);
    const frontmatter = {
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        coverImage: post.coverImage,
        publishedAt: post.publishedAt.toISOString(),
        updatedAt: post.updatedAt?.toISOString(),
        isPublished: post.isPublished,
        tags: post.tags,
    };

    const fileContent = matter.stringify(post.content, frontmatter);
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    fs.writeFileSync(fullPath, fileContent, 'utf8');

    return { ...post, slug };
}

export function updatePost(slug: string, updates: Partial<BlogPost>): BlogPost | null {
    const existingPost = getPostBySlug(slug);
    if (!existingPost) return null;

    const updatedPost: BlogPost = {
        ...existingPost,
        ...updates,
        slug,
        updatedAt: new Date(),
    };

    const frontmatter = {
        title: updatedPost.title,
        excerpt: updatedPost.excerpt,
        author: updatedPost.author,
        category: updatedPost.category,
        coverImage: updatedPost.coverImage,
        publishedAt: updatedPost.publishedAt.toISOString(),
        updatedAt: updatedPost.updatedAt?.toISOString(),
        isPublished: updatedPost.isPublished,
        tags: updatedPost.tags,
    };

    const fileContent = matter.stringify(updatedPost.content, frontmatter);
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    fs.writeFileSync(fullPath, fileContent, 'utf8');

    return updatedPost;
}

export function deletePost(slug: string): boolean {
    ensureDirectory();

    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return false;
    }

    fs.unlinkSync(fullPath);
    return true;
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
