"use client";

import ScrollReveal from "./ScrollReveal";
import { GraduationCap, Briefcase, AlertCircle } from "lucide-react";
import { useCandidate } from "./CandidateToggleContext";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>
        {label}
      </span>
      <span className="text-sm" style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
        {value}
      </span>
    </div>
  );
}

function EducRow({ item, href, source }: { item: string; href?: string; source?: string }) {
  return (
    <li className="flex items-start gap-2 py-1.5">
      <GraduationCap size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
      <span className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
        {item}
      </span>
    </li>
  );
}

function TimelineItem({ year, text }: { year: string; text: string }) {
  return (
    <li className="flex gap-3 py-2">
      <span className="text-xs font-bold tabular-nums flex-shrink-0 w-10" style={{ color: "var(--text-muted)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem" }}>
        {year}
      </span>
      <span className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
        {text}
      </span>
    </li>
  );
}

export default function HojaDeVida() {
  const { active } = useCandidate();
  const isCepeda = active === "cepeda";

  return (
    <section
      id="hoja-de-vida"
      className="section-pad"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 1
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Hoja de vida
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              Trayectoria verificada con fuentes citadas
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CEPEDA */}
          <div className={!isCepeda ? "hidden md:block" : ""}>
          <ScrollReveal direction="left" delay={0.1}>
            <div
              className="glass-cepeda rounded-2xl p-6 h-full"
              style={{ boxShadow: "0 0 40px rgba(91,45,142,0.12)" }}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C084FC", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}>
                    Pacto Histórico · Izquierda
                  </div>
                  <h3 className="font-barlow-cond font-bold uppercase tracking-wide text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                    Iván Cepeda Castro
                  </h3>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #5B2D8E, #8B5CF6)", boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}
                >
                  <span className="font-barlow-cond font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>IC</span>
                </div>
              </div>

              <div className="space-y-0 mb-5">
                <InfoRow label="Nacimiento" value="24 oct. 1962, Bogotá D.C. (63 años)" />
                <InfoRow label="Partido" value="Pacto Histórico" />
                <InfoRow label="Fórmula VP" value="Aida Quilcué Vivas (líder indígena Nasa, senadora MAIS)" />
                <InfoRow label="Ideología" value="Izquierda — continuidad explícita gobierno Petro" />
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={14} style={{ color: "#C084FC" }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#C084FC", fontFamily: "'DM Sans', sans-serif" }}>Educación</span>
                </div>
                <ul className="space-y-1 pl-1">
                  <EducRow item="Filosofía — Universidad San Clemente de Ohrid, Bulgaria" />
                  <EducRow item="Especialista en Derecho Internacional Humanitario — Universidad Católica de Lyon, Francia" />
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={14} style={{ color: "#C084FC" }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#C084FC", fontFamily: "'DM Sans', sans-serif" }}>Trayectoria</span>
                </div>
                <ul className="space-y-0">
                  <TimelineItem year="1994" text="Asesinato de su padre Manuel Cepeda Vargas, senador de la Unión Patriótica. La Corte IDH condenó al Estado colombiano." />
                  <TimelineItem year="1998–04" text="Exiliado en Europa por amenazas al denunciar vínculos entre políticos y paramilitares." />
                  <TimelineItem year="2010–14" text="Representante a la Cámara." />
                  <TimelineItem year="2014–26" text="Senador (Polo Democrático / Pacto Histórico). Defensor de derechos humanos." />
                  <TimelineItem year="oct 2025" text="Gana consulta interna del Pacto Histórico con 2.700.000 votos." />
                </ul>
              </div>

              <div
                className="rounded-xl p-3 flex gap-2 items-start"
                style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}
              >
                <AlertCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#FBBF24" }} />
                <p className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                  <strong style={{ color: "#FBBF24" }}>Salud:</strong> Diagnóstico de cáncer de colon (2018); lesión hepática tratada (2021–2022). La campaña no respondió solicitudes de información médica verificable (mar–may 2026).{" "}
                  <a href="https://www.elcolombiano.com/especiales/elecciones-2026/salud-ivan-cepeda-debate-transparencia-examenes-medicos" target="_blank" rel="noopener noreferrer" className="source-link">El Colombiano ↗</a>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <a href="https://es.wikipedia.org/wiki/Iv%C3%A1n_Cepeda" target="_blank" rel="noopener noreferrer" className="source-link">Wikipedia ES ↗</a>
                <a href="https://cnnespanol.cnn.com/2026/05/27/colombia/quien-es-ivan-cepeda-petro-elecciones-orix" target="_blank" rel="noopener noreferrer" className="source-link">CNN en Español ↗</a>
                <a href="https://www.lasillavacia.com/ivan-cepeda/" target="_blank" rel="noopener noreferrer" className="source-link">La Silla Vacía ↗</a>
              </div>
            </div>
          </ScrollReveal>
          </div>

          {/* DE LA ESPRIELLA */}
          <div className={isCepeda ? "hidden md:block" : ""}>
          <ScrollReveal direction="right" delay={0.15}>
            <div
              className="glass-espriella rounded-2xl p-6 h-full"
              style={{ boxShadow: "0 0 40px rgba(212,175,55,0.1)" }}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}>
                    Defensores de la Patria · Derecha radical
                  </div>
                  <h3 className="font-barlow-cond text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                    Abelardo de la Espriella
                  </h3>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #0F1D3D, #1E3A5F)", border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 0 20px rgba(212,175,55,0.25)" }}
                >
                  <span className="font-barlow-cond font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#D4AF37" }}>AE</span>
                </div>
              </div>

              <div className="space-y-0 mb-5">
                <InfoRow label="Nacimiento" value="31 jul. 1978, Bogotá D.C.; criado en Montería, Córdoba (47 años)" />
                <InfoRow label="Partido" value="Defensores de la Patria (fundado jul. 2025)" />
                <InfoRow label="Fórmula VP" value="José Manuel Restrepo (economista, MSc LSE, PhD U. Bath, exministro Hacienda)" />
                <InfoRow label="Ideología" value="Derecha radical — ruptura total con gobierno Petro" />
                <InfoRow label="Ciudadanías" value="Colombiana · Estadounidense (2023) · Italiana (2024)" />
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={14} style={{ color: "#D4AF37" }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>Educación</span>
                </div>
                <ul className="space-y-1 pl-1">
                  <EducRow item="Derecho — Universidad Sergio Arboleda, Bogotá" />
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={14} style={{ color: "#D4AF37" }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif" }}>Trayectoria</span>
                </div>
                <ul className="space-y-0">
                  <TimelineItem year="2002+" text="Abogado penalista de alto perfil; fundó su propia firma." />
                  <TimelineItem year="varios" text="Empresario: moda (De La Espriella Style), licores, gastronomía." />
                  <TimelineItem year="2018–22" text="Cantante de ópera: álbumes 'De mi alma italiana' y 'Navegante'." />
                  <TimelineItem year="2024" text="Vivió en Florencia (Italia). Regresa para candidatura." />
                  <TimelineItem year="jul 2025" text="Funda Defensores de la Patria y lanza candidatura presidencial." />
                  <TimelineItem year="may 2026" text="Obtiene 43.74% en 1ª vuelta — outsider más votado desde Rodolfo Hernández (2022)." />
                </ul>
              </div>

              <div
                className="rounded-xl p-3 flex gap-2 items-start"
                style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <AlertCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#D4AF37" }} />
                <p className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                  <strong style={{ color: "#D4AF37" }}>Referentes declarados:</strong> Javier Milei (Argentina) y Nayib Bukele (El Salvador).
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <a href="https://en.wikipedia.org/wiki/Abelardo_de_la_Espriella" target="_blank" rel="noopener noreferrer" className="source-link">Wikipedia EN ↗</a>
                <a href="https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" target="_blank" rel="noopener noreferrer" className="source-link">El Colombiano ↗</a>
                <a href="https://cnnespanol.cnn.com/2026/05/28/colombia/quien-es-abelardo-espriella-candidato-orix" target="_blank" rel="noopener noreferrer" className="source-link">CNN en Español ↗</a>
              </div>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
