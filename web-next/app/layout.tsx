import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Backdrop } from "@/components/Backdrop";
import { ScrollProgress } from "@/components/ScrollProgress";

// Fuentes de marca (self-host vía next/font, sin FOUT). Exponen variables CSS
// que consume el tema de Tailwind v4 en globals.css.
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});
const body = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});
const mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const STAGING = process.env.STAGING === "1";

export const metadata: Metadata = {
  metadataBase: new URL("https://picodavi.com"),
  title: "Diseño web en Catalunya para negocios locales | Picodavi",
  description:
    "Diseño y desarrollo web a medida para negocios locales de Catalunya: restaurantes, hoteles, clínicas y comercios. Rápido, claro y con precio cerrado.",
  keywords: [
    "diseño web Catalunya",
    "diseño web Barcelona",
    "páginas web para restaurantes",
    "web para hoteles rurales",
    "diseño web Montseny",
    "desarrollo web negocios locales",
    "web para clínicas",
    "diseñador web freelance Catalunya",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://picodavi.com/",
    siteName: "Picodavi",
    title: "Diseño web en Catalunya para negocios locales | Picodavi",
    description:
      "Webs a medida para negocios locales: rápidas, claras y con precio cerrado.",
  },
  // En staging (/beta) evitamos que Google la indexe.
  robots: STAGING ? { index: false, follow: false } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        {/* Sin JS, las secciones animadas se muestran igualmente. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Backdrop />
        <LanguageProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
