import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Comparador Segunda Vuelta Colombia 2026 | Cepeda vs. De la Espriella",
  description:
    "Comparación objetiva de propuestas, trayectorias y controversias de los candidatos presidenciales de la segunda vuelta del 21 de junio de 2026.",
  openGraph: {
    title: "Cepeda vs. De la Espriella — Segunda Vuelta Colombia 2026",
    description:
      "\u{1F1E8}\u{1F1F4} Compara propuestas, controversias y mitos verificados con fuentes citadas. Sin sesgo editorial. Vota con informacion, no con rumores.",
    type: "website",
    url: "https://cepeda-vs-abelardo.vercel.app",
    siteName: "Colombia Elige 2026",
    locale: "es_CO",
    images: [
      {
        url: "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Cepeda vs. De la Espriella — Segunda Vuelta Colombia 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cepeda vs. De la Espriella — Segunda Vuelta 2026",
    description:
      "Compara propuestas, controversias y mitos verificados. Vota con informacion, no con rumores.",
    images: ["https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/og-image.jpeg"],
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
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
