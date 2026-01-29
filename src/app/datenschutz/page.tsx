import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Datenschutzerklärung | KI-Stammtisch Köln',
    description: 'Datenschutzerklärung des KI-Stammtisch Köln gemäß DSGVO',
};

export default function DatenschutzPage() {
    return (
        <>
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#7C3AED] hover:text-[#5B21B6] mb-8 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Zurück zur Startseite
                        </Link>

                        <h1 className="text-4xl font-bold text-[#4C1D95] mb-8">Datenschutzerklärung</h1>

                        <div className="prose">
                            <h2>1. Datenschutz auf einen Blick</h2>

                            <h3>Allgemeine Hinweise</h3>
                            <p>
                                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                            </p>

                            <h3>Datenerfassung auf dieser Website</h3>
                            <p>
                                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                            </p>

                            <p>
                                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Registrierungsformular eingeben.
                            </p>

                            <p>
                                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                            </p>

                            <p>
                                <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Wenn Sie sich für den KI-Stammtisch registrieren, werden Ihre Daten verwendet, um Sie über kommende Veranstaltungen zu informieren.
                            </p>

                            <h2>2. Hosting</h2>
                            <p>
                                Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [Hosting-Anbieter eintragen]
                            </p>

                            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

                            <h3>Datenschutz</h3>
                            <p>
                                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                            </p>

                            <h3>Hinweis zur verantwortlichen Stelle</h3>
                            <p>
                                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                                Uwe Morawetz<br />
                                Untergründemich 40<br />
                                51491 Overath<br />
                                Telefon: 0152-56304362<br />
                                E-Mail: service@ki-stammtisch.koeln
                            </p>

                            <h3>Speicherdauer</h3>
                            <p>
                                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
                            </p>

                            <h2>4. Datenerfassung auf dieser Website</h2>

                            <h3>Registrierung / Anmeldung zum KI-Stammtisch</h3>
                            <p>
                                Wenn Sie sich für den KI-Stammtisch anmelden, erfassen wir folgende Daten:
                            </p>
                            <ul>
                                <li>Name</li>
                                <li>E-Mail-Adresse (Firmen-E-Mail)</li>
                                <li>Firmenname</li>
                                <li>Branche (optional)</li>
                            </ul>
                            <p>
                                Diese Daten werden verwendet, um Sie über kommende Stammtisch-Termine zu informieren und den Austausch unter den Teilnehmern zu ermöglichen. Die Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                            </p>
                            <p>
                                Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Senden Sie hierzu eine E-Mail an service@ki-stammtisch.koeln.
                            </p>

                            <h3>Server-Log-Dateien</h3>
                            <p>
                                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                            </p>
                            <ul>
                                <li>Browsertyp und Browserversion</li>
                                <li>verwendetes Betriebssystem</li>
                                <li>Referrer URL</li>
                                <li>Hostname des zugreifenden Rechners</li>
                                <li>Uhrzeit der Serveranfrage</li>
                                <li>IP-Adresse</li>
                            </ul>
                            <p>
                                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                            </p>

                            <h2>5. Ihre Rechte</h2>
                            <p>
                                Sie haben jederzeit das Recht:
                            </p>
                            <ul>
                                <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
                                <li><strong>Berichtigung</strong> unrichtiger personenbezogener Daten zu verlangen (Art. 16 DSGVO)</li>
                                <li><strong>Löschung</strong> Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 17 DSGVO)</li>
                                <li><strong>Einschränkung</strong> der Verarbeitung Ihrer personenbezogenen Daten zu verlangen (Art. 18 DSGVO)</li>
                                <li><strong>Widerspruch</strong> gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen (Art. 21 DSGVO)</li>
                                <li><strong>Datenübertragbarkeit</strong> – Ihre Daten in einem gängigen Format zu erhalten (Art. 20 DSGVO)</li>
                                <li>Sich bei einer <strong>Aufsichtsbehörde</strong> zu beschweren (Art. 77 DSGVO)</li>
                            </ul>

                            <h2>6. Aktualität und Änderung dieser Datenschutzerklärung</h2>
                            <p>
                                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: Januar 2026.
                            </p>
                            <p>
                                Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
                            </p>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
