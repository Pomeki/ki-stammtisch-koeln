import mongoose, { Schema, Document } from 'mongoose';
import type { Event } from '@/types';

export interface EventDocument extends Omit<Event, '_id'>, Document { }

const EventSchema = new Schema<EventDocument>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        maxAttendees: {
            type: Number,
        },
        registeredCount: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: false },
    }
);

export const EventModel = mongoose.models.Event || mongoose.model<EventDocument>('Event', EventSchema);
