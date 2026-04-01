import Link from 'next/link';
import { BrainCircuit, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#09090b] border-t border-white/5 text-white py-16">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4 cursor-pointer group">
                            <div className="w-11 h-11 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-center group-hover:border-[#E11D48]/50 transition-colors">
                                <BrainCircuit className="w-6 h-6 text-[#E11D48]" />
                            </div>
                            <span className="font-syne font-bold text-xl tracking-wide">
                                KI-Stammtisch <span className="text-[#E11D48]">Köln</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 max-w-md mb-6 font-manrope text-sm leading-relaxed">
                            Der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI erfolgreich
                            in ihr Geschäft integrieren möchten. Jeden Monat in der Kölner Innenstadt.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#06b6d4]/50 hover:text-[#06b6d4] transition-all cursor-pointer text-zinc-400"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#06b6d4]/50 hover:text-[#06b6d4] transition-all cursor-pointer text-zinc-400"
                                aria-label="Twitter / X"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-syne font-bold text-sm uppercase tracking-wider text-white mb-5">Navigation</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#about" className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-sm font-manrope">
                                    Über uns
                                </Link>
                            </li>
                            <li>
                                <Link href="/#events" className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-sm font-manrope">
                                    Veranstaltungen
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-sm font-manrope">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/#register" className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-sm font-manrope">
                                    Anmelden
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-syne font-bold text-sm uppercase tracking-wider text-white mb-5">Kontakt</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-zinc-500 text-sm font-manrope">
                                <MapPin className="w-4 h-4 text-[#E11D48]" />
                                <span>Köln, Deutschland</span>
                            </li>
                            <li>
                                <a
                                    href="mailto:service@ki-stammtisch.koeln"
                                    className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors cursor-pointer text-sm font-manrope"
                                >
                                    <Mail className="w-4 h-4 text-[#E11D48]" />
                                    <span>service@ki-stammtisch.koeln</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-600 text-xs font-manrope">
                        © {new Date().getFullYear()} KI-Stammtisch Köln. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/5 text-[10px] font-syne uppercase tracking-wider text-[#06b6d4]">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#06b6d4]"></span>
                        </span>
                        System Online · Köln
                    </div>
                    <div className="flex gap-6 text-xs font-manrope">
                        <Link href="/impressum" className="text-zinc-600 hover:text-white transition-colors cursor-pointer">
                            Impressum
                        </Link>
                        <Link href="/datenschutz" className="text-zinc-600 hover:text-white transition-colors cursor-pointer">
                            Datenschutz
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
