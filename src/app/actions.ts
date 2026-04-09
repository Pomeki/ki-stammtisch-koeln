'use server';

import { z } from 'zod';

const registrationSchema = z.object({
    name: z.string().min(2, 'Name ist zu kurz'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    company: z.string().min(2, 'Firmenname ist zu kurz'),
    industry: z.string().optional(),
    acceptPrivacy: z.boolean().or(z.literal('on')).transform(val => val === true || val === 'on'),
});

export async function submitRegistration(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            industry: formData.get('industry'),
            acceptPrivacy: formData.get('acceptPrivacy'),
        };

        const validatedData = registrationSchema.parse(rawData);

        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://deine-n8n-domain.com/webhook/stammtisch';

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...validatedData,
                eventSource: 'KI-Stammtisch Website',
                timestamp: new Date().toISOString()
            }),
        });

        if (response.ok) {
            return {
                status: 'success',
                message: 'Erfolgreich registriert! Mails folgen via n8n.'
            };
        } else {
            return {
                status: 'error',
                message: 'Ein Fehler ist aufgetreten. Bitte später nochmal versuchen.'
            };
        }

    } catch (e: any) {
        if (e.errors) {
            return {
                status: 'error',
                message: e.errors[0].message
            };
        }
        return {
            status: 'error',
            message: 'Verbindungsfehler. Bitte überprüfen Sie Ihre Eingaben.'
        };
    }
}
