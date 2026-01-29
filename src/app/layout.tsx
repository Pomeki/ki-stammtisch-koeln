import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KI-Stammtisch Köln | Networking für KI-Interessierte",
  description: "Der KI-Stammtisch Köln ist der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI in ihr Geschäft integrieren möchten. Jeden Monat in der Kölner Innenstadt.",
  keywords: ["KI", "Künstliche Intelligenz", "AI", "Stammtisch", "Köln", "Networking", "Business", "Unternehmer"],
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${openSans.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
