"use client";

import ScrollReveal from "./ScrollReveal";
import { useCandidate } from "./CandidateToggleContext";

interface Row {
  categoria: string;
  cepeda: string;
  espriella: string;
}

const ROWS: Row[] = [
  { categoria: "Espectro político", cepeda: "Izquierda", espriella: "Derecha radical" },
  { categoria: "Edad", cepeda: "63 años", espriella: "47 años" },
  { categoria: "Experiencia cargo público", cepeda: "Senador ~12 años, Representante ~4 años", espriella: "Ninguno" },
  { categoria: "Partido", cepeda: "Pacto Histórico", espriella: "Defensores de la Patria" },
  { categoria: "Continuidad Petro", cepeda: "Sí, explícita (143 menciones en programa)", espriella: "No — ruptura total" },
  { categoria: "Seguridad", cepeda: "Negociación + causas estructurales", espriella: "Mano dura, cero negociación" },
  { categoria: "Economía", cepeda: "Reforma tributaria progresiva", espriella: "Reducción Estado 40%, menos impuestos" },
  { categoria: "Paz", cepeda: "«Paz con justicia social»", espriella: "«La paz no se negocia, se impone»" },
  { categoria: "Salud", cepeda: "Reforma estructural Ley 100", espriella: "Restaurar EPS, revertir reforma Petro" },
  { categoria: "JEP", cepeda: "Mantener y fortalecer", espriella: "Mencionó eliminarla; ya no aparece en programa" },
  { categoria: "Fórmula VP", cepeda: "Aida Quilcué (líder indígena)", espriella: "José Manuel Restrepo (economista)" },
  { categoria: "Resultado 1ª vuelta", cepeda: "40.91% (2.º lugar)", espriella: "43.74% (1.er lugar)" },
  { categoria: "Referentes internacionales", cepeda: "Progresismo latinoamericano", espriella: "Milei (Argentina), Bukele (El Salvador)" },
  { categoria: "Debates en campaña", cepeda: "Ninguno", espriella: "Varios" },
];

export default function TablaComparativa() {
  const { active } = useCandidate();
  const isCepeda = active === "cepeda";

  return (
    <section
      id="tabla"
      className="section-pad mesh-neutral"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 6
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Tabla comparativa rápida
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop: full 3-column table */}
        <ScrollReveal delay={0.1}>
          <div
            className="hidden md:block rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="px-4 py-3" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                Categoría
              </div>
              <div
                className="px-4 py-3 text-center"
                style={{ color: "#C084FC", fontFamily: "'DM Sans', sans-serif", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
              >
                Iván Cepeda
              </div>
              <div
                className="px-4 py-3 text-center"
                style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
              >
                De la Espriella
              </div>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.categoria}
                className="grid grid-cols-3 transition-colors duration-100"
                style={{
                  borderBottom: i < ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"; }}
              >
                <div className="px-4 py-3 text-xs font-medium" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                  {row.categoria}
                </div>
                <div className="px-4 py-3 text-xs text-center" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.cepeda}
                </div>
                <div className="px-4 py-3 text-xs text-center" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow', sans-serif", borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.espriella}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile: stacked cards for selected candidate */}
        <ScrollReveal delay={0.1}>
          <div className="md:hidden space-y-3">
            {ROWS.map((row, i) => (
              <div
                key={row.categoria}
                className="rounded-xl p-4"
                style={{
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                  {row.categoria}
                </div>
                <div className="text-sm" style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
                  {isCepeda ? row.cepeda : row.espriella}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal delay={0.15}>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {[
              { label: "Registraduría Nacional", href: "https://www.registraduria.gov.co" },
              { label: "La Silla Vacía", href: "https://www.lasillavacia.com" },
              { label: "Razón Pública", href: "https://razonpublica.com" },
              { label: "El Colombiano", href: "https://www.elcolombiano.com" },
              { label: "CNN en Español", href: "https://cnnespanol.cnn.com" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="source-link">
                {s.label} ↗
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
