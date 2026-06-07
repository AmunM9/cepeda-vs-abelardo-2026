"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useCandidate } from "./CandidateToggleContext";

interface CandidateBlock {
  text: string;
  viabilidad: string;
  sources: { label: string; href: string }[];
}

interface TopicData {
  id: string;
  label: string;
  icon: string;
  cepeda: CandidateBlock;
  espriella: CandidateBlock;
}

const TOPICS: TopicData[] = [
  {
    id: "economia",
    label: "Economía",
    icon: "📈",
    cepeda: {
      text: "Modelo de «capitalismo productivo» centrado en la economía campesina y popular. Reforma tributaria progresiva gravando grandes fortunas; crear el Banco del Pueblo para democratizar el crédito y erradicar la pobreza monetaria (17 millones de colombianos). Proteger el «salario vital» (tras el aumento del 23% de Petro). Ampliar Colombia Mayor de 3 a 5 millones de beneficiados. Extender Renta Joven y Renta Ciudadana. Reducir exenciones tributarias a grandes empresas. «Austeridad republicana»: reducir salarios presidenciales y privilegios sin tocar servicios sociales. No incluye meta cuantificada de déficit fiscal.",
      viabilidad: "El costo de expandir Colombia Mayor a 5M de beneficiarios supera los 8 billones anuales, en tesorería en mínimos históricos. Su programa carece de metas cuantificadas de recaudo e impacto fiscal. Colombia recibirá al próximo presidente con un déficit fiscal del 5,6–6,4% del PIB, regla fiscal suspendida y calificación crediticia BB-. ANIF estima que se necesita un ajuste de 3–4 puntos del PIB.",
      sources: [
        { label: "El Colombiano (5 jun 2026)", href: "https://www.elcolombiano.com/negocios/propuestas-economicas-cepeda-abelardo-segunda-vuelta-presidencia-DH37213734" },
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-del-programa-de-ivan-cepeda/" },
        { label: "Infobae Colombia (ANIF)", href: "https://www.infobae.com/colombia/2026/06/02/crisis-fiscal-marcara-el-debate-entre-abelardo-de-la-espriella-e-ivan-cepeda-en-la-segunda-vuelta-estas-son-sus-propuestas-economicas/" },
      ],
    },
    espriella: {
      text: "«Economía libertaria» con declaratoria de emergencia económica en los primeros días. Reducir el Estado en 40% del gasto (ahorro proyectado: $31,8 billones/año, 3,1% del PIB) mediante eliminación de nómina politiquera, fusión de agencias y despido de ~700.000 funcionarios y contratistas. Reducir o eliminar el 4×1000. Zonas económicas especiales con exenciones tributarias. Retomar contratos de exploración de hidrocarburos. Contratación pública por blockchain a 2030. Meta de crecimiento del PIB por encima del 3% anual.",
      viabilidad: "El 40% de recorte choca con que la mayoría del 1,4M de servidores públicos son policías, militares y maestros con protección constitucional. El economista Jhon Torres señala que «la viabilidad del ajuste de $70 billones sin reforma tributaria compensatoria genera muchas dudas; si el recaudo cae y el gasto no se recorta en la magnitud prometida, el déficit podría empeorar antes de mejorar.»",
      sources: [
        { label: "El Colombiano (5 jun 2026)", href: "https://www.elcolombiano.com/negocios/propuestas-economicas-cepeda-abelardo-segunda-vuelta-presidencia-DH37213734" },
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-de-abelardo-de-la-espriella/" },
        { label: "Infobae Colombia (ANIF)", href: "https://www.infobae.com/colombia/2026/06/02/crisis-fiscal-marcara-el-debate-entre-abelardo-de-la-espriella-e-ivan-cepeda-en-la-segunda-vuelta-estas-son-sus-propuestas-economicas/" },
        { label: "PARES", href: "https://www.pares.com.co/la-segunda-vuelta-y-la-viabilidad-de-las-propuestas/" },
      ],
    },
  },
  {
    id: "seguridad",
    label: "Seguridad y paz",
    icon: "🛡",
    cepeda: {
      text: "«Seguridad humana» que ataca causas estructurales. Ofensiva tecnológica contra extorsión y secuestro. Atacar grandes estructuras del narcotráfico en lugar de eslabones débiles (campesinos y mulas). Programas de sustitución de economías ilícitas. Protección efectiva de líderes sociales (Colombia: récord mundial de líderes asesinados). Mantener diálogos de paz con ajustes: condición de que los grupos no asesinen líderes mientras negocian. Fortalecer presencia del Estado en territorios abandonados.",
      viabilidad: "El enfoque de seguridad humana tiene respaldo académico internacional pero resultados de largo plazo. Colombia históricamente no ha sostenido sustitución de cultivos sin inversión masiva simultánea.",
      sources: [
        { label: "Razón Pública", href: "https://razonpublica.com/elecciones-2026-analisis-comparativo-las-propuestas-los-candidatos-presidenciales/" },
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-del-programa-de-ivan-cepeda/" },
        { label: "PARES", href: "https://www.pares.com.co/la-segunda-vuelta-y-la-viabilidad-de-las-propuestas/" },
      ],
    },
    espriella: {
      text: "Plan de choque en 90 días para recuperar control territorial. Destruir 330.000 ha de coca con fumigación aérea y todas las herramientas legales. Extradición masiva y sin negociación de capos. 7 mega-cárceles de máxima seguridad (modelo Bukele). Bloque de búsqueda presidencial anticorrupción. «Bandido que no se someta a la justicia será dado de baja» dentro del marco constitucional. Plan Colombia II con EEUU.",
      viabilidad: "El modelo Bukele funcionó en El Salvador (21.000 km², una estructura criminal); Colombia tiene 1.141.000 km², 8+ grupos armados y geografía selvática. Razón Pública advierte que el militarismo puro puede atomizar grupos armados. Las 7 mega-cárceles requieren años y billones, colisionando con su meta de reducir el Estado.",
      sources: [
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-abelardo-de-la-espriella-este-es-su-plan-de-gobierno/" },
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-de-abelardo-de-la-espriella/" },
        { label: "El Espectador (Fabiola Calvo)", href: "https://www.elespectador.com/colombia-20/analistas/abelardo-de-la-espriella-y-la-paz-columna-de-fabiola-calvo/" },
      ],
    },
  },
  {
    id: "salud",
    label: "Salud",
    icon: "🏥",
    cepeda: {
      text: "Continuidad de la reforma de salud de Petro: eliminar la intermediación financiera de las EPS y avanzar hacia prestación directa del Estado. Reducir servicios represados (tutelas en máximos históricos). Garantizar acceso a medicamentos. Fortalecer la red hospitalaria pública. Énfasis en atención primaria territorial, especialmente en zonas rurales.",
      viabilidad: "Enfrenta el riesgo de una transición traumática: la liquidación de EPS sin una red pública lista puede colapsar la atención. ANIF subraya que el sistema tiene deudas crecientes de las EPS y aumento explosivo de tutelas, requiriendo acción urgente.",
      sources: [
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-ivan-cepeda-este-es-su-plan-de-gobierno/" },
        { label: "Infobae Colombia (ANIF)", href: "https://www.infobae.com/colombia/2026/06/02/crisis-fiscal-marcara-el-debate-entre-abelardo-de-la-espriella-e-ivan-cepeda-en-la-segunda-vuelta-estas-son-sus-propuestas-economicas/" },
      ],
    },
    espriella: {
      text: "Opuesto a eliminar las EPS. Plan de choque de $10 billones para sanear financieramente el sistema. Auditoría trimestral de la ejecución de la UPC por parte de las EPS. Restablecer flujo de recursos para medicamentos y tratamientos interrumpidos. Retomar presupuestos máximos y control de precios en tecnologías médicas. Fijar topes a costos de administración de las EPS. En pensiones: fortalecer fondos privados y reducir protagonismo de Colpensiones.",
      viabilidad: "Enfrenta el reto de sanear entidades cuyas deudas superan los 10 billones de pesos con un plan de choque del mismo monto. La crisis del sistema requiere acción urgente independientemente del modelo elegido.",
      sources: [
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-abelardo-de-la-espriella-este-es-su-plan-de-gobierno/" },
        { label: "Infobae Colombia (ANIF)", href: "https://www.infobae.com/colombia/2026/06/02/crisis-fiscal-marcara-el-debate-entre-abelardo-de-la-espriella-e-ivan-cepeda-en-la-segunda-vuelta-estas-son-sus-propuestas-economicas/" },
        { label: "El Colombiano", href: "https://www.elcolombiano.com/negocios/propuestas-economicas-cepeda-abelardo-segunda-vuelta-presidencia-DH37213734" },
      ],
    },
  },
  {
    id: "educacion",
    label: "Educación",
    icon: "🎓",
    cepeda: {
      text: "Universalización de educación pública y gratuita en todos los niveles incluida la superior. Programa «Te pagamos por estudiar»: apoyos económicos directos para reducir deserción. Énfasis en comunidades indígenas, afrodescendientes y rurales (articulado con Aida Quilcué). Obligatoriedad de los informes de la Comisión de la Verdad en colegios y universidades.",
      viabilidad: "La gratuidad universal de educación superior requiere fuerte expansión de infraestructura y talento docente en regiones apartadas, en un contexto de restricciones fiscales severas.",
      sources: [
        { label: "El Colombiano", href: "https://www.elcolombiano.com/negocios/propuestas-economicas-cepeda-abelardo-segunda-vuelta-presidencia-DH37213734" },
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-ivan-cepeda-este-es-su-plan-de-gobierno/" },
        { label: "Cambio Colombia", href: "https://cambiocolombia.com/elecciones-2026-programa-ivan-cepeda-viabilidad" },
      ],
    },
    espriella: {
      text: "Ciclos cortos en tecnologías de cuarta revolución industrial (IA, computación cuántica, robótica), bilingüismo, servicios y economía del cuidado para formar jóvenes productivos rápidamente. Incentivos fiscales a la innovación en educación pública. Contratación pública por blockchain a 2030.",
      viabilidad: "Sus propuestas de formación técnica son de implementación más rápida y menor costo fiscal, pero no abordan el déficit estructural de calidad en educación básica y media.",
      sources: [
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-abelardo-de-la-espriella-este-es-su-plan-de-gobierno/" },
        { label: "El Colombiano", href: "https://www.elcolombiano.com/negocios/propuestas-economicas-cepeda-abelardo-segunda-vuelta-presidencia-DH37213734" },
      ],
    },
  },
  {
    id: "energia",
    label: "Energía y ambiente",
    icon: "🌱",
    cepeda: {
      text: "Prohibir el fracking y la exploración offshore de petróleo. Acelerar la transición energética hacia renovables. Proteger la Amazonía y los ecosistemas estratégicos como política de Estado. Sin nuevos contratos de exploración de hidrocarburos (continuidad con Petro).",
      viabilidad: "Acelerar la transición sin ingresos de reemplazo a corto plazo agrava el déficit fiscal. Colombia depende del petróleo para ~30% de sus exportaciones y una parte significativa del recaudo fiscal.",
      sources: [
        { label: "Razón Pública", href: "https://razonpublica.com/elecciones-2026-analisis-comparativo-las-propuestas-los-candidatos-presidenciales/" },
        { label: "Infobae Colombia (ANIF)", href: "https://www.infobae.com/colombia/2026/06/02/crisis-fiscal-marcara-el-debate-entre-abelardo-de-la-espriella-e-ivan-cepeda-en-la-segunda-vuelta-estas-son-sus-propuestas-economicas/" },
      ],
    },
    espriella: {
      text: "Retomar nuevos contratos de exploración y explotación de hidrocarburos suspendidos por Petro. Reactivar el sector petrolero como motor económico a corto plazo mientras se desarrollan fuentes renovables. Posición pragmática: no renuncia a los ingresos del petróleo.",
      viabilidad: "Nuevos contratos de exploración tienen ciclos de 8–12 años antes de producir ingresos, lo que no resuelve la crisis fiscal inmediata. La transición energética es inevitable pero su financiación es incierta con el déficit actual.",
      sources: [
        { label: "El Tiempo", href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/abelardo-de-la-espriella-anuncio-los-10-pilares-de-su-gobierno-plan-colombia-ii-reduccion-del-estado-en-40-7-megacarceles-y-otras-medidas-3561778" },
        { label: "Razón Pública", href: "https://razonpublica.com/elecciones-2026-analisis-comparativo-las-propuestas-los-candidatos-presidenciales/" },
      ],
    },
  },
  {
    id: "agraria",
    label: "Reforma agraria",
    icon: "🌾",
    cepeda: {
      text: "«Revolución Agraria» como eje central. Entregar 1 millón de hectáreas adicionales (Petro entregó 270.000 de 700.000 ingresadas al Fondo de Tierras). 30.000 km de vías terciarias («vías para la paz»). Alianza Público-Popular: juntas de acción comunal ejecutan directamente obras del Estado. Inversión masiva en infraestructura rural, agua potable y conectividad. «Subsistema de protección» para víctimas de despojo. Acelerar entregas del FRV y la SAE.",
      viabilidad: "Los problemas de titulación y saneamiento en el FRV y SAE son el principal cuello de botella: Petro entregó solo 270.000 de 700.000 hectáreas ingresadas. Las 30.000 km de vías terciarias tienen un costo de decenas de billones sin fuente clara. PARES destaca que el problema rural no es solo tierra: es la ausencia de crédito, asistencia técnica y acceso a mercados.",
      sources: [
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-del-programa-de-ivan-cepeda/" },
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-ivan-cepeda-este-es-su-plan-de-gobierno/" },
        { label: "PARES", href: "https://www.pares.com.co/las-cinco-apuestas-economicas-de-ivan-cepeda/" },
      ],
    },
    espriella: {
      text: "No tiene una propuesta agraria estructurada en su programa. Su enfoque rural se centra en seguridad territorial y destrucción de economías ilegales como condición previa para cualquier desarrollo.",
      viabilidad: "Al no tener propuesta agraria estructurada, no hay elementos técnicos que evaluar en esta categoría.",
      sources: [
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-de-abelardo-de-la-espriella/" },
      ],
    },
  },
  {
    id: "anticorrupcion",
    label: "Anticorrupción",
    icon: "⚖️",
    cepeda: {
      text: "Sistema Nacional contra la Macrocorrupción de cinco pilares: fortalecer la UIAF y el Portal Anticorrupción PACO; Unidad Anticorrupción en la Fiscalía; Fondo de Reparación para víctimas de la corrupción; presencia anticorrupción en territorios; movilización ciudadana. Dirigido por Iván Velásquez (excomisionado CICIG Guatemala). Tipificar la «gran corrupción» como delito grave. Robo de recursos de víctimas como crimen de lesa humanidad. Austeridad republicana: reducir salario presidencial. Reconoció que en el gobierno Petro hubo hechos cuestionables (UNGRD).",
      viabilidad: "Designar a Iván Velásquez es concreto y de alta credibilidad técnica (desarticuló redes en Guatemala), pero requiere mayorías en un Congreso fragmentado para reformas legales estructurales.",
      sources: [
        { label: "Canal 1 (1 jun 2026)", href: "https://canal1.com.co/amp/noticias/politica/ivan-cepeda-estas-son-sus-principales-propuestas/" },
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-del-programa-de-ivan-cepeda/" },
        { label: "Razón Pública", href: "https://razonpublica.com/elecciones-2026-analisis-comparativo-las-propuestas-los-candidatos-presidenciales/" },
      ],
    },
    espriella: {
      text: "«Purga institucional»: tribunales especiales anticorrupción, con posibilidad de jueces sin rostro. «Muerte civil» para funcionario o empresario implicado en sobornos. Expropiación exprés de bienes para reparar al Estado. Endurecer penas por corrupción y eliminar beneficios jurídicos. Bloque de búsqueda presidencial anticorrupción. Depuración de funcionarios mediante evaluaciones. Modernizar la DIAN con IA. «Menos Estado, menos oportunidades de captura.»",
      viabilidad: "Los «jueces sin rostro» generaron debate jurídico: la Corte Constitucional y tratados de DDHH imponen límites al debido proceso. La «muerte civil» no existe en el ordenamiento jurídico colombiano y requeriría reforma constitucional. Enfrenta un Congreso fragmentado sin mayorías claras.",
      sources: [
        { label: "Razón Pública", href: "https://razonpublica.com/elecciones-2026-analisis-comparativo-las-propuestas-los-candidatos-presidenciales/" },
        { label: "Infobae Colombia", href: "https://www.infobae.com/colombia/2026/05/27/estas-son-las-diferencias-y-las-semejanzas-entre-las-propuestas-de-ivan-cepeda-paloma-valencia-y-abelardo-de-la-espriella-en-salud-seguridad-corrupcion-y-paz/" },
      ],
    },
  },
  {
    id: "exterior",
    label: "Política exterior",
    icon: "🌎",
    cepeda: {
      text: "Política exterior autónoma e independiente de Washington. Continuar normalización con Venezuela: seguridad fronteriza, migración, consulados, educación, industria y salud. Cuestionó la operación militar de EEUU en Venezuela como pugna de corporaciones petroleras (Chevron vs. ExxonMobil). Defensa del multilateralismo y organismos de DDHH. Énfasis en soberanía nacional. No extradición como herramienta diplomática prioritaria.",
      viabilidad: "Sus declaraciones sobre la operación militar en Venezuela podrían generar fricciones con EEUU, mayor socio comercial y de seguridad de Colombia. Según El Espectador, ninguno de los dos candidatos tiene una política exterior estructurada y holística.",
      sources: [
        { label: "AlbertoNews (Venezuela)", href: "https://albertonews.com/internacionales/abelardo-de-la-espriella-e-ivan-cepeda-sus-propuestas-sobre-el-nuevo-escenario-venezolano/" },
        { label: "El Espectador (análisis)", href: "https://www.elespectador.com/mundo/america/politica-exterior-colombiana-que-prometen-los-candidatos-y-que-se-puede-hacer/" },
        { label: "Valora Analitik", href: "https://www.valoraanalitik.com/propuestas-cepeda-espriella-venezuela/" },
      ],
    },
    espriella: {
      text: "Alianza estrecha con EEUU: «Plan Colombia II» contra el narcotráfico. Extradición masiva como eje de política exterior. Ruptura con el gobierno venezolano y el chavismo. «Muy inclinado» a retirar a Colombia de la ONU y la OEA, calificándolos de «directorio político de la izquierda». Acercamiento a gobiernos de derecha del continente. Condicionaría vínculo bilateral con Venezuela al aval de Washington.",
      viabilidad: "El retiro de la ONU y la OEA requiere notificación formal, períodos de transición y tiene consecuencias sobre cooperación internacional y credibilidad diplomática. Analistas advirtieron que conduciría a Colombia «al aislamiento y su desaparición en el escenario multilateral.»",
      sources: [
        { label: "El Colombiano (ONU-OEA)", href: "https://www.elcolombiano.com/colombia/abelardo-de-la-espriella-salida-colombia-onu-oea-presidencia-HA37403051" },
        { label: "Infobae Colombia (5 jun 2026)", href: "https://www.elcolombiano.com/colombia/abelardo-de-la-espriella-salida-colombia-onu-oea-presidencia-HA37403051" },
        { label: "El Espectador", href: "https://www.elespectador.com/mundo/america/politica-exterior-colombiana-que-prometen-los-candidatos-y-que-se-puede-hacer/" },
      ],
    },
  },
  {
    id: "vivienda",
    label: "Vivienda",
    icon: "🏠",
    cepeda: {
      text: "Reforma urbana y rural articulada con la revolución agraria. Reducción del déficit habitacional con énfasis en vivienda campesina y comunitaria. Apoyo a juntas de acción comunal para construir y gestionar proyectos habitacionales. Vivienda como derecho ligado a soberanía territorial, no solo como producto financiero. Detalles técnicos y metas cuantificadas no aparecen de forma explícita en su programa.",
      viabilidad: "Su propuesta carece de metas numéricas concretas en vivienda, lo que dificulta evaluar su impacto y costo fiscal.",
      sources: [
        { label: "El Espectador", href: "https://www.elespectador.com/politica/elecciones-colombia-2026/propuestas-de-ivan-cepeda-este-es-su-plan-de-gobierno/" },
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-del-programa-de-ivan-cepeda/" },
      ],
    },
    espriella: {
      text: "«Colombia, país de propietarios»: meta de más de 1 millón de viviendas en cuatro años. Créditos hipotecarios al 2% a 30 años (tasas actuales: 14–16%); si los bancos se niegan, «abrirles la puerta a bancos extranjeros». Recuperar subsidios para VIS. Leasing habitacional y rent-to-own (modelo Singapur). Más de 2.000 km de vías secundarias y terciarias. Programa «Matemos el hambre»: compras directas al campesino.",
      viabilidad: "La Silla Vacía analizó los créditos al 2%: el Estado tendría que subsidiar la diferencia con la tasa del Banco de la República, con un costo fiscal no cuantificado. La meta de 1M de viviendas/4 años equivale a 250.000/año; el mejor año histórico de Colombia en VIS fue cercano a 130.000 unidades. No ha especificado fuente de financiamiento simultáneamente con su recorte del 40%.",
      sources: [
        { label: "La Silla Vacía", href: "https://www.lasillavacia.com/silla-nacional/las-propuestas-bomba-de-abelardo-de-la-espriella/" },
        { label: "El Tiempo (1 jun 2026)", href: "https://www.eltiempo.com/politica/elecciones-colombia-2026/abelardo-de-la-espriella-promete-recuperar-programas-de-subsidios-de-vivienda-bajo-el-lema-colombia-pais-de-propietarios-con-un-millon-de-casas-3562288" },
        { label: "Defensores de la Patria", href: "https://defensoresdelapatria.com/colombia-pais-de-propietarios-programa-de-vivienda-de-la-espriella/" },
      ],
    },
  },
  {
    id: "valores",
    label: "Valores y sociedad",
    icon: "🤝",
    cepeda: {
      text: "Enfoque de género transversal en todas las políticas. Defensa activa de derechos LGBTQ+, mujeres, pueblos indígenas y comunidades afrodescendientes (articulado con Aida Quilcué). Antirracismo explícito. Memoria histórica obligatoria: informes de la Comisión de la Verdad en colegios y universidades. Museo de la Memoria Nacional como política de Estado. Protección de líderes sociales como prioridad.",
      viabilidad: "Su propuesta de memoria obligatoria enfrenta resistencias en sectores que la califican de adoctrinamiento político.",
      sources: [
        { label: "Canal 1", href: "https://canal1.com.co/amp/noticias/politica/ivan-cepeda-estas-son-sus-principales-propuestas/" },
        { label: "Razón Pública", href: "https://razonpublica.com/elecciones-2026-analisis-comparativo-las-propuestas-los-candidatos-presidenciales/" },
      ],
    },
    espriella: {
      text: "Principios judeocristianos como guía moral del gobierno. «Contrarrevolución cultural» para que Colombia «regrese a Dios». Familia nuclear como eje fundamental. Opuesto al aborto y adopción igualitaria; dice respetar jurisprudencia de la Corte Constitucional, aunque sus declaraciones generan dudas. Rechaza la «ideología de género». Apoyos fiscales a empresas culturales y megaeventos. Programa de bienestar animal.",
      viabilidad: "El aborto legal y la adopción igualitaria son derechos ratificados por la Corte Constitucional; revertirlos requeriría reforma constitucional o nueva composición de la Corte. Cambio Colombia señala que sus posturas «antiderechos» generan preguntas sobre qué ocurriría en la Casa de Nariño.",
      sources: [
        { label: "Cambio Colombia (antiderechos)", href: "https://cambiocolombia.com/poder/articulo/2026/6/el-debate-sobre-las-posturas-antiderechos-de-abelardo-de-la-espriella" },
        { label: "CNN en Español", href: "https://cnnespanol.cnn.com/2026/05/28/colombia/quien-es-abelardo-espriella-candidato-orix" },
        { label: "Infobae Colombia", href: "https://www.infobae.com/colombia/2026/05/27/estas-son-las-diferencias-y-las-semejanzas-entre-las-propuestas-de-ivan-cepeda-paloma-valencia-y-abelardo-de-la-espriella-en-salud-seguridad-corrupcion-y-paz/" },
      ],
    },
  },
];

function CandidateColumn({ data, isCepeda }: { data: CandidateBlock; isCepeda: boolean }) {
  const dotColor = isCepeda ? "#8B5CF6" : "#D4AF37";
  const labelColor = isCepeda ? "#C084FC" : "#D4AF37";
  const name = isCepeda ? "Iván Cepeda" : "Abelardo de la Espriella";
  const bg = isCepeda
    ? "linear-gradient(135deg, rgba(91,45,142,0.12), rgba(91,45,142,0.04))"
    : "linear-gradient(135deg, rgba(15,29,61,0.4), rgba(212,175,55,0.04))";

  return (
    <div
      className="p-7 flex flex-col"
      style={{
        background: bg,
        borderRight: isCepeda ? "1px solid rgba(255,255,255,0.06)" : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: labelColor, fontFamily: "'DM Sans', sans-serif" }}>
          {name}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
        {data.text}
      </p>

      {/* Viabilidad */}
      <div
        className="rounded-lg p-4 mb-5"
        style={{
          background: "rgba(148,163,184,0.06)",
          border: "1px solid rgba(148,163,184,0.12)",
        }}
      >
        <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>
          Análisis técnico
        </span>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
          {data.viabilidad}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {data.sources.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="source-link">
            {s.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Propuestas() {
  const [activeId, setActiveId] = useState("economia");
  const active = TOPICS.find((t) => t.id === activeId)!;
  const { active: candidateActive } = useCandidate();
  const isCepeda = candidateActive === "cepeda";

  return (
    <section id="propuestas" className="section-pad" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
              Sección 2
            </span>
            <h2 className="text-section font-barlow-cond font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Propuestas comparadas
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              Selecciona un área temática · Cada afirmación tiene fuente citada
            </p>
          </div>
        </ScrollReveal>

        {/* Category buttons */}
        <ScrollReveal delay={0.08}>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {TOPICS.map((t) => {
              const isActive = t.id === activeId;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: isActive ? "linear-gradient(135deg, rgba(91,45,142,0.5), rgba(15,29,61,0.5))" : "rgba(255,255,255,0.04)",
                    border: isActive ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.07)",
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    boxShadow: isActive ? "0 0 20px rgba(139,92,246,0.2)" : "none",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className={!isCepeda ? "hidden md:block" : ""}>
              <CandidateColumn data={active.cepeda} isCepeda={true} />
            </div>
            <div className={isCepeda ? "hidden md:block" : ""}>
              <CandidateColumn data={active.espriella} isCepeda={false} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Column labels below panel */}
        <div className="grid md:grid-cols-2 mt-2 text-xs" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
          <div className="flex items-center gap-1.5 px-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#8B5CF6" }} />
            Izquierda · Pacto Histórico
          </div>
          <div className="flex items-center gap-1.5 px-1 md:justify-end">
            Derecha radical · Defensores de la Patria
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D4AF37" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
