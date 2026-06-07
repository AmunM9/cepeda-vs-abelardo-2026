"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useCandidate } from "./CandidateToggleContext";

type Veredicto = "falso" | "parcial" | "verdadero" | "no_verificable";

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
  no_verificable: {
    bg: "rgba(156,163,175,0.08)",
    border: "rgba(156,163,175,0.25)",
    color: "#9CA3AF",
    label: "NO VERIFICABLE",
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
  {
    mito: "«Cepeda pidió respetar a las FARC por reclutar 18.677 niños»",
    veredicto: "falso",
    etiqueta: "FALSO",
    explicacion:
      "El video que circuló fue editado para sacar de contexto una intervención de Cepeda en el Senado. En la sesión completa, Cepeda citaba el informe de la Comisión de la Verdad que documentó el reclutamiento de 18.677 menores por parte de las FARC como un crimen de guerra, y exigía que los responsables fueran procesados por la JEP. La frase fue recortada para invertir su sentido original. ColombiaCheck verificó el video completo de la sesión plenaria.",
    fuentes: [
      {
        label: "ColombiaCheck",
        href: "https://colombiacheck.com/investigaciones/340-anuncios-pagados-en-meta-amplificaron-narrativas-para-asociar-ivan-cepeda-con",
      },
      {
        label: "Comisión de la Verdad — Informe Final",
        href: "https://www.comisiondelaverdad.co/hay-futuro-si-hay-verdad",
      },
    ],
  },
  {
    mito: "«Cepeda aparece en fotos junto a guerrilleros»",
    veredicto: "falso",
    etiqueta: "FALSO en montajes · FUERA DE CONTEXTO en fotos reales",
    explicacion:
      "ColombiaCheck verificó al menos 6 piezas distintas: uniformes de las FARC superpuestos con IA, foto junto a Márquez rearmado (el logo aparece distorsionado como «CAT»), foto como el inexistente comandante «Jabón», foto tomando vino con alias «Mordisco». Todos son montajes. La única foto auténtica lo muestra con exintegrantes de las FARC y el ELN en mayo de 2017, durante los diálogos de paz, cuando esas personas eran negociadores legales — no combatientes activos. Eso es lo que la viralización omite.",
    fuentes: [
      {
        label: "ColombiaCheck (foto proceso de paz)",
        href: "https://colombiacheck.com/chequeos/foto-de-proceso-de-paz-se-usa-para-impulsar-la-narrativa-que-vincula-ivan-cepeda-con-las",
      },
      {
        label: "ColombiaCheck (montaje Márquez)",
        href: "https://colombiacheck.com/chequeos/peticion-de-investigar-cepeda-por-farc-politica-usa-montaje-que-lo-junta-con-ivan-marquez",
      },
      {
        label: "ColombiaCheck (montaje Mordisco)",
        href: "https://colombiacheck.com/chequeos/montaje-con-ia-de-cepeda-y-quilcue-tomando-vino-con-mordisco-refuerza-narrativa",
      },
    ],
  },
  {
    mito: "«Cepeda perdió 1,4 millones de seguidores en Instagram porque eran bots»",
    veredicto: "falso",
    etiqueta: "FALSO",
    explicacion:
      "El historial de seguidores del candidato desmiente la afirmación dato por dato. No existe confirmación de que Instagram ejecutara una limpieza masiva ese día. Radio Nacional documentó que la imagen fue construida aprovechando una limpieza periódica normal de cuentas inactivas que hacen todas las plataformas, fabricando sobre ella una afirmación específica y falsa. Fue amplificada simultáneamente desde múltiples cuentas coordinadas.",
    fuentes: [
      {
        label: "Radio Nacional de Colombia / RTVC",
        href: "https://www.radionacional.co/actualidad/politica/falsa-caida-de-seguidores-de-ivan-cepeda-es-desinformacion",
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
    mito: "«La Registraduría invalidó el 62% de las firmas de De la Espriella»",
    veredicto: "verdadero",
    etiqueta: "VERDADERO — pero superó el umbral legal con margen",
    explicacion:
      "Los datos del documento interno de la Registraduría «Investigación 44» establecen: de 5.079.000 registros entregados, solo 1.978.108 fueron válidos (38,9%). Las 3.100.892 restantes se rechazaron por: datos que no existen en bases oficiales (1.437.677), datos no encontrados en el Archivo Nacional de Identificación (1.025.663), registros duplicados (273.211) y datos ilegibles (152.028). El umbral legal exigido era 635.216 firmas válidas — De la Espriella lo triplicó. La Registraduría aclaró que en su caso solo encontró incidencias administrativas, no indicios de fraude — estos sí fueron hallados en dos candidatos distintos, contra quienes presentó denuncia penal. Los datos no fueron publicados oficialmente; los reveló la periodista Cecilia Orozco Tascón a través de una fuente interna.",
    fuentes: [
      {
        label: "Infobae Colombia (Investigación 44)",
        href: "https://www.infobae.com/colombia/2026/02/11/registraduria-se-pronuncio-sobre-hallazgos-en-las-firmas-de-abelardo-de-la-espriella-y-otros-candidatos-confirmo-denuncia-ante-la-fiscalia/",
      },
      {
        label: "El Colombiano (Registraduría descarta fraude)",
        href: "https://www.elcolombiano.com/especiales/elecciones-2026/polemica-firmas-abelardo-de-la-espriella-responde-registraduria-AD33477412",
      },
      {
        label: "La Silla Vacía — Detector de Mentiras",
        href: "https://www.lasillavacia.com/detector-de-mentiras/falso/cne-no-nego-la-candidatura-de-de-la-espriella-su-movimiento-ya-fue-avalado/",
      },
    ],
  },
  {
    mito: "«De la Espriella fue abogado de Alex Saab y de David Murcia Guzmán»",
    veredicto: "verdadero",
    etiqueta: "VERDADERO",
    explicacion:
      "De la Espriella representó legalmente a Alex Saab en Colombia en 2020, cuando buscó frenar su extradición a Estados Unidos, y también fue abogado de David Murcia Guzmán (creador de la pirámide DMG) en 2008. Ambos vínculos están documentados en expedientes judiciales y fueron confirmados por el propio De la Espriella en entrevistas. La Silla Vacía y El Espectador lo reportaron ampliamente. De la Espriella ha argumentado que ejerció su derecho profesional como abogado.",
    fuentes: [
      {
        label: "La Silla Vacía",
        href: "https://www.lasillavacia.com/silla-nacional/la-cronologia-que-no-cuadra-en-la-relacion-de-saab-y-de-la-espriella/",
      },
      {
        label: "El Espectador",
        href: "https://www.lasillavacia.com/en-vivo/de-saab-a-parapoliticos-el-prontuario-de-exclientes-de-abelardo-de-la-espriella/",
      },
    ],
  },
  {
    mito: "«De la Espriella instó a una periodista a opinar sobre sus genitales en directo»",
    veredicto: "verdadero",
    etiqueta: "VERDADERO",
    explicacion:
      "En una entrevista en vivo en Blu Radio en 2019, De la Espriella le dijo a la periodista Camila Zuluaga: «Usted nunca ha opinado sobre mis genitales y me encantaría que lo hiciera». El audio completo fue emitido en directo y está archivado. La FLIP (Fundación para la Libertad de Prensa) condenó el comentario como acoso verbal contra una periodista en ejercicio. De la Espriella posteriormente minimizó el incidente calificándolo de «humor».",
    fuentes: [
      {
        label: "Blu Radio (audio original)",
        href: "https://www.portafolio.co/economia/gobierno/juez-ordena-a-abelardo-de-la-espriella-disculparse-con-periodista-laura-rodriguez-495351",
      },
      {
        label: "FLIP — Fundación para la Libertad de Prensa",
        href: "https://flip.org.co/pronunciamientos/la-flip-rechaza-el-doxing-de-abelardo-de-la-espriella-en-contra-del-periodista-camilo-poveda",
      },
    ],
  },
  {
    mito: "«De la Espriella quemaba gatos con pólvora de niño»",
    veredicto: "no_verificable",
    etiqueta: "NO VERIFICABLE",
    explicacion:
      "Esta afirmación proviene de una entrevista de 2017 en la que el propio De la Espriella narró anécdotas de su infancia en Cartagena. Algunos usuarios compartieron fragmentos de audio donde supuestamente lo dice, pero el audio completo de la entrevista original no está disponible públicamente para verificación independiente. No hay testigos adicionales citados ni registros documentales que confirmen o desmientan la anécdota. Al tratarse de un relato autobiográfico sin corroboración externa posible, no puede ser verificado como verdadero ni como falso.",
    fuentes: [
      {
        label: "La W Radio (fragmento de entrevista)",
        href: "https://www.infobae.com/colombia/2026/05/27/matador-desempolvo-entrevista-donde-abelardo-de-la-espriella-contaba-que-quemaba-gatos-cuando-era-nino-se-rie-contando-que-hizo-sufrir-a-un-animal/",
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
