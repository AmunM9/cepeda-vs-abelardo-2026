"use client";

import html2canvas from "html2canvas";

const SITE_URL = "https://cepeda-vs-abelardo.vercel.app";

async function generateImage(variant: "1x1" | "9x16"): Promise<string> {
  const element = document.getElementById(`share-card-${variant}`);
  if (!element) throw new Error(`Share card element not found: share-card-${variant}`);

  await document.fonts.ready;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  });

  return canvas.toDataURL("image/png");
}

function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export type SharePlatform = "whatsapp" | "instagram-feed" | "instagram-stories" | "twitter" | "copy" | "native";

export interface ShareResult {
  success: boolean;
  toast: string;
}

export function supportsNativeShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

export async function shareNative(): Promise<ShareResult> {
  try {
    await navigator.share({
      title: "Colombia Elige 2026 — Cepeda vs. De la Espriella",
      text: "\u{1F1E8}\u{1F1F4} Compara propuestas, controversias y mitos verificados antes de votar el 21 de junio.",
      url: SITE_URL,
    });
    return { success: true, toast: "\u{00A1}Compartido!" };
  } catch {
    return { success: false, toast: "Compartir cancelado" };
  }
}

export async function shareToWhatsApp(): Promise<ShareResult> {
  const dataUrl = await generateImage("1x1");
  downloadDataUrl(dataUrl, "colombia-elige-2026.png");

  const text = encodeURIComponent(
    "\u{1F1E8}\u{1F1F4} Antes de votar el 21 de junio, compara a los candidatos en propuestas reales, controversias y mitos verificados \u{2192} " + SITE_URL
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");

  return { success: true, toast: "La imagen se descarg\u{00F3}. Adj\u{00FA}ntala en WhatsApp junto al mensaje." };
}

export async function shareToInstagramFeed(): Promise<ShareResult> {
  const dataUrl = await generateImage("1x1");
  downloadDataUrl(dataUrl, "colombia-elige-2026-feed.png");
  return { success: true, toast: "Imagen descargada. S\u{00FA}bela a tu feed de Instagram." };
}

export async function shareToInstagramStories(): Promise<ShareResult> {
  const dataUrl = await generateImage("9x16");
  downloadDataUrl(dataUrl, "colombia-elige-2026-stories.png");
  return { success: true, toast: "Imagen descargada. S\u{00FA}bela a tu historia de Instagram." };
}

export async function shareToTwitter(): Promise<ShareResult> {
  const dataUrl = await generateImage("1x1");
  downloadDataUrl(dataUrl, "colombia-elige-2026.png");

  const text = encodeURIComponent(
    "\u{1F1E8}\u{1F1F4} Segunda vuelta Colombia 2026. Antes de votar el 21 de junio, compara propuestas, controversias y mitos verificados con fuentes."
  );
  const hashtags = "Colombia2026,SegundaVuelta21J";
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(SITE_URL)}&hashtags=${hashtags}`,
    "_blank"
  );

  return { success: true, toast: "Imagen descargada. Adj\u{00FA}ntala en tu tweet." };
}

export async function copyLink(): Promise<ShareResult> {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    return { success: true, toast: "\u{00A1}Enlace copiado!" };
  } catch {
    return { success: false, toast: "No se pudo copiar el enlace" };
  }
}

export async function executePlatformShare(platform: SharePlatform): Promise<ShareResult> {
  switch (platform) {
    case "native":
      return shareNative();
    case "whatsapp":
      return shareToWhatsApp();
    case "instagram-feed":
      return shareToInstagramFeed();
    case "instagram-stories":
      return shareToInstagramStories();
    case "twitter":
      return shareToTwitter();
    case "copy":
      return copyLink();
  }
}
