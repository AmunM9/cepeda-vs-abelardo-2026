import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
