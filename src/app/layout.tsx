import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KI-Stammtisch Köln | Networking für KI-Interessierte",
  description: "Der KI-Stammtisch Köln ist der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI in ihr Geschäft integrieren möchten.",
  keywords: ["KI", "Künstliche Intelligenz", "AI", "Stammtisch", "Köln", "Networking", "Business", "Tech"],
  authors: [{ name: "KI-Stammtisch Köln" }],
  openGraph: {
    title: "KI-Stammtisch Köln",
    description: "Networking für KI-Interessierte in Köln",
    url: "https://ki-stammtisch.koeln",
    siteName: "KI-Stammtisch Köln",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KI-Stammtisch Köln",
    description: "Networking für KI-Interessierte in Köln",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${manrope.variable} ${syne.variable} antialiased font-manrope bg-[#050505] text-white selection:bg-[#E11D48]/30 overflow-x-hidden min-h-screen`}>
        {/* Subtle noise overlay for texture */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.04]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"}}></div>
        {children}
      </body>
    </html>
  );
}
