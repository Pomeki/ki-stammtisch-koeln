import mongoose, { Schema, Document } from 'mongoose';
import type { SiteSettings } from '@/types';

export interface SettingsDocument extends Omit<SiteSettings, '_id'>, Document { }

const SettingsSchema = new Schema<SettingsDocument>(
    {
        showCountdown: {
            type: Boolean,
            default: true,
        },
        showEventArchive: {
            type: Boolean,
            default: true,
        },
        nextEventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
        heroTitle: {
            type: String,
            default: 'KI-Stammtisch Köln',
        },
        heroSubtitle: {
            type: String,
            default: 'Der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI in ihr Geschäft integrieren möchten.',
        },
    },
    {
        timestamps: { createdAt: false, updatedAt: 'updatedAt' },
    }
);

export const SettingsModel = mongoose.models.Settings || mongoose.model<SettingsDocument>('Settings', SettingsSchema);

// Helper to get or create settings
export async function getSettings(): Promise<SettingsDocument> {
    let settings = await SettingsModel.findOne();
    if (!settings) {
        settings = await SettingsModel.create({
            showCountdown: true,
            showEventArchive: true,
            heroTitle: 'KI-Stammtisch Köln',
            heroSubtitle: 'Der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI in ihr Geschäft integrieren möchten.',
        });
    }
    return settings;
}
