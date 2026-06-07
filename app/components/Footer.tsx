"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FUENTES = [
  { label: "Registraduría Nacional", href: "https://www.registraduria.gov.co" },
  { label: "La Silla Vacía", href: "https://www.lasillavacia.com" },
  { label: "El Colombiano", href: "https://www.elcolombiano.com" },
  { label: "El Espectador", href: "https://www.elespectador.com" },
  { label: "ColombiaCheck", href: "https://colombiacheck.com" },
  { label: "Razón Pública", href: "https://razonpublica.com" },
  { label: "CNN en Español", href: "https://cnnespanol.cnn.com" },
  { label: "Reuters / EFE / AFP", href: "https://www.reuters.com" },
  { label: "Reuters Institute Oxford", href: "https://reutersinstitute.politics.ox.ac.uk" },
  { label: "Wikipedia ES/EN", href: "https://es.wikipedia.org" },
  { label: "FLIP", href: "https://www.flip.org.co" },
  { label: "PARES", href: "https://www.pares.com.co" },
];

const FUENTES_EXCLUIDAS = [
  {
    nombre: "Revista Semana",
    razon:
      "Adquirida en 2020 por el Grupo Gilinski. Pasó de progresista a conservadora afín al uribismo. Más de 10 periodistas de investigación renunciaron en masa.",
    ref: "https://es.wikipedia.org/wiki/Semana_(revista_de_Colombia)",
  },
  {
    nombre: "RCN Televisión / Radio",
    razon:
      "Propiedad del Grupo Ardila Lülle, históricamente con línea editorial de derecha empresarial.",
    ref: "https://lanota.com/index.php/ranking-2025-medios-de-comunicacion-de-colombia.html",
  },
  {
    nombre: "Cambio Colombia",
    razon:
      "Medio fundado con financiación y línea editorial cercana al gobierno Petro / izquierda.",
    ref: "",
  },
];

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer
        id="footer"
        className="section-pad"
        style={{ background: "var(--bg-base)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            {/* Top row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <p
                  className="font-barlow-cond font-black text-2xl uppercase tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
                >
                  CO · Segunda Vuelta 2026
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                  Última actualización: 6 de junio de 2026
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-full transition-all duration-150"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <Info size={13} />
                ¿Cómo elegimos las fuentes?
              </button>
            </div>

            {/* Sources grid */}
            <div className="mb-8">
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Fuentes principales
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {FUENTES.map((f) => (
                  <a
                    key={f.href}
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link"
                  >
                    {f.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.05)" }} />

            {/* Disclaimer */}
            <p
              className="text-xs leading-relaxed text-center"
              style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", maxWidth: "600px", margin: "0 auto" }}
            >
              Página informativa e independiente. No es material de campaña ni promueve ningún candidato. Todos los datos tienen fuente citada verificable.
            </p>
          </ScrollReveal>
        </div>
      </footer>

      {/* Sources Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="glass rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            style={{
              background: "rgba(10, 10, 18, 0.96)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-barlow-cond font-bold uppercase tracking-wide text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                Criterios de selección de fuentes
              </h3>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
            </div>

            <p className="text-sm mb-5" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
              Este sitio prioriza fuentes con mayor índice de objetividad documentada según el{" "}
              <a href="https://reutersinstitute.politics.ox.ac.uk/es/digital-news-report/2024/colombia" target="_blank" rel="noopener noreferrer" className="source-link">
                Reuters Institute Digital News Report 2024 ↗
              </a>{" "}
              y otras investigaciones independientes.
            </p>

            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Fuentes excluidas y por qué
            </p>

            <div className="space-y-3 mb-5">
              {FUENTES_EXCLUIDAS.map((f) => (
                <div
                  key={f.nombre}
                  className="rounded-lg p-3"
                  style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: "#FCA5A5", fontFamily: "'DM Sans', sans-serif" }}>
                    {f.nombre}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                    {f.razon}
                  </p>
                  {f.ref && (
                    <a href={f.ref} target="_blank" rel="noopener noreferrer" className="source-link block mt-1">
                      Referencia ↗
                    </a>
                  )}
                </div>
              ))}
            </div>

            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Fuentes preferidas (en orden de objetividad)
            </p>
            <ol className="space-y-1">
              {[
                "Registraduría Nacional — datos electorales oficiales",
                "ColombiaCheck — plataforma de fact-checking",
                "La Silla Vacía — periodismo investigativo, monitor de datos",
                "El Colombiano — mayor índice de imparcialidad editorial (estudio 2013)",
                "Razón Pública — análisis académico independiente",
                "El Espectador — 54% confianza Reuters; histórico de independencia",
                "Agencias internacionales: Reuters, AFP, EFE, CNN en Español, BBC Mundo",
                "Reuters Institute / Oxford — investigación sobre medios colombianos",
                "Wikipedia ES/EN — como agregador con referencias verificables",
                "FLIP — para temas de hostigamiento judicial",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-xs"
                  style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span style={{ color: "var(--text-muted)", width: "16px", flexShrink: 0 }}>{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
