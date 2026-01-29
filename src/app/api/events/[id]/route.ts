import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { EventModel } from '@/models';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get single event
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const event = await EventModel.findById(id);

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event nicht gefunden.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: event,
        });
    } catch (error) {
        console.error('Get event error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Laden des Events.' },
            { status: 500 }
        );
    }
}

// PUT - Update event
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const body = await request.json();

        const event = await EventModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event nicht gefunden.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Event erfolgreich aktualisiert.',
            data: event,
        });
    } catch (error) {
        console.error('Update event error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Aktualisieren des Events.' },
            { status: 500 }
        );
    }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const event = await EventModel.findByIdAndDelete(id);

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event nicht gefunden.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Event erfolgreich gelöscht.',
        });
    } catch (error) {
        console.error('Delete event error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Löschen des Events.' },
            { status: 500 }
        );
    }
}
