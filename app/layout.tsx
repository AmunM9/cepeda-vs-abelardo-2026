import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const SITE_URL = "https://cepeda-vs-abelardo.vercel.app";
const OG_IMAGE = "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/og-image.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cepeda vs De la Espriella — Comparador Segunda Vuelta Colombia 2026",
  description:
    "Compara propuestas, controversias, mitos verificados y hojas de vida de Iván Cepeda y Abelardo de la Espriella para la segunda vuelta presidencial del 21 de junio de 2026. Con fuentes citadas y sin sesgo editorial.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cepeda vs De la Espriella — Segunda Vuelta Colombia 2026",
    description:
      "Compara propuestas, controversias y mitos verificados con fuentes citadas. Sin sesgo editorial. Vota con información, no con rumores.",
    type: "website",
    url: SITE_URL,
    siteName: "Colombia Elige 2026",
    locale: "es_CO",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cepeda vs De la Espriella — Segunda Vuelta Colombia 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cepeda vs De la Espriella — Segunda Vuelta 2026",
    description:
      "Compara propuestas, controversias y mitos verificados. Vota con información, no con rumores.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "FLWvuPC2aqet1W0n_CjH6EQiOvaawpmcWmjSVGVA5lk",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Colombia Elige 2026",
      description:
        "Comparador neutral de candidatos presidenciales para la segunda vuelta de Colombia 2026.",
      inLanguage: "es-CO",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Cepeda vs De la Espriella — Comparador Segunda Vuelta Colombia 2026",
      description:
        "Compara propuestas, controversias, mitos verificados y hojas de vida de Iván Cepeda y Abelardo de la Espriella para la segunda vuelta presidencial del 21 de junio de 2026.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "es-CO",
      datePublished: "2026-05-25",
      dateModified: "2026-06-08",
      about: [
        {
          "@type": "Person",
          name: "Iván Cepeda Castro",
          jobTitle: "Candidato presidencial",
          affiliation: { "@type": "Organization", name: "Pacto Histórico" },
        },
        {
          "@type": "Person",
          name: "Abelardo de la Espriella Gutiérrez",
          jobTitle: "Candidato presidencial",
          affiliation: { "@type": "Organization", name: "Defensores de la Patria" },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
