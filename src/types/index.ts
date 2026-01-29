// Member types
export interface Member {
    _id?: string;
    email: string;
    company: string;
    name: string;
    industry?: string;
    createdAt: Date;
    isVerified: boolean;
    verificationToken?: string;
}

// Event types
export interface Event {
    _id?: string;
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    address: string;
    maxAttendees?: number;
    registeredCount: number;
    isActive: boolean;
    createdAt: Date;
}

// Blog types
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: BlogCategory;
    coverImage?: string;
    publishedAt: Date;
    updatedAt?: Date;
    isPublished: boolean;
    tags: string[];
}

export type BlogCategory =
    | 'ki-news'
    | 'use-cases'
    | 'event-recaps'
    | 'tutorials'
    | 'gastbeitraege';

export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
    'ki-news': 'KI News',
    'use-cases': 'Use Cases',
    'event-recaps': 'Event Recaps',
    'tutorials': 'Tutorials',
    'gastbeitraege': 'Gastbeiträge',
};

// Settings types
export interface SiteSettings {
    _id?: string;
    showCountdown: boolean;
    showEventArchive: boolean;
    nextEventId?: string;
    heroTitle: string;
    heroSubtitle: string;
    updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Form types
export interface RegistrationFormData {
    email: string;
    company: string;
    name: string;
    industry?: string;
    acceptPrivacy: boolean;
}
