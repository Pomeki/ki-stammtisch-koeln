import { NextRequest, NextResponse } from 'next/server';
import {
    getAllPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
} from '@/lib/blog';
import type { BlogCategory } from '@/types';

// GET - Get all posts or single post by slug
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const category = searchParams.get('category') as BlogCategory | null;
        const publishedOnly = searchParams.get('published') === 'true';

        if (slug) {
            const post = getPostBySlug(slug);
            if (!post) {
                return NextResponse.json(
                    { success: false, error: 'Beitrag nicht gefunden.' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, data: post });
        }

        let posts = getAllPosts();

        if (publishedOnly) {
            posts = posts.filter((p) => p.isPublished);
        }

        if (category) {
            posts = posts.filter((p) => p.category === category);
        }

        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        console.error('Get posts error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Laden der Beiträge.' },
            { status: 500 }
        );
    }
}

// POST - Create new post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, excerpt, content, author, category, coverImage, tags, isPublished } = body;

        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: 'Titel und Inhalt sind erforderlich.' },
                { status: 400 }
            );
        }

        const post = createPost({
            title,
            excerpt: excerpt || '',
            content,
            author: author || 'Admin',
            category: category || 'ki-news',
            coverImage,
            publishedAt: new Date(),
            isPublished: isPublished ?? true,
            tags: tags || [],
        });

        return NextResponse.json({
            success: true,
            message: 'Beitrag erfolgreich erstellt.',
            data: post,
        });
    } catch (error) {
        console.error('Create post error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Erstellen des Beitrags.' },
            { status: 500 }
        );
    }
}

// PUT - Update post
export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json(
                { success: false, error: 'Slug ist erforderlich.' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const updatedPost = updatePost(slug, body);

        if (!updatedPost) {
            return NextResponse.json(
                { success: false, error: 'Beitrag nicht gefunden.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Beitrag erfolgreich aktualisiert.',
            data: updatedPost,
        });
    } catch (error) {
        console.error('Update post error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Aktualisieren des Beitrags.' },
            { status: 500 }
        );
    }
}

// DELETE - Delete post
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json(
                { success: false, error: 'Slug ist erforderlich.' },
                { status: 400 }
            );
        }

        const deleted = deletePost(slug);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Beitrag nicht gefunden.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Beitrag erfolgreich gelöscht.',
        });
    } catch (error) {
        console.error('Delete post error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Löschen des Beitrags.' },
            { status: 500 }
        );
    }
}
