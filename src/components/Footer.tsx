import Link from 'next/link';
import { BrainCircuit, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#1A1025] text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4 cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                                <BrainCircuit className="w-7 h-7 text-white" />
                            </div>
                            <span className="font-poppins font-bold text-xl">
                                KI-Stammtisch <span className="text-[#E11D48]">Köln</span>
                            </span>
                        </Link>
                        <p className="text-[#C4B5FD] max-w-md mb-6">
                            Der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI erfolgreich
                            in ihr Geschäft integrieren möchten. Jeden Monat in der Kölner Innenstadt.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors cursor-pointer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors cursor-pointer"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-poppins font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#about" className="text-[#C4B5FD] hover:text-white transition-colors cursor-pointer">
                                    Über uns
                                </Link>
                            </li>
                            <li>
                                <Link href="/#events" className="text-[#C4B5FD] hover:text-white transition-colors cursor-pointer">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-[#C4B5FD] hover:text-white transition-colors cursor-pointer">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/#register" className="text-[#C4B5FD] hover:text-white transition-colors cursor-pointer">
                                    Anmelden
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-poppins font-bold text-lg mb-4">Kontakt</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[#C4B5FD]">
                                <MapPin className="w-5 h-5 text-[#7C3AED]" />
                                <span>Köln, Deutschland</span>
                            </li>
                            <li>
                                <a
                                    href="mailto:service@ki-stammtisch.koeln"
                                    className="flex items-center gap-3 text-[#C4B5FD] hover:text-white transition-colors cursor-pointer"
                                >
                                    <Mail className="w-5 h-5 text-[#7C3AED]" />
                                    <span>service@ki-stammtisch.koeln</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#C4B5FD] text-sm">
                        © {new Date().getFullYear()} KI-Stammtisch Köln. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/impressum" className="text-[#C4B5FD] hover:text-white transition-colors cursor-pointer">
                            Impressum
                        </Link>
                        <Link href="/datenschutz" className="text-[#C4B5FD] hover:text-white transition-colors cursor-pointer">
                            Datenschutz
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
