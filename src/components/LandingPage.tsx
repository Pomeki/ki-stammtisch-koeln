'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
    Navbar,
    Footer,
    Countdown,
    RegistrationForm,
    BlogList,
    NextEventDisplay,
    EventCard,
    HeroVisual,
    SocialProof,
    StickyCTA
} from '@/components';
import {
    Users,
    Lightbulb,
    Target,
    Rocket,
    BrainCircuit,
    Building2,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import { useRef } from 'react';

interface LandingPageProps {
    settings: any;
    nextEvent: any;
    pastEvents: any[];
    blogPosts: any[];
}

export function LandingPage({ settings, nextEvent, pastEvents, blogPosts }: LandingPageProps) {
    const heroRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const glowX = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.25, 0.1, 0.05]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    };

    const features = [
        { icon: Users, title: 'Networking', description: 'Vernetzen Sie sich mit Gleichgesinnten aus verschiedenen Branchen und tauschen Sie Erfahrungen aus.' },
        { icon: Lightbulb, title: 'Wissen', description: 'Lernen Sie von Praxisberichten und erfolgreichen KI-Anwendungsfällen anderer Unternehmen.' },
        { icon: Target, title: 'Praxisnah', description: 'Keine trockenen Vorträge – echte Anwendungsfälle und sofort umsetzbare Tipps.' },
        { icon: Rocket, title: 'Impulse', description: 'Inspiration und neue Ideen für die KI-Integration in Ihrem Unternehmen.' },
    ];

    const targetGroups = [
        { icon: BrainCircuit, title: 'Selbstständige', description: 'Arbeitsprozesse mit KI optimieren.' },
        { icon: Building2, title: 'Unternehmer', description: 'Wettbewerbsvorteile durch KI finden.' },
        { icon: TrendingUp, title: 'Firmenvertreter', description: 'KI-Strategien mutig umsetzen.' },
        { icon: Sparkles, title: 'Interessierte', description: 'KI im Arbeitsalltag kennenlernen.' },
    ];

    return (
        <div className="relative">
            <Navbar />

            {/* Scroll-reactive Ambient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, var(--dot-color) 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
            {!shouldReduceMotion && (
                <>
                    <motion.div
                        className="fixed top-0 left-0 w-[600px] h-[600px] bg-[#E11D48] rounded-full blur-[200px] pointer-events-none z-0 mix-blend-screen"
                        style={{ left: glowX, opacity: glowOpacity }}
                    />
                    <motion.div
                        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#06b6d4] rounded-full blur-[180px] pointer-events-none z-0 mix-blend-screen opacity-[0.08]"
                    />
                </>
            )}

            {/* Offline Alert */}
            {settings.isOffline && (
                <div className="bg-[#E11D48]/10 border-b border-[#E11D48]/30 text-[var(--color-red)] px-4 py-2 text-center text-sm relative z-50 pt-[100px] -mb-[100px] backdrop-blur-md font-syne">
                    <span className="font-bold">Hinweis:</span> Datenbank nicht erreichbar – Demo-Modus aktiv.
                </div>
            )}

            {/* ═══════════════════════════════════════════ */}
            {/* HERO SECTION                               */}
            {/* ═══════════════════════════════════════════ */}
            <section ref={heroRef} className="min-h-[85vh] flex items-center pt-24 pb-12 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <motion.div
                            className="text-center lg:text-left"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Live Badge */}
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 bg-[var(--bg-pill)] backdrop-blur-md border border-[#E11D48]/30 rounded-full px-5 py-2 mb-6 text-[var(--color-red)] text-xs uppercase font-syne tracking-[0.2em] shadow-[0_0_20px_rgba(225,29,72,0.15)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48]"></span>
                                </span>
                                Köln · LIVE VOR ORT
                            </motion.div>

                            {/* Title */}
                            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-5 leading-[1.05] font-syne">
                                {(settings.heroTitle || 'KI-Stammtisch Köln').split(' ').map((word: string, i: number) => (
                                    <span key={i} className={word === 'Köln' ? 'text-[var(--color-red)] text-glow' : 'text-[var(--text-heading)]'}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p variants={itemVariants} className="text-lg text-[var(--text-muted)] mb-8 max-w-xl mx-auto lg:mx-0 font-light tracking-wide font-manrope leading-relaxed">
                                {settings.heroSubtitle}
                            </motion.p>

                            {/* Countdown */}
                            {settings.showCountdown && nextEvent && (
                                <motion.div variants={itemVariants} className="mb-8">
                                    <p className="text-[var(--text-muted)] mb-3 font-syne text-xs uppercase tracking-[0.15em]">Nächstes Treffen in:</p>
                                    <div className="flex justify-center lg:justify-start">
                                        <Countdown targetDate={new Date(nextEvent.date)} />
                                    </div>
                                </motion.div>
                            )}

                            {/* CTA Buttons */}
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                <a href="#register" className="primary-button text-center group cursor-pointer block font-syne text-sm uppercase tracking-wider">
                                    <span className="relative z-10">Jetzt anmelden</span>
                                </a>
                                <a href="#about" className="bg-[var(--bg-pill)] backdrop-blur-md border border-[var(--border-subtle)] rounded-full px-8 py-3 font-syne text-sm uppercase tracking-wider hover:border-[var(--border-hover)] transition-all cursor-pointer text-center text-[var(--text-body)]">
                                    Mehr erfahren
                                </a>
                            </motion.div>

                            {/* Social Proof Stats */}
                            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[var(--text-muted)] font-syne text-xs uppercase tracking-wider">
                                <span className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]" />
                                    Kostenlose Teilnahme
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]" />
                                    Kölner Innenstadt
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]" />
                                    Infos bei jedem Treffen per E-Mail
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Right: Visual */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <HeroVisual />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* ABOUT SECTION                              */}
            {/* ═══════════════════════════════════════════ */}
            <section id="about" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        className="mb-16 max-w-3xl"
                    >
                        <h2 className="text-xs font-syne text-[var(--color-cyan)] uppercase tracking-[0.2em] mb-3">Über uns</h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-5 font-syne">Was ist der KI-Stammtisch?</h3>
                        <p className="text-lg text-[var(--text-body)] leading-relaxed font-manrope">
                            Ein ungezwungener Treffpunkt zum Austausch über Künstliche Intelligenz
                            und ihre praktischen Anwendungen im Business. Echte Praxisberichte statt
                            theoretischer Vorträge.
                        </p>
                    </motion.div>

                    {/* Feature Cards (Asymmetrical Bento Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-20 relative z-10">
                        {features.map((feature, index) => {
                            let spanClass = "";
                            if (index === 0) spanClass = "md:col-span-2 md:row-span-2 min-h-[320px] flex flex-col justify-end";
                            else if (index === 1) spanClass = "md:col-span-2 min-h-[150px]";
                            else if (index === 2) spanClass = "md:col-span-1 min-h-[150px]";
                            else if (index === 3) spanClass = "md:col-span-1 min-h-[150px]";

                            return (
                                <motion.div
                                    key={feature.title}
                                    className={`glass-card p-7 relative overflow-hidden group hover:shadow-[inset_0_0_20px_rgba(225,29,72,0.05),_0_0_20px_rgba(6,182,212,0.1)] transition-shadow duration-500 ${spanClass}`}
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: shouldReduceMotion ? 0 : index * 0.08 }}
                                >
                                    {/* Ghost icon background */}
                                    <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                                        <feature.icon className="w-28 h-28 text-[var(--text-heading)]" />
                                    </div>
                                    <div className="w-11 h-11 rounded-full border border-[var(--border-subtle)] bg-[var(--icon-bg)] flex items-center justify-center mb-5 group-hover:border-[#E11D48]/50 transition-colors relative z-10">
                                        <feature.icon className="w-5 h-5 text-[var(--color-red)]" />
                                    </div>
                                    <h4 className="font-syne font-bold text-lg mb-2 relative z-10">{feature.title}</h4>
                                    <p className="text-[var(--text-muted)] text-sm font-manrope relative z-10 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Statement Quote */}
                    <motion.div
                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="my-32 text-center max-w-4xl mx-auto px-6 relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none opacity-5">
                            <span className="text-[200px] md:text-[300px] leading-none font-syne font-bold text-[var(--color-red)] select-none">&quot;</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-syne font-bold leading-tight mb-6">
                            Die Zukunft gehört denen, die <span className="text-[var(--color-red)]">KI</span> nicht als Gefahr, sondern als <span className="text-[var(--color-cyan)]">Werkzeug</span> verstehen.
                        </h3>
                    </motion.div>

                    {/* Target Groups */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-2xl p-8 md:p-10"
                    >
                        <h3 className="text-2xl font-syne font-bold mb-8 text-center">
                            Für wen ist der Stammtisch?
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {targetGroups.map((group, index) => (
                                <motion.div
                                    key={group.title}
                                    className="flex items-start gap-4 p-4 bg-[var(--icon-bg)] rounded-xl border border-[var(--border-subtle)] hover:border-[#06b6d4]/30 transition-colors"
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center flex-shrink-0">
                                        <group.icon className="w-5 h-5 text-[var(--color-cyan)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-syne font-bold mb-1">{group.title}</h4>
                                        <p className="text-sm text-[var(--text-muted)] font-manrope">{group.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* SOCIAL PROOF SECTION                       */}
            {/* ═══════════════════════════════════════════ */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#06b6d4]/20 to-transparent" />
            <SocialProof />

            {/* ═══════════════════════════════════════════ */}
            {/* REGISTRATION SECTION                       */}
            {/* ═══════════════════════════════════════════ */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E11D48]/20 to-transparent" />
            <section id="register" className="py-24 relative overflow-hidden bg-[#E11D48]/[0.02]">
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-5 text-glow">
                                Dabei sein!
                            </h2>
                            <p className="text-[var(--text-body)] mb-8 font-manrope text-lg leading-relaxed">
                                Registrieren Sie sich kostenlos und erhalten Sie Einladungen zu unseren monatlichen Treffen, exklusive Insider-Tipps und ungefilterte KI-News.
                            </p>
                            <div className="space-y-4 font-syne text-sm">
                                {['Einladungen zu jedem Stammtisch', 'Lokales Networking mit KI-Profis', 'Kein Spam – nur relevante Updates'].map((item) => (
                                    <div key={item} className="flex items-center gap-4 text-[var(--text-body)]">
                                        <div className="w-1.5 h-1.5 bg-[#E11D48] rounded-full shadow-[0_0_8px_#E11D48]" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel rounded-2xl p-8 lg:p-10 border-[#E11D48]/10"
                        >
                            <h3 className="font-syne font-bold text-xl mb-6">Anmeldung</h3>
                            <RegistrationForm />
                        </motion.div>
                    </div>
                </div>
            </section>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#06b6d4]/20 to-transparent" />

            {/* ═══════════════════════════════════════════ */}
            {/* EVENTS SECTION                             */}
            {/* ═══════════════════════════════════════════ */}
            <section id="events" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-xs font-syne text-[var(--color-cyan)] uppercase tracking-[0.2em] mb-3">Veranstaltungen</h2>
                        <h3 className="font-syne text-3xl md:text-4xl font-bold">Nächstes Treffen</h3>
                    </motion.div>
                    <NextEventDisplay event={nextEvent} showCountdown={settings.showCountdown} />

                    {settings.showEventArchive && pastEvents.length > 0 && (
                        <div className="mt-16">
                            <h3 className="font-syne text-xl text-[var(--text-muted)] mb-6 border-b border-[var(--border-subtle)] pb-3">Vergangene Treffen</h3>
                            <div className="space-y-4">
                                {pastEvents.map((event: typeof nextEvent) => (
                                    <EventCard key={event._id} event={event} isPast />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* BLOG SECTION                               */}
            {/* ═══════════════════════════════════════════ */}
            {blogPosts.length > 0 && (
                <>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
                    <section className="py-24 relative">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                                <div>
                                    <h2 className="text-xs font-syne text-[var(--color-cyan)] uppercase tracking-[0.2em] mb-3">Aktuelles</h2>
                                    <h3 className="text-3xl md:text-4xl font-syne font-bold">Neueste Beiträge</h3>
                                </div>
                                <Link href="/blog" className="bg-[var(--bg-pill)] backdrop-blur-md border border-[var(--border-subtle)] rounded-full px-5 py-2 font-medium tracking-wide hover:border-[#06b6d4] hover:text-[var(--color-cyan)] transition-all text-sm mt-6 md:mt-0 font-syne text-center text-[var(--text-body)]">
                                    Alle Beiträge
                                </Link>
                            </div>
                            <BlogList posts={blogPosts} />
                        </div>
                    </section>
                </>
            )}

            <StickyCTA />
            <Footer />
        </div>
    );
}
