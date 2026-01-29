import mongoose, { Schema, Document } from 'mongoose';
import type { Member } from '@/types';

export interface MemberDocument extends Omit<Member, '_id'>, Document { }

const MemberSchema = new Schema<MemberDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        industry: {
            type: String,
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: false },
    }
);

// Validate that email is not a freemail domain
MemberSchema.path('email').validate(function (email: string) {
    const freemailDomains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'aol.com',
        'web.de',
        'gmx.de',
        'gmx.net',
        't-online.de',
        'freenet.de',
        'mail.de',
        'posteo.de',
        'protonmail.com',
        'proton.me',
        'icloud.com',
        'me.com',
        'live.com',
        'live.de',
        'msn.com',
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    return !freemailDomains.includes(domain);
}, 'Bitte verwenden Sie Ihre Firmen-E-Mail-Adresse');

export const MemberModel = mongoose.models.Member || mongoose.model<MemberDocument>('Member', MemberSchema);
