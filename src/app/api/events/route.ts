import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { EventModel, getSettings } from '@/models';

// GET - Get all events or next event
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        if (type === 'next') {
            // Get next upcoming event
            const settings = await getSettings();
            let nextEvent = null;

            if (settings.nextEventId) {
                nextEvent = await EventModel.findById(settings.nextEventId);
            }

            if (!nextEvent) {
                // Find the next upcoming active event
                nextEvent = await EventModel.findOne({
                    isActive: true,
                    date: { $gte: new Date() },
                }).sort({ date: 1 });
            }

            return NextResponse.json({
                success: true,
                data: nextEvent,
                settings: {
                    showCountdown: settings.showCountdown,
                    showEventArchive: settings.showEventArchive,
                },
            });
        }

        if (type === 'archive') {
            // Get past events
            const settings = await getSettings();

            if (!settings.showEventArchive) {
                return NextResponse.json({
                    success: true,
                    data: [],
                    message: 'Event-Archiv ist deaktiviert.',
                });
            }

            const pastEvents = await EventModel.find({
                date: { $lt: new Date() },
            }).sort({ date: -1 });

            return NextResponse.json({
                success: true,
                data: pastEvents,
            });
        }

        // Get all events
        const events = await EventModel.find().sort({ date: -1 });

        return NextResponse.json({
            success: true,
            data: events,
        });
    } catch (error) {
        console.error('Get events error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Laden der Events.' },
            { status: 500 }
        );
    }
}

// POST - Create new event
export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const { title, description, date, time, location, address, maxAttendees } = body;

        if (!title || !description || !date || !time || !location || !address) {
            return NextResponse.json(
                { success: false, error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
                { status: 400 }
            );
        }

        const event = await EventModel.create({
            title,
            description,
            date: new Date(date),
            time,
            location,
            address,
            maxAttendees: maxAttendees || undefined,
            registeredCount: 0,
            isActive: true,
        });

        return NextResponse.json({
            success: true,
            message: 'Event erfolgreich erstellt.',
            data: event,
        });
    } catch (error) {
        console.error('Create event error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Erstellen des Events.' },
            { status: 500 }
        );
    }
}
