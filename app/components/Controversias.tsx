"use client";

import ScrollReveal from "./ScrollReveal";
import { useCandidate } from "./CandidateToggleContext";

type BadgeType = "etico" | "legal" | "declaraciones" | "electoral" | "investigacion" | "incoherencia";

interface Controversia {
  candidato: "cepeda" | "espriella";
  titulo: string;
  badge: BadgeType;
  texto: string;
  fuentes: { label: string; href: string }[];
}

const BADGE_LABELS: Record<BadgeType, string> = {
  etico: "Ético",
  legal: "Legal",
  declaraciones: "Declaraciones",
  electoral: "Electoral",
  investigacion: "Investigación",
  incoherencia: "Incoherencia / Ético",
};

const CONTROVERSIAS: Controversia[] = [
  {
    candidato: "espriella",
    titulo: "Propuso legalizar el 10% del dinero del narcotráfico",
    badge: "incoherencia",
    texto: "En noviembre de 2025 propuso legalizar el 10% de los capitales ilegales del narcotráfico: «Usted entrega el noventa por ciento, me paga tres años de cárcel, y yo no lo extradito.» La propuesta desapareció de su programa oficial de segunda vuelta, mientras su discurso actual es «cero negociaciones con criminales» y extradición masiva.",
    fuentes: [
      { label: "Infobae Colombia (nov 2025)", href: "https://www.infobae.com/colombia/2025/11/11/daniel-quintero-reacciono-a-la-primer-propuesta-de-abelardo-de-la-espriella-como-aspirante-presidencial-lo-que-tenemos-aqui-es-un-bandido/" },
      { label: "El Tiempo (nov 2025)", href: "https://www.eltiempo.com/amp/politica/partidos-politicos/luis-carlos-reyes-mr-taxes-critico-una-propuestas-de-abelardo-de-la-espriella-hay-que-hacer-justicia-no-darles-tranquilidad-a-criminales-3508506" },
      { label: "Colombia.com (nov 2025)", href: "https://www.colombia.com/actualidad/politica/abelardo-de-la-espriella-propone-legalizar-el-10-de-capitales-ilegales-y-desata-debate-nacional-550884" },
      { label: "Infobae Colombia (jun 2026)", href: "https://www.infobae.com/colombia/2026/06/01/maria-del-mar-pizarro-destapo-las-ocho-iniciativas-de-abelardo-de-la-espriella-que-mas-polemica-generan-propuestas-que-asustan/" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Alex Saab",
    badge: "etico",
    texto: "Fue abogado de Alex Saab, señalado por EEUU como testaferro del gobierno de Maduro. Afirma que abandonó la defensa al conocer la doble contabilidad y sus vínculos con el gobierno venezolano.",
    fuentes: [
      { label: "Wikipedia EN", href: "https://en.wikipedia.org/wiki/Abelardo_de_la_Espriella" },
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Denuncia de David Murcia Guzmán",
    badge: "legal",
    texto: "Murcia Guzmán (condenado por DMG) presentó en febrero 2026 denuncia disciplinaria contra De la Espriella por supuesta no devolución de COP 5.000 millones. El candidato lo calificó de «montaje».",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "109 demandas por injuria y calumnia (2008–2019)",
    badge: "legal",
    texto: "La FLIP (Fundación para la Libertad de Prensa) y la IAPA catalogaron estas acciones como «hostigamiento judicial» a periodistas. Muchas fueron desestimadas.",
    fuentes: [
      { label: "Wikipedia EN", href: "https://en.wikipedia.org/wiki/Abelardo_de_la_Espriella" },
      { label: "FLIP", href: "https://www.flip.org.co" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Comentarios machistas y homófobos",
    badge: "declaraciones",
    texto: "Llamó «ignorante» a una periodista y realizó comentarios inapropiados sobre el cuerpo de otra comunicadora. Cuestionado por comentarios homófobos en múltiples ocasiones.",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "«Destripar a la izquierda»",
    badge: "declaraciones",
    texto: "Afirmó en entrevistas que había que «destripar» a la izquierda. Posteriormente pidió disculpas.",
    fuentes: [
      { label: "PARES", href: "https://www.pares.com.co/los-pecados-de-abelardo-de-la-espriella-podrian-dar-al-traste-con-su-candidatura/" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Prohibición judicial de usar la camiseta de Colombia",
    badge: "electoral",
    texto: "El Juzgado 120 Penal Municipal de Bogotá (3 jun 2026) ordenó a De la Espriella y Defensores de la Patria abstenerse de usar la camiseta oficial de la Selección Colombia en campaña, argumentando que asociar símbolos nacionales a una opción electoral puede vulnerar derechos fundamentales.",
    fuentes: [
      { label: "El Espectador", href: "https://www.elespectador.com/judicial/prohiben-a-abelardo-de-la-espriella-usar-la-camiseta-de-la-seleccion-colombia-en-campana/" },
      { label: "Wikipedia EN", href: "https://en.wikipedia.org/wiki/Abelardo_de_la_Espriella" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Denuncias de injerencia externa",
    badge: "electoral",
    texto: "La coalición izquierdista Progressive International alertó sobre la presencia del senador estadounidense Bernie Moreno en Colombia para facilitar una alianza electoral. La Cancillería colombiana rechazó «cualquier intento de injerencia externa».",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elespectador.com/mundo/america/gobierno-de-colombia-rechaza-intervencion-externa-en-elecciones/" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Alianza con Carlos Caicedo",
    badge: "etico",
    texto: "Alianza política con Carlos Caicedo, exgobernador del Magdalena imputado por peculado por apropiación, en contradicción con su plataforma de «revolución ética».",
    fuentes: [
      { label: "CNN en Español", href: "https://cnnespanol.cnn.com/2026/05/27/colombia/quien-es-ivan-cepeda-petro-elecciones-orix" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Mención en computadores de las FARC",
    badge: "investigacion",
    texto: "ColombiaCheck y La Silla Vacía investigaron y encontraron que su defensa pública sobre la aparición de su nombre en archivos de alias Raúl Reyes (2008) no se sostuvo con evidencia. Cepeda tuvo que retractarse parcialmente. Los archivos fueron declarados inválidos por la Corte Suprema.",
    fuentes: [
      { label: "ColombiaCheck", href: "https://colombiacheck.com/investigaciones/mencion-de-ivan-cepeda-en-computador-de-las-farc-no-fue-un-montaje" },
      { label: "Wikipedia ES", href: "https://es.wikipedia.org/wiki/Iv%C3%A1n_Cepeda" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Salud y falta de transparencia",
    badge: "etico",
    texto: "Diagnóstico de cáncer de colon (2018) y lesión hepática (2021–2022). Predica transparencia como pilar de campaña, pero su campaña no respondió solicitudes de información médica verificable entre marzo y mayo 2026.",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/especiales/elecciones-2026/salud-ivan-cepeda-debate-transparencia-examenes-medicos-EE36545537" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Uso del presupuesto del Estado en su campaña",
    badge: "electoral",
    texto: "La Silla Vacía documentó que el gobierno Petro «gastó sin pudor» recursos del Estado para apoyar la campaña de Cepeda en la primera vuelta.",
    fuentes: [
      { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/colombia-va-a-una-segunda-vuelta-entre-dos-proyectos-excluyentes/" },
    ],
  },
];

function ControCard({ c }: { c: Controversia }) {
  const isCep = c.candidato === "cepeda";
  const color = isCep ? "#8B5CF6" : "#D4AF37";

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${isCep ? "rgba(139,92,246,0.12)" : "rgba(212,175,55,0.12)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h4
          className="font-barlow-cond font-bold text-base"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
        >
          {c.titulo}
        </h4>
        <span className={`badge badge-${c.badge} flex-shrink-0`}>
          {BADGE_LABELS[c.badge]}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
        {c.texto}
      </p>
      <div className="flex flex-wrap gap-2 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {c.fuentes.map((f) => (
          <a key={f.href} href={f.href} target="_blank" rel="noopener noreferrer" className="source-link">
            {f.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Controversias() {
  const esprContra = CONTROVERSIAS.filter((c) => c.candidato === "espriella");
  const cepContra = CONTROVERSIAS.filter((c) => c.candidato === "cepeda");
  const { active } = useCandidate();
  const isCepeda = active === "cepeda";

  return (
    <section
      id="controversias"
      className="section-pad"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 3
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Controversias
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              Resumen factual sin adjetivos valorativos · Cada afirmación con fuente verificable
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cepeda — LEFT */}
          <div className={!isCepeda ? "hidden md:block" : ""}>
            <ScrollReveal delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#8B5CF6" }} />
                <h3 className="font-barlow-cond font-bold text-lg uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C084FC" }}>
                  Iván Cepeda
                </h3>
                <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                  {cepContra.length} controversias
                </span>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {cepContra.map((c, i) => (
                <ScrollReveal key={c.titulo} delay={i * 0.05}>
                  <ControCard c={c} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Espriella — RIGHT */}
          <div className={isCepeda ? "hidden md:block" : ""}>
            <ScrollReveal delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#D4AF37" }} />
                <h3 className="font-barlow-cond font-bold text-lg uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#D4AF37" }}>
                  De la Espriella
                </h3>
                <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                  {esprContra.length} controversias
                </span>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {esprContra.map((c, i) => (
                <ScrollReveal key={c.titulo} delay={i * 0.05}>
                  <ControCard c={c} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
