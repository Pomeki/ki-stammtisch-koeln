'use client';

import { useActionState } from 'react';
import { User, Building2, Mail, Briefcase, Check, AlertCircle, Loader2 } from 'lucide-react';
import { submitRegistration } from '@/app/actions';

interface FormData {
    name: string;
    email: string;
    company: string;
    industry: string;
    acceptPrivacy: boolean;
}

export function RegistrationForm() {
    const initialState = { status: 'idle', message: '' };
    const [state, formAction, isPending] = useActionState(submitRegistration, initialState);

    const industries = [
        'IT & Software',
        'Marketing & Medien',
        'Finanzen & Versicherungen',
        'Gesundheit & Medizin',
        'Handel & E-Commerce',
        'Beratung & Coaching',
        'Bildung & Forschung',
        'Produktion & Industrie',
        'Recht & Compliance',
        'Sonstiges',
    ];

    return (
        <form action={formAction} className="space-y-5">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-[var(--text-muted)] font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Max Mustermann"
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--input-text)] focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm placeholder:text-[var(--text-faint)]"
                />
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-[var(--text-muted)] font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> E-Mail
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="max.mustermann@firma.de"
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--input-text)] focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm placeholder:text-[var(--text-faint)]"
                />
            </div>

            {/* Company Field */}
            <div>
                <label htmlFor="company" className="block text-[var(--text-muted)] font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Unternehmen
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    placeholder="Musterfirma GmbH"
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--input-text)] focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm placeholder:text-[var(--text-faint)]"
                />
            </div>

            {/* Industry Select */}
            <div>
                <label htmlFor="industry" className="block text-[var(--text-muted)] font-syne text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Branche
                </label>
                <select
                    id="industry"
                    name="industry"
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--input-text)] focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all font-manrope text-sm cursor-pointer"
                >
                    <option value="">Bitte wählen...</option>
                    {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                    ))}
                </select>
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    required
                    className="mt-1 w-4 h-4 rounded border-2 border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--color-red)] focus:ring-[#E11D48] cursor-pointer accent-[#E11D48]"
                />
                <label htmlFor="acceptPrivacy" className="text-xs text-[var(--text-muted)] leading-relaxed cursor-pointer font-manrope">
                    Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" className="text-[var(--color-cyan)] hover:text-[var(--color-red)] transition-colors">Datenschutzerklärung</a> zu.
                </label>
            </div>

            {/* Status Messages */}
            {state.status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[var(--color-cyan)] text-sm font-manrope">
                    <Check className="w-5 h-5" />
                    <span>{state.message}</span>
                </div>
            )}

            {state.status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/20 text-[var(--color-red)] text-sm font-manrope">
                    <AlertCircle className="w-5 h-5" />
                    <span>{state.message}</span>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#E11D48] text-white py-3.5 rounded-xl font-syne font-bold text-sm uppercase tracking-wider hover:bg-[#be123c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Wird gesendet...
                    </>
                ) : (
                    'Jetzt registrieren'
                )}
            </button>
        </form>
    );
}
