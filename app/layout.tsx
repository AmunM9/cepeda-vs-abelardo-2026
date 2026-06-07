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
      "Datos verificados con fuentes citadas. Sin sesgo editorial. Decide con información.",
    type: "website",
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
