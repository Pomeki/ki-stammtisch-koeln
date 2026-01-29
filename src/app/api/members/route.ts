import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { MemberModel } from '@/models';
import crypto from 'crypto';

// POST - Register new member
export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const { email, company, name, industry, acceptPrivacy } = body;

        // Validation
        if (!email || !company || !name) {
            return NextResponse.json(
                { success: false, error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
                { status: 400 }
            );
        }

        if (!acceptPrivacy) {
            return NextResponse.json(
                { success: false, error: 'Bitte akzeptieren Sie die Datenschutzerklärung.' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingMember = await MemberModel.findOne({ email: email.toLowerCase() });
        if (existingMember) {
            return NextResponse.json(
                { success: false, error: 'Diese E-Mail-Adresse ist bereits registriert.' },
                { status: 400 }
            );
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create member
        const member = await MemberModel.create({
            email: email.toLowerCase(),
            company,
            name,
            industry,
            isVerified: false, // In production, send verification email
            verificationToken,
        });

        // TODO: Send verification email in production

        return NextResponse.json({
            success: true,
            message: 'Erfolgreich registriert! Sie werden über das nächste Treffen informiert.',
            data: {
                id: member._id,
                email: member.email,
                name: member.name,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);

        // Handle mongoose validation errors
        if (error instanceof Error && error.message.includes('Firmen-E-Mail')) {
            return NextResponse.json(
                { success: false, error: 'Bitte verwenden Sie Ihre Firmen-E-Mail-Adresse (keine Freemail-Adressen wie Gmail, GMX, etc.).' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
            { status: 500 }
        );
    }
}

// GET - Get all members (admin only)
export async function GET() {
    try {
        await connectToDatabase();

        const members = await MemberModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: members,
        });
    } catch (error) {
        console.error('Get members error:', error);
        return NextResponse.json(
            { success: false, error: 'Fehler beim Laden der Mitglieder.' },
            { status: 500 }
        );
    }
}
