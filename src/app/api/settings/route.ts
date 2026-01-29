import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SettingsModel, getSettings } from '@/models';

// GET - Get settings
export async function GET() {
    try {
        await connectToDatabase();
        const settings = await getSettings();

        return NextResponse.json({
            success: true,
            data: settings,
        });
    } catch (error) {
        console.error('Get settings error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Laden der Einstellungen.' },
            { status: 500 }
        );
    }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const { showCountdown, showEventArchive, nextEventId, heroTitle, heroSubtitle } = body;

        let settings = await SettingsModel.findOne();

        if (!settings) {
            settings = await SettingsModel.create({
                showCountdown: showCountdown ?? true,
                showEventArchive: showEventArchive ?? true,
                nextEventId,
                heroTitle: heroTitle || 'KI-Stammtisch Köln',
                heroSubtitle: heroSubtitle || 'Der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI in ihr Geschäft integrieren möchten.',
            });
        } else {
            if (showCountdown !== undefined) settings.showCountdown = showCountdown;
            if (showEventArchive !== undefined) settings.showEventArchive = showEventArchive;
            if (nextEventId !== undefined) settings.nextEventId = nextEventId;
            if (heroTitle !== undefined) settings.heroTitle = heroTitle;
            if (heroSubtitle !== undefined) settings.heroSubtitle = heroSubtitle;
            settings.updatedAt = new Date();
            await settings.save();
        }

        return NextResponse.json({
            success: true,
            message: 'Einstellungen erfolgreich gespeichert.',
            data: settings,
        });
    } catch (error) {
        console.error('Update settings error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Speichern der Einstellungen.' },
            { status: 500 }
        );
    }
}
