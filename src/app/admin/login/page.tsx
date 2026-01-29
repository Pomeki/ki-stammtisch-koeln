'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Ungültige Anmeldedaten');
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch {
            setError('Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0A1A] to-[#1A1025] flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center mx-auto mb-4">
                        <BrainCircuit className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Admin Login
                    </h1>
                    <p className="text-[#C4B5FD]">
                        KI-Stammtisch Köln Backend
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="card bg-[#1A1025] border border-[#7C3AED]/20">
                    {error && (
                        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                            E-Mail
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C3AED]" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white placeholder-[#6B21A8] focus:outline-none focus:border-[#7C3AED]"
                                placeholder="admin@ki-stammtisch.koeln"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                            Passwort
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C3AED]" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3 bg-[#0F0A1A] border border-[#7C3AED]/30 rounded-xl text-white placeholder-[#6B21A8] focus:outline-none focus:border-[#7C3AED]"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Anmelden...
                            </>
                        ) : (
                            'Anmelden'
                        )}
                    </button>
                </form>

                <p className="text-center text-[#6B21A8] text-sm mt-6">
                    Nur für autorisierte Administratoren
                </p>
            </div>
        </div>
    );
}
