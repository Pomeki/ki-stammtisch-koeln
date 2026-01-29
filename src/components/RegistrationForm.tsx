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
            const response = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message || 'Erfolgreich registriert!');
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    industry: '',
                    acceptPrivacy: false,
                });
            } else {
                setStatus('error');
                setMessage(data.error || 'Ein Fehler ist aufgetreten.');
            }
        } catch {
            setStatus('error');
            setMessage('Verbindungsfehler. Bitte versuchen Sie es später erneut.');
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
                <label htmlFor="name" className="form-label flex items-center gap-2">
                    <User className="w-4 h-4 text-[#7C3AED]" />
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
                    className="form-input"
                />
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="form-label flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#7C3AED]" />
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
                    className="form-input"
                />
                <p className="text-sm text-[#6B21A8] mt-1">
                    Bitte verwenden Sie Ihre geschäftliche E-Mail-Adresse
                </p>
            </div>

            {/* Company Field */}
            <div>
                <label htmlFor="company" className="form-label flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#7C3AED]" />
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
                    className="form-input"
                />
            </div>

            {/* Industry Field */}
            <div>
                <label htmlFor="industry" className="form-label flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#7C3AED]" />
                    Branche
                </label>
                <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="form-input cursor-pointer"
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
                    className="mt-1 w-5 h-5 rounded border-2 border-[#7C3AED]/30 text-[#7C3AED] focus:ring-[#7C3AED] cursor-pointer"
                />
                <label htmlFor="acceptPrivacy" className="text-sm text-[#6B21A8] cursor-pointer">
                    Ich habe die{' '}
                    <a href="/datenschutz" className="text-[#7C3AED] underline hover:no-underline">
                        Datenschutzerklärung
                    </a>{' '}
                    gelesen und akzeptiere diese. *
                </label>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
                    <Check className="w-5 h-5" />
                    <span>{message}</span>
                </div>
            )}

            {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span>{message}</span>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-cta w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Wird gesendet...
                    </>
                ) : (
                    <>
                        <Check className="w-5 h-5" />
                        Kostenlos anmelden
                    </>
                )}
            </button>

            <p className="text-center text-sm text-[#6B21A8]">
                * Pflichtfelder
            </p>
        </form>
    );
}
