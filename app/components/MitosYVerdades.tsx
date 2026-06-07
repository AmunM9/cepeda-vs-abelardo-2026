"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useCandidate } from "./CandidateToggleContext";

type Veredicto = "falso" | "parcial" | "verdadero";

interface Mito {
  mito: string;
  veredicto: Veredicto;
  etiqueta: string;
  explicacion: string;
  fuentes: { label: string; href: string }[];
}

const VEREDICTO_STYLES: Record<Veredicto, { bg: string; border: string; color: string; label: string }> = {
  falso: {
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.25)",
    color: "#4ADE80",
    label: "FALSO",
  },
  parcial: {
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    color: "#FBBF24",
    label: "PARCIALMENTE VERDADERO",
  },
  verdadero: {
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    color: "#60A5FA",
    label: "VERDADERO",
  },
};

const MITOS_CEPEDA: Mito[] = [
  {
    mito: "«Iván Cepeda dijo que nadie debería ser dueño de más de una casa»",
    veredicto: "falso",
    etiqueta: "FALSO",
    explicacion:
      "El Tiempo verificó la frase viral revisando 64 discursos, entrevistas y el programa de gobierno de 433 páginas del candidato. La frase no aparece en ninguno de esos documentos. La campaña de Cepeda también la desmintió explícitamente. La frase circuló en redes acompañada de fragmentos reales de entrevistas para darle credibilidad, pero en esos fragmentos tampoco aparece.",
    fuentes: [
      {
        label: "El Tiempo / El Filtro",
        href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/elfiltro-es-falso-que-ivan-cepeda-haya-dicho-que-nadie-deberia-ser-dueno-de-mas-de-una-casa-frase-no-figura-en-discursos-programa-o-entrevistas-3562478",
      },
    ],
  },
  {
    mito: "«Cepeda dijo que en su gobierno la riqueza será distribuida y administrada por el Estado»",
    veredicto: "falso",
    etiqueta: "FALSO — montaje",
    explicacion:
      "ColombiaCheck verificó que la frase fue publicada en una imagen que suplantaba el formato visual de Noticias Caracol. La frase nunca fue pronunciada por Cepeda; no aparece en la entrevista completa de más de 40 minutos que dio ese día al noticiero. Noticias Caracol nunca publicó esa pieza. El montaje alcanzó más de 27.000 visualizaciones antes de ser desmontado.",
    fuentes: [
      {
        label: "Radio Nacional / ColombiaCheck",
        href: "https://www.rtvcnoticias.com/fact-checking/asi-funciona-maquinaria-desinformacion-ivan-cepeda",
      },
      {
        label: "ColombiaCheck",
        href: "https://colombiacheck.com",
      },
    ],
  },
  {
    mito: "«Una encuesta del CNC mostraba a Cepeda ganando la primera vuelta con 53%»",
    veredicto: "falso",
    etiqueta: "FALSO — imagen generada con IA",
    explicacion:
      "El Colombiano y El Tiempo verificaron que la imagen viral fue generada con inteligencia artificial y alteraba los datos reales del CNC. La herramienta SynthID de Google detectó la marca de agua de contenido sintético. La encuesta real del CNC no tenía esos porcentajes. El mismo diseño circuló con diferentes números atribuidos a distintos medios (NTN24, CNC).",
    fuentes: [
      {
        label: "El Colombiano",
        href: "https://www.elcolombiano.com/especiales/elecciones-2026/encuesta-ivan-cepeda-ganador-primera-vuelta-inteligencia-artificial-DC36432203",
      },
      {
        label: "El Tiempo / El Filtro",
        href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/elfiltro-sondeo-en-el-que-ivan-cepeda-ganaria-en-primera-vuelta-la-presidencia-de-colombia-fue-hecho-con-ia-3554932",
      },
    ],
  },
  {
    mito: "«Cepeda es hijo de un guerrillero de las FARC»",
    veredicto: "falso",
    etiqueta: "FALSO",
    explicacion:
      "Su padre, Manuel Cepeda Vargas, fue senador de la República por la Unión Patriótica, un partido político legal que surgió de acuerdos de paz entre el gobierno Betancur y las FARC en 1985. Fue asesinado el 9 de agosto de 1994. La Corte Interamericana de Derechos Humanos condenó al Estado colombiano por ese crimen. La Unión Patriótica era un partido legal con participación electoral reconocida; sus miembros no eran guerrilleros.",
    fuentes: [
      {
        label: "Wikipedia ES",
        href: "https://es.wikipedia.org/wiki/Iv%C3%A1n_Cepeda",
      },
      {
        label: "Corte IDH, caso Cepeda Vargas vs. Colombia",
        href: "https://www.corteidh.or.cr/docs/casos/articulos/seriec_213_esp.pdf",
      },
    ],
  },
];

const MITOS_ESPRIELLA: Mito[] = [
  {
    mito: "«Un video viral muestra a De la Espriella golpeando a su pareja mientras dormía»",
    veredicto: "falso",
    etiqueta: "FALSO",
    explicacion:
      "El Tiempo y AFP verificaron mediante búsqueda inversa de imágenes que el video no muestra a De la Espriella. La grabación corresponde a un caso de violencia doméstica en México: la víctima se llama Paula Fajardo y el agresor fue identificado por ella misma como Jorge Francisco Rabadán Torres. El video existía en Instagram desde antes de ser atribuido falsamente al candidato colombiano.",
    fuentes: [
      {
        label: "El Tiempo / El Filtro + AFP",
        href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/elfiltro-candidato-abelardo-de-la-espriella-no-aparece-en-video-golpeando-a-su-pareja-grabacion-corresponde-a-una-denuncia-de-una-mujer-en-mexico-3562546",
      },
    ],
  },
  {
    mito: "«Hubo fraude masivo en la primera vuelta para darle el primer lugar a De la Espriella»",
    veredicto: "falso",
    etiqueta: "FALSO — según todos los organismos verificadores",
    explicacion:
      "El presidente Petro denunció presuntas irregularidades con el software de escrutinio. El Tiempo y AFP verificaron que los videos de «tarjetones marcados» que circularon como prueba correspondían a elecciones locales en Fonseca, La Guajira (3 de mayo), no a las presidenciales. Los tachones en actas de preconteo son correcciones normales que también sumaban votos a Cepeda. El propio Cepeda descartó el fraude el 1 de junio. Los observadores de la MOE y organismos internacionales no reportaron irregularidades determinantes. La participación del 57,88% fue la más alta en una primera vuelta desde la Constitución de 1991.",
    fuentes: [
      {
        label: "El Tiempo / El Filtro",
        href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/elfiltro-tachones-en-actas-electorales-de-preconteo-no-prueban-fraude-en-la-primera-vuelta-presidencial-de-colombia-3561286",
      },
      {
        label: "CNN en Español",
        href: "https://cnnespanol.cnn.com/2026/06/02/colombia/petro-denuncia-fraude-observadores-orix",
      },
      {
        label: "El Tiempo (tarjetones)",
        href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/elfiltro-video-sobre-supuestos-tarjetones-marcados-a-favor-de-abelardo-de-la-espriella-y-paloma-valencia-no-corresponde-a-elecciones-presidenciales-3559703",
      },
    ],
  },
  {
    mito: "«De la Espriella propone cerrar o privatizar todas las entidades sociales del Estado»",
    veredicto: "falso",
    etiqueta: "FALSO — imagen manipulada",
    explicacion:
      "El Tiempo verificó que circuló una imagen falsa que suplantaba el estilo visual de ese medio con una supuesta propuesta de De la Espriella sobre entidades sociales. La publicación real de El Tiempo de esa fecha tenía una fotografía similar del candidato pero su titular era diferente: informaba que De la Espriella prometía llevar a la Lista Clinton a quienes compraran votos. Hacer una búsqueda inversa de la imagen lo confirma.",
    fuentes: [
      {
        label: "El Tiempo / El Filtro",
        href: "https://www.eltiempo.com/amp/politica/elecciones-colombia-2026/elfiltro-circula-imagen-falsa-con-estilos-de-el-tiempo-que-difunde-una-supuesta-propuesta-de-abelardo-de-la-espriella-sobre-entidades-sociales-3562270",
      },
    ],
  },
  {
    mito: "«Sofía Petro vaticinó un “estallido social” si gana De la Espriella»",
    veredicto: "falso",
    etiqueta: "FALSO",
    explicacion:
      "El Tiempo verificó mediante análisis con OpenAI que la imagen que circuló con ese titular era falsa y usaba el logo del medio sin autorización. No existe registro de que ninguna persona de apellido Petro haya emitido esa declaración en ningún canal verificable.",
    fuentes: [
      {
        label: "El Tiempo / El Filtro",
        href: "https://www.eltiempo.com/amp/politica/elecciones-colombia-2026/elfiltro-el-tiempo-no-publico-que-sofia-petro-vaticino-estallido-social-si-gana-abelardo-de-la-espriella-en-elecciones-2026-es-una-imagen-falsa-3559591",
      },
    ],
  },
];

function MitoCard({ mito }: { mito: Mito }) {
  const style = VEREDICTO_STYLES[mito.veredicto];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p
        className="text-base md:text-lg font-semibold leading-snug mb-4"
        style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {mito.mito}
      </p>

      <span
        className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4"
        style={{
          background: style.bg,
          color: style.color,
          border: `1px solid ${style.border}`,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {mito.etiqueta}
      </span>

      <p
        className="text-sm leading-relaxed flex-1 mb-5"
        style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {mito.explicacion}
      </p>

      <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {mito.fuentes.map((f) => (
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
    </motion.div>
  );
}

const TABS = [
  { id: "cepeda", label: "Iván Cepeda" },
  { id: "espriella", label: "Abelardo de la Espriella" },
] as const;

export default function MitosYVerdades() {
  const { active: activeTab, set: setActiveTab } = useCandidate();

  return (
    <section
      id="mitos"
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-muted)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Sección 4
            </span>
            <h2
              className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              Verificación de hechos
            </h2>
            <p
              className="mt-3 text-base md:text-lg max-w-3xl mx-auto"
              style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Mitos virales verificados por plataformas de fact-checking reconocidas
            </p>
          </div>
        </ScrollReveal>


        {/* Desktop: row-by-row paired 1:1 */}
        <div className="hidden md:block mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#8B5CF6" }} />
              <h3 className="text-lg font-bold uppercase tracking-wider" style={{ color: "#C084FC", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Mitos sobre Iván Cepeda
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#D4AF37" }} />
              <h3 className="text-lg font-bold uppercase tracking-wider" style={{ color: "#FDE68A", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Mitos sobre Abelardo de la Espriella
              </h3>
            </div>
          </div>
          <div className="space-y-6">
            {Array.from({ length: Math.max(MITOS_CEPEDA.length, MITOS_ESPRIELLA.length) }).map((_, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                  <div>{MITOS_CEPEDA[i] && <MitoCard mito={MITOS_CEPEDA[i]} />}</div>
                  <div>{MITOS_ESPRIELLA[i] && <MitoCard mito={MITOS_ESPRIELLA[i]} />}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: show selected candidate via global toggle */}
        <div className="md:hidden mb-12">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            {(activeTab === "cepeda" ? MITOS_CEPEDA : MITOS_ESPRIELLA).map((m) => (
              <MitoCard key={m.mito} mito={m} />
            ))}
          </motion.div>
        </div>

        {/* Info block */}
        <ScrollReveal>
          <div
            className="rounded-xl p-6 max-w-5xl mx-auto text-sm leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <p className="mb-3">
              En este ciclo electoral, La Silla Vacía documentó más de 43 afirmaciones
              falsas verificadas sobre Iván Cepeda desde agosto de 2025, y la Misión de
              Observación Electoral reportó al menos 150 campañas de desinformación
              activas. Las imágenes falsas con estilos de medios reconocidos fueron el
              formato más usado contra ambos candidatos.
            </p>
            <a
              href="https://www.rtvcnoticias.com/fact-checking/asi-funciona-maquinaria-desinformacion-ivan-cepeda"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Radio Nacional de Colombia ↗
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
