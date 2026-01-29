'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Navbar,
    Footer,
    Countdown,
    RegistrationForm,
    BlogList,
    NextEventDisplay,
    EventCard,
    HeroVisual
} from '@/components';
import {
    Users,
    Lightbulb,
    Target,
    Rocket,
    ArrowRight,
    BrainCircuit,
    Building2,
    Sparkles,
    TrendingUp
} from 'lucide-react';

interface LandingPageProps {
    settings: any;
    nextEvent: any;
    pastEvents: any[];
    blogPosts: any[];
}

export function LandingPage({ settings, nextEvent, pastEvents, blogPosts }: LandingPageProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const features = [
        {
            icon: Users,
            title: 'Networking',
            description: 'Vernetzen Sie sich mit Gleichgesinnten aus verschiedenen Branchen und tauschen Sie Erfahrungen aus.',
        },
        {
            icon: Lightbulb,
            title: 'Wissensaustausch',
            description: 'Lernen Sie von Praxisberichten und erfahren Sie, wie andere Unternehmen KI erfolgreich einsetzen.',
        },
        {
            icon: Target,
            title: 'Praxisnah',
            description: 'Keine theoretischen Vorträge – bei uns geht es um echte Anwendungsfälle und praktische Tipps.',
        },
        {
            icon: Rocket,
            title: 'Impulse',
            description: 'Holen Sie sich Inspiration und neue Ideen für die KI-Integration in Ihrem Unternehmen.',
        },
    ];

    const targetGroups = [
        {
            icon: BrainCircuit,
            title: 'Selbstständige',
            description: 'Die ihre Arbeitsprozesse mit KI optimieren möchten',
        },
        {
            icon: Building2,
            title: 'Unternehmer',
            description: 'Die nach Wettbewerbsvorteilen durch KI suchen',
        },
        {
            icon: TrendingUp,
            title: 'Firmenvertreter',
            description: 'Die KI-Strategien entwickeln und umsetzen wollen',
        },
        {
            icon: Sparkles,
            title: 'KI-Interessierte',
            description: 'Die praktische Anwendungen kennenlernen möchten',
        },
    ];

    return (
        <>
            <Navbar />

            {/* Offline Alert */}
            {/* @ts-ignore */}
            {settings.isOffline && (
                <div className="bg-amber-100 border-b border-amber-200 text-amber-800 px-4 py-2 text-center text-sm relative z-50 pt-[100px] -mb-[100px]">
                    <span className="font-semibold">Hinweis:</span> Datenbank ist nicht erreichbar. Die Seite läuft im Demo-Modus.
                </div>
            )}

            {/* Hero Section */}
            <section className="min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden relative">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7C3AED]/5 blur-[120px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#E11D48]/5 blur-[120px]"
                    />
                    <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#22C55E]/5 blur-[100px]" />
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Content */}
                        <motion.div
                            className="text-center lg:text-left"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge */}
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 badge badge-koeln mb-6">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E11D48]"></span>
                                </span>
                                <span>Köln • Monatlich Live</span>
                            </motion.div>

                            {/* Title with Staggered Character Reveal */}
                            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                <span className="gradient-text">{settings.heroTitle}</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p variants={itemVariants} className="text-xl text-[#6B21A8] mb-8 max-w-2xl mx-auto lg:mx-0">
                                {settings.heroSubtitle}
                            </motion.p>

                            {/* Countdown */}
                            {settings.showCountdown && nextEvent && (
                                <motion.div variants={itemVariants} className="hidden lg:block mb-10">
                                    <p className="text-[#6B21A8] mb-2 font-medium text-sm uppercase tracking-wide">Nächstes Treffen in:</p>
                                    <div className="flex justify-center lg:justify-start">
                                        <Countdown targetDate={new Date(nextEvent.date)} />
                                    </div>
                                </motion.div>
                            )}

                            {/* CTA Buttons */}
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a href="#register" className="btn-cta group relative overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Jetzt anmelden
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </a>
                                <a href="#about" className="btn-secondary group">
                                    Mehr erfahren
                                </a>
                            </motion.div>

                            {/* Social Proof */}
                            <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden relative">
                                            <Image
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                                                alt="avatar"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F3E8FF] flex items-center justify-center text-xs font-bold text-[#7C3AED]">
                                        +120
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <svg key={i} className="w-4 h-4 text-[#F59E0B] fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-xs text-[#6B21A8] font-medium">Begeisterte Community</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Visuals */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative"
                        >
                            <HeroVisual nextEvent={nextEvent} />

                            {/* Mobile Only: Countdown */}
                            {settings.showCountdown && nextEvent && (
                                <div className="lg:hidden mt-8 text-center">
                                    <p className="text-[#6B21A8] mb-4 font-medium">Nächstes Treffen in:</p>
                                    <Countdown targetDate={new Date(nextEvent.date)} />
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="badge badge-primary mb-4">Über uns</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#4C1D95] mb-4">
                            Was ist der KI-Stammtisch?
                        </h2>
                        <p className="text-xl text-[#6B21A8] max-w-2xl mx-auto">
                            Ein ungezwungener Treffpunkt zum Austausch über Künstliche Intelligenz
                            und ihre praktischen Anwendungen im Business.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="card text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center mx-auto mb-5">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-poppins font-bold text-xl text-[#4C1D95] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-[#6B21A8]">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Target Groups */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#FAF5FF] to-white rounded-3xl p-8 md:p-12"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-[#4C1D95] mb-8 text-center">
                            Für wen ist der Stammtisch?
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {targetGroups.map((group, index) => (
                                <motion.div
                                    key={group.title}
                                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                                        <group.icon className="w-6 h-6 text-[#7C3AED]" />
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-[#4C1D95] mb-1">
                                            {group.title}
                                        </h4>
                                        <p className="text-sm text-[#6B21A8]">
                                            {group.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Next Event Section */}
            <section id="events" className="section">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="badge badge-success mb-4">Events</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#4C1D95] mb-4">
                            Nächstes Treffen
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <NextEventDisplay event={nextEvent} showCountdown={settings.showCountdown} />
                    </div>

                    {/* Past Events */}
                    {settings.showEventArchive && pastEvents.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-[#4C1D95] mb-8 text-center">
                                Vergangene Treffen
                            </h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {pastEvents.map((event: typeof nextEvent) => (
                                    <EventCard key={event._id} event={event} isPast />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Blog Preview Section */}
            {blogPosts.length > 0 && (
                <section className="section bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                            <div>
                                <span className="badge badge-primary mb-4">Blog</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#4C1D95]">
                                    Aktuelle Beiträge
                                </h2>
                            </div>
                            <Link href="/blog" className="btn-secondary mt-4 md:mt-0">
                                Alle Beiträge
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        <BlogList posts={blogPosts} />
                    </div>
                </section>
            )}

            {/* Registration Section */}
            <section id="register" className="section bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-white"
                            >
                                <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
                                    Kostenlos & Unverbindlich
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Jetzt anmelden und dabei sein!
                                </h2>
                                <p className="text-xl text-white/90 mb-8">
                                    Registrieren Sie sich mit Ihrer Firmen-E-Mail-Adresse und erhalten Sie
                                    rechtzeitig alle Informationen zum nächsten KI-Stammtisch.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        'Einladung zum nächsten Stammtisch',
                                        'Informationen zu Ort und Datum',
                                        'Optionaler Newsletter mit KI-News',
                                    ].map((item, i) => (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="flex items-center gap-3 text-white/90"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Registration Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="card bg-white shadow-2xl"
                            >
                                <h3 className="font-poppins font-bold text-2xl text-[#4C1D95] mb-6 text-center">
                                    Anmeldung
                                </h3>
                                <RegistrationForm />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
