'use client';

import { useState } from 'react';
import { User, Building2, Mail, Briefcase, Check, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    company: string;
    industry: string;
    acceptPrivacy: boolean;
}

export function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        industry: '',
        acceptPrivacy: false,
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            // 👇 HIER DEINE n8n WEBHOOK URL EINTRAGEN
            // (Am besten legst du in n8n einen neuen Webhook-Node an)
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://deine-n8n-domain.com/webhook/stammtisch';

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    eventSource: 'KI-Stammtisch Website',
                    timestamp: new Date().toISOString()
                }),
            });

            // n8n Webhooks geben bei Erfolg standardmäßig Status 200 zurück
            if (response.ok) {
                setStatus('success');
                setMessage('Erfolgreich registriert! Mails folgen via n8n.');
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    industry: '',
                    acceptPrivacy: false,
                });
            } else {
                setStatus('error');
                setMessage('Ein Fehler ist aufgetreten. Bitte später nochmal versuchen.');
            }
        } catch {
            setStatus('error');
            setMessage('Verbindungsfehler zu n8n. Bitte überprüfen Sie die Webhook-URL.');
        }
    };

    const industries = [
        'IT & Software',
        'Beratung',
        'Marketing & Medien',
        'Finanzwesen',
        'Gesundheitswesen',
        'Produktion',
        'Handel & E-Commerce',
        'Bildung',
        'Immobilien',
        'Sonstiges',
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-zinc-400 font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#E11D48]" />
                    Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Max Mustermann"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm placeholder:text-zinc-700"
                />
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-zinc-400 font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
                    Firmen-E-Mail *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="max.mustermann@firma.de"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm placeholder:text-zinc-700"
                />
                <p className="text-[10px] text-zinc-600 mt-1.5 font-manrope">
                    Bitte verwenden Sie Ihre geschäftliche E-Mail-Adresse
                </p>
            </div>

            {/* Company Field */}
            <div>
                <label htmlFor="company" className="block text-zinc-400 font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#E11D48]" />
                    Firma *
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Musterfirma GmbH"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm placeholder:text-zinc-700"
                />
            </div>

            {/* Industry Field */}
            <div>
                <label htmlFor="industry" className="block text-zinc-400 font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#E11D48]" />
                    Branche
                </label>
                <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm cursor-pointer"
                >
                    <option value="">Bitte wählen...</option>
                    {industries.map((industry) => (
                        <option key={industry} value={industry}>
                            {industry}
                        </option>
                    ))}
                </select>
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 rounded border-2 border-white/20 bg-black/40 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer accent-[#E11D48]"
                />
                <label htmlFor="acceptPrivacy" className="text-xs text-zinc-500 cursor-pointer font-manrope leading-relaxed">
                    Ich habe die{' '}
                    <a href="/datenschutz" className="text-[#06b6d4] underline hover:no-underline">
                        Datenschutzerklärung
                    </a>{' '}
                    gelesen und akzeptiere diese. *
                </label>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] text-sm font-manrope">
                    <Check className="w-5 h-5" />
                    <span>{message}</span>
                </div>
            )}

            {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/20 text-[#E11D48] text-sm font-manrope">
                    <AlertCircle className="w-5 h-5" />
                    <span>{message}</span>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#E11D48] text-white py-3.5 rounded-xl font-syne font-bold text-sm uppercase tracking-wider hover:bg-[#be123c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Wird gesendet...
                    </>
                ) : (
                    <>
                        <Check className="w-4 h-4" />
                        Kostenlos anmelden
                    </>
                )}
            </button>

            <p className="text-center text-[10px] text-zinc-600 font-manrope">
                * Pflichtfelder
            </p>
        </form>
    );
}
