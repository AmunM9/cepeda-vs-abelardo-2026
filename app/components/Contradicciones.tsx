"use client";

import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useCandidate } from "./CandidateToggleContext";

interface Contradiccion {
  candidato: "cepeda" | "espriella";
  titulo: string;
  antes: string;
  antesAno: string;
  ahora: string;
  ahoraAno: string;
  nota?: string;
  fuentes: { label: string; href: string }[];
}

const CONTRADICCIONES: Contradiccion[] = [
  {
    candidato: "espriella",
    titulo: "Legalizar el 10% del dinero del narco",
    antesAno: "nov 2025",
    antes: "Primera propuesta de campaña: legalizar el 10% de los capitales ilegales del narcotráfico a cambio de 3 años de cárcel y no extradición. «Le vamos a legalizar el diez por ciento; usted entrega el noventa por ciento de su patrimonio.»",
    ahoraAno: "jun 2026",
    ahora: "La propuesta desapareció del programa oficial de segunda vuelta. Su discurso actual: «cero negociaciones con criminales», destruir 330.000 hectáreas de coca y extradición masiva.",
    fuentes: [
      { label: "Infobae Colombia", href: "https://www.infobae.com/colombia/2025/11/11/daniel-quintero-reacciono-a-la-primer-propuesta-de-abelardo-de-la-espriella-como-presidencial-lo-que-tenemos-aqui-es-un-bandido/" },
      { label: "El Tiempo", href: "https://www.eltiempo.com/politica/partidos-politicos/luis-carlos-reyes-mr-taxes-critico-una-propuestas-de-abelardo-de-la-espriella-3508506" },
      { label: "Colombia.com", href: "https://www.colombia.com/actualidad/politica/abelardo-de-la-espriella-propone-legalizar-el-10-de-capitales-ilegales-y-desata-debate-nacional-550884" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Paz con las FARC",
    antesAno: "2012",
    antes: "«Yo sería partidario de que el señor Timochenko no pagara un día de cárcel.» Apoyó el proceso de paz y la participación política de los jefes guerrilleros.",
    ahoraAno: "2026",
    ahora: "«La paz no se negocia, se impone.» Dice que los procesos de paz «no han servido». Propone eliminación de la JEP.",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
      { label: "CNN en Español", href: "https://cnnespanol.cnn.com/2026/05/28/colombia/quien-es-abelardo-espriella-candidato-orix" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Fe religiosa",
    antesAno: "Anterior",
    antes: "«Absolutamente niego la presencia de Dios. No creo en nada que la razón no pueda explicar.» Se declaraba ateo en entrevista con Patricia Pardo.",
    ahoraAno: "2026",
    ahora: "Recita el Padre Nuestro en latín en actos de campaña. Su web dice «la defensa de la causa cristiana es una prioridad». Explica que «se encontró con Dios» durante la enfermedad de su padre en la pandemia.",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
      { label: "CNN en Español", href: "https://cnnespanol.cnn.com/2026/05/28/colombia/quien-es-abelardo-espriella-candidato-orix" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Sobre Gustavo Petro",
    antesAno: "Alcaldía de Bogotá",
    antes: "«Si algo se ha caracterizado Gustavo Petro es por ser un hombre honesto, que ha desenmascarado y perseguido a las mafias del Distrito.» (Siendo abogado del concuñado de Petro.)",
    ahoraAno: "2026",
    ahora: "«Petro es el fondo de la basura.»",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "JEP (Jurisdicción Especial para la Paz)",
    antesAno: "2025–2026",
    antes: "«Si pudiera, en el marco de la Constitución, acabar con ese bodrio, lo voy a hacer.» Prometía eliminar la JEP.",
    ahoraAno: "jun 2026",
    ahora: "Esta propuesta ya no aparece en su programa oficial de tres páginas. Ha dejado de mencionarla activamente.",
    nota: "Eliminar la JEP es constitucionalmente inviable sin reforma al bloque de constitucionalidad y violaría compromisos internacionales de Colombia.",
    fuentes: [
      { label: "Cambio Colombia", href: "https://cambiocolombia.com/poder/articulo/2026/6/el-debate-sobre-las-posturas-antiderechos-de-abelardo-de-la-espriella" },
      { label: "El Espectador", href: "https://www.elespectador.com/colombia-20/analistas/abelardo-de-la-espriella-y-la-paz-columna-de-fabiola-calvo/" },
    ],
  },
  {
    candidato: "espriella",
    titulo: "Antiuribismo",
    antesAno: "2010–2012",
    antes: "Se intentó vender como «neoantiuribista». Criticó el modelo político de Uribe.",
    ahoraAno: "2026",
    ahora: "Campaña con apoyo implícito del electorado uribista y Cambio Radical. Su discurso de «mano dura» y «no hay proceso de paz» coincide con posiciones del Centro Democrático.",
    fuentes: [
      { label: "PARES", href: "https://www.pares.com.co/los-pecados-de-abelardo-de-la-espriella-podrian-dar-al-traste-con-su-candidatura/" },
      { label: "El Colombiano", href: "https://www.elcolombiano.com/inicio/perfil-de-abelardo-de-la-espriella-candidato-presidencia-colombia-GH36646145" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "El CNE y su propuesta de eliminarlo",
    antesAno: "Contexto",
    antes: "El CNE le impidió participar en la consulta del 8 de marzo de 2026 por haber ya participado en la del Pacto Histórico (oct. 2025), violando la regla de no participar en dos consultas interpartidistas.",
    ahoraAno: "2026",
    ahora: "Propone eliminar el CNE por ser una institución donde «se conspira». La Silla Vacía y El Espectador señalaron que la propuesta surgió después de que el CNE le aplicara la norma en su contra.",
    fuentes: [
      { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-del-programa-de-ivan-cepeda/" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "La camiseta de la Selección Colombia",
    antesAno: "8 mar 2026",
    antes: "Dirigentes del Pacto Histórico (María José Pizarro, Camilo Romero) promovieron activamente el uso de la camiseta de Colombia para apoyar al Pacto en las elecciones parlamentarias. Hay videos documentados.",
    ahoraAno: "1 jun 2026",
    ahora: "Cepeda criticó públicamente a De la Espriella por usar la camiseta como símbolo político en la primera vuelta, calificándolo de aprovechamiento indebido.",
    fuentes: [
      { label: "El Colombiano (fact-check)", href: "https://www.elcolombiano.com/especiales/elecciones-2026" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Mención en archivos FARC — defensa que no se sostuvo",
    antesAno: "Durante campaña",
    antes: "Afirmó que su aparición en el computador de alias Raúl Reyes (incautado en 2008) fue resultado de una operación del DAS para alterar esos archivos.",
    ahoraAno: "feb 2026",
    ahora: "La Silla Vacía y ColombiaCheck accedieron a los archivos originales y encontraron que no existe indicio de dicha operación. Cepeda tuvo que retractarse parcialmente: «Creo que hubo un malentendido» y «Es posible que yo me haya equivocado».",
    nota: "Aclaración: los archivos fueron declarados inválidos por la Corte Suprema de Justicia. Esto no confirma vínculos con las FARC, pero su defensa pública inicial no se sostuvo.",
    fuentes: [
      { label: "ColombiaCheck", href: "https://colombiacheck.com/investigaciones/mencion-de-ivan-cepeda-en-computador-de-las-farc-no-fue-un-montaje" },
      { label: "Wikipedia ES", href: "https://es.wikipedia.org/wiki/Iv%C3%A1n_Cepeda" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Transparencia sobre salud",
    antesAno: "Campaña",
    antes: "La «revolución ética» y la transparencia son el pilar central de su campaña presidencial.",
    ahoraAno: "mar–may 2026",
    ahora: "Diagnosticado con cáncer de colon (2018) y lesión hepática tratada (2021–2022). La Silla Vacía solicitó en múltiples ocasiones información médica verificable a la campaña y no obtuvo respuesta.",
    fuentes: [
      { label: "El Colombiano", href: "https://www.elcolombiano.com/especiales/elecciones-2026/salud-ivan-cepeda-debate-transparencia-examenes-medicos-EE36545537" },
      { label: "La Silla Vacía", href: "https://www.lasillavacia.com/ivan-cepeda/" },
    ],
  },
  {
    candidato: "cepeda",
    titulo: "Cero debates",
    antesAno: "Narrativa de campaña",
    antes: "Candidato del pueblo, de la plaza pública, de la democracia participativa. Candidato que predica apertura.",
    ahoraAno: "Toda la campaña",
    ahora: "Fue el único candidato de las principales fuerzas que no participó en ningún debate presidencial televisado, a pesar de ser el favorito en encuestas durante meses.",
    fuentes: [
      { label: "CNN en Español", href: "https://cnnespanol.cnn.com/2026/05/27/colombia/quien-es-ivan-cepeda-petro-elecciones-orix" },
      { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/en-la-campana-de-cepeda-crecen-los-nervios-por-el-remate-de-de-la-espriella/" },
    ],
  },
];

function ContraCard({ c }: { c: Contradiccion }) {
  const isCep = c.candidato === "cepeda";
  const color = isCep ? "#8B5CF6" : "#D4AF37";
  const colorLight = isCep ? "#C084FC" : "#FDE68A";
  const name = isCep ? "Iván Cepeda" : "Abelardo de la Espriella";

  return (
    <div
      className="rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${isCep ? "rgba(139,92,246,0.15)" : "rgba(212,175,55,0.15)"}`,
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: isCep ? "rgba(91,45,142,0.08)" : "rgba(15,29,61,0.3)" }}
      >
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color, fontFamily: "'DM Sans', sans-serif" }}
        >
          {name}
        </span>
        <span className="font-barlow-cond font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
          {c.titulo}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start flex-1">
        {/* ANTES */}
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
            Antes · {c.antesAno}
          </div>
          <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
            {c.antes}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center py-4 md:py-0">
          <ArrowRight size={20} style={{ color: "var(--text-muted)" }} />
        </div>

        {/* AHORA */}
        <div
          className="rounded-xl p-4"
          style={{ background: isCep ? "rgba(91,45,142,0.1)" : "rgba(212,175,55,0.07)", border: `1px solid ${isCep ? "rgba(139,92,246,0.2)" : "rgba(212,175,55,0.2)"}` }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: colorLight, fontFamily: "'DM Sans', sans-serif" }}>
            Ahora · {c.ahoraAno}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
            {c.ahora}
          </p>
        </div>
      </div>

      {/* Note */}
      {c.nota && (
        <div
          className="mx-5 mb-4 rounded-lg px-4 py-2.5 text-xs"
          style={{
            background: "rgba(251,191,36,0.07)",
            border: "1px solid rgba(251,191,36,0.15)",
            color: "var(--text-secondary)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <strong style={{ color: "#FBBF24" }}>Nota: </strong>
          {c.nota}
        </div>
      )}

      {/* Sources */}
      <div className="px-5 pb-4 flex flex-wrap gap-3">
        {c.fuentes.map((f) => (
          <a key={f.href} href={f.href} target="_blank" rel="noopener noreferrer" className="source-link">
            {f.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Contradicciones() {
  const cepedaContra = CONTRADICCIONES.filter((c) => c.candidato === "cepeda");
  const espriellaContra = CONTRADICCIONES.filter((c) => c.candidato === "espriella");
  const rowCount = Math.max(cepedaContra.length, espriellaContra.length);
  const { active } = useCandidate();
  const isCepeda = active === "cepeda";

  return (
    <section
      id="contradicciones"
      className="section-pad mesh-neutral"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 5
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Contradicciones documentadas
            </h2>
            <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              Declaraciones públicas anteriores vs. posición actual. Cada card incluye fecha y fuente de ambas afirmaciones.
            </p>
          </div>
        </ScrollReveal>

        {/* Column headers — desktop */}
        <ScrollReveal delay={0.05}>
          <div className="hidden md:grid md:grid-cols-2 gap-6 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: "#8B5CF6" }} />
              <h3 className="font-barlow-cond font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C084FC" }}>
                Iván Cepeda
              </h3>
              <div className="flex-1 h-px" style={{ background: "rgba(139,92,246,0.2)" }} />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: "#D4AF37" }} />
              <h3 className="font-barlow-cond font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#D4AF37" }}>
                Abelardo de la Espriella
              </h3>
              <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.2)" }} />
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop: Paired rows — one Cepeda + one Espriella per row */}
        <div className="hidden md:block space-y-6">
          {Array.from({ length: rowCount }).map((_, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                <div>
                  {cepedaContra[i] && <ContraCard c={cepedaContra[i]} />}
                </div>
                <div>
                  {espriellaContra[i] && <ContraCard c={espriellaContra[i]} />}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: show only selected candidate's cards */}
        <div className="md:hidden space-y-4">
          {(isCepeda ? cepedaContra : espriellaContra).map((c, i) => (
            <ScrollReveal key={c.titulo} delay={i * 0.05}>
              <ContraCard c={c} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
