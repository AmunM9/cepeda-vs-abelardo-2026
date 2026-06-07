"use client";

import ScrollReveal from "./ScrollReveal";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { AlertTriangle } from "lucide-react";

const ENCUESTAS_2V = [
  {
    firma: "AtlasIntel",
    fecha: "1–2 jun",
    espriella: 50.3,
    cepeda: 42.6,
    fuente: "https://www.elcolombiano.com/especiales/elecciones-2026",
  },
  {
    firma: "CB Global",
    fecha: "1–4 jun",
    espriella: 46.7,
    cepeda: 41.9,
    fuente: "https://www.lasillavacia.com/abelardo-de-la-espriella-candidato-presidencial-2026/",
  },
  {
    firma: "Guarumo/Eco.",
    fecha: "jun 2026",
    espriella: 43.6,
    cepeda: 40.0,
    fuente: "https://www.elespectador.com",
  },
];

const RESULTADO_1V = [
  { name: "De la Espriella\n(Real)", value: 43.74, color: "#D4AF37" },
  { name: "Cepeda\n(Real)", value: 40.91, color: "#8B5CF6" },
  { name: "Valencia", value: 6.92, color: "#6B7280" },
];

interface TooltipEntry {
  value: number;
  name: string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div
      className="glass rounded-xl px-4 py-3 text-xs"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <p style={{ color: "var(--text-muted)", marginBottom: "4px" }}>{String(label ?? "")}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}%</strong>
        </p>
      ))}
    </div>
  );
}

export default function Encuestas() {
  const chartData2v = ENCUESTAS_2V.map((e) => ({
    firma: e.firma,
    "De la Espriella": e.espriella,
    Cepeda: e.cepeda,
    fuente: e.fuente,
    fecha: e.fecha,
  }));

  return (
    <section
      id="encuestas"
      className="section-pad"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 6
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Encuestas y contexto electoral
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resultado 1ª vuelta */}
          <ScrollReveal direction="left" delay={0.1}>
            <div
              className="glass rounded-2xl p-5"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                Resultado oficial — 1ª vuelta
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                31 mayo 2026 ·{" "}
                <a href="https://wapp.registraduria.gov.co" target="_blank" rel="noopener noreferrer" className="source-link">
                  Registraduría Nacional ↗
                </a>
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={RESULTADO_1V} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 55]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "'DM Sans', sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "'DM Sans', sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => (
                      <CustomTooltip active={active} payload={payload as unknown as TooltipEntry[]} label={label} />
                    )}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {RESULTADO_1V.map((e) => (
                      <Cell key={e.name} fill={e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>

          {/* Encuestas 2ª vuelta */}
          <ScrollReveal direction="right" delay={0.15}>
            <div
              className="glass rounded-2xl p-5"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                Encuestas — 2ª vuelta (jun 2026)
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                Intención de voto sin decididos · No son pronósticos
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData2v} margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="firma"
                    tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "'DM Sans', sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[35, 55]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "'DM Sans', sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => (
                      <CustomTooltip active={active} payload={payload as unknown as TooltipEntry[]} label={label} />
                    )}
                  />
                  <Bar dataKey="De la Espriella" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Cepeda" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Fuentes */}
              <div className="flex flex-wrap gap-3 mt-3">
                {ENCUESTAS_2V.map((e) => (
                  <a key={e.firma} href={e.fuente} target="_blank" rel="noopener noreferrer" className="source-link">
                    {e.firma} ({e.fecha}) ↗
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Warning */}
        <ScrollReveal delay={0.2}>
          <div
            className="mt-6 glass rounded-xl p-4 flex gap-3 items-start"
            style={{ border: "1px solid rgba(251,191,36,0.2)" }}
          >
            <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#FBBF24" }} />
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: "#FBBF24", fontFamily: "'DM Sans', sans-serif" }}>
                Advertencia sobre encuestas
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                Las encuestadoras fallaron significativamente en la primera vuelta. AtlasIntel fue la más cercana a los resultados reales. De la Espriella obtuvo entre 12 y 20 puntos más de lo que le asignaban los sondeos.{" "}
                <a href="https://www.elcolombiano.com/especiales/elecciones-2026/las-encuestas-acertaron-ganadores-primera-vuelta-presidencial-FE37223035" target="_blank" rel="noopener noreferrer" className="source-link">
                  El Colombiano ↗
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
