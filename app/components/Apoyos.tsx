"use client";

import ScrollReveal from "./ScrollReveal";
import { Users } from "lucide-react";
import { useCandidate } from "./CandidateToggleContext";

const APOYOS_CEPEDA = [
  "Partido Comunes",
  "MAIS (Movimiento Alternativo Indígena y Social)",
  "Roy Barreras (La Fuerza)",
  "32 barras y 18 colectivos del fútbol profesional colombiano",
  "Progressive International (coalición izquierdista global)",
];

const APOYOS_ESPRIELLA = [
  "Cambio Radical (anunció apoyo el 31 mayo)",
  "Sectores empresariales y gremios",
  "Electorado antiizquierdista que votó por Paloma Valencia en 1ª vuelta",
];

export default function Apoyos() {
  const { active } = useCandidate();
  const isCepeda = active === "cepeda";

  return (
    <section
      id="apoyos"
      className="section-pad"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 7
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Apoyos políticos para la 2ª vuelta
            </h2>
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              Fuente:{" "}
              <a href="https://www.elcolombiano.com/especiales/elecciones-2026" target="_blank" rel="noopener noreferrer" className="source-link">
                El Colombiano (1 jun 2026) ↗
              </a>
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Cepeda */}
          <div className={!isCepeda ? "hidden md:block" : ""}>
          <ScrollReveal direction="left" delay={0.1}>
            <div
              className="glass-cepeda rounded-2xl p-6"
              style={{ boxShadow: "0 0 30px rgba(91,45,142,0.1)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Users size={16} style={{ color: "#C084FC" }} />
                <h3 className="font-barlow-cond font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C084FC" }}>
                  Iván Cepeda
                </h3>
              </div>
              <ul className="space-y-3">
                {APOYOS_CEPEDA.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                      style={{ background: "#8B5CF6" }}
                    />
                    <span className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          </div>

          {/* Espriella */}
          <div className={isCepeda ? "hidden md:block" : ""}>
          <ScrollReveal direction="right" delay={0.15}>
            <div
              className="glass-espriella rounded-2xl p-6"
              style={{ boxShadow: "0 0 30px rgba(212,175,55,0.08)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Users size={16} style={{ color: "#D4AF37" }} />
                <h3 className="font-barlow-cond font-black text-xl uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#D4AF37" }}>
                  De la Espriella
                </h3>
              </div>
              <ul className="space-y-3">
                {APOYOS_ESPRIELLA.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                      style={{ background: "#D4AF37" }}
                    />
                    <span className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow', sans-serif" }}>
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
