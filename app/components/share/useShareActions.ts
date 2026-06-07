"use client";

import html2canvas from "html2canvas";

const SITE_URL = "https://cepeda-vs-abelardo.vercel.app";
const SHARE_TEXT =
  "\u{1F1E8}\u{1F1F4} Antes de votar el 21 de junio, compara a los candidatos en propuestas reales, controversias y mitos verificados.";

/* ── Image generation ─────────────────────────────────────── */

async function generateCanvas(variant: "1x1" | "9x16"): Promise<HTMLCanvasElement> {
  const element = document.getElementById(`share-card-${variant}`);
  if (!element) throw new Error(`Share card not found: share-card-${variant}`);

  await document.fonts.ready;

  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to create blob"))),
      "image/png"
    );
  });
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ── Capability detection ────────────────────────────────── */

export function supportsNativeShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

async function supportsFileShare(): Promise<boolean> {
  if (!supportsNativeShare() || !navigator.canShare) return false;
  const testFile = new File(["test"], "test.png", { type: "image/png" });
  return navigator.canShare({ files: [testFile] });
}

/* ── Public API ───────────────────────────────────────────── */

export type SharePlatform =
  | "native-with-image"
  | "facebook"
  | "whatsapp"
  | "linkedin"
  | "twitter"
  | "copy"
  | "download";

export interface ShareResult {
  success: boolean;
  toast: string;
}

/**
 * Mobile: native share with generated image attached (falls back to link-only).
 */
export async function shareNativeWithImage(): Promise<ShareResult> {
  try {
    const canShareFile = await supportsFileShare();

    if (canShareFile) {
      const canvas = await generateCanvas("1x1");
      const blob = await canvasToBlob(canvas);
      const file = new File([blob], "colombia-elige-2026.png", { type: "image/png" });

      await navigator.share({
        text: `${SHARE_TEXT} \u{2192} ${SITE_URL}`,
        files: [file],
      });
      return { success: true, toast: "\u{00A1}Compartido con imagen!" };
    }

    // Fallback: link-only native share
    await navigator.share({
      title: "Colombia Elige 2026 — Cepeda vs. De la Espriella",
      text: SHARE_TEXT,
      url: SITE_URL,
    });
    return { success: true, toast: "\u{00A1}Compartido!" };
  } catch {
    return { success: false, toast: "Compartir cancelado" };
  }
}

/**
 * PC: open Facebook share dialog.
 */
export function shareToFacebook(): ShareResult {
  const url = encodeURIComponent(SITE_URL);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  return { success: true, toast: "Abriendo Facebook..." };
}

/**
 * PC: open LinkedIn share dialog.
 */
export function shareToLinkedIn(): ShareResult {
  const url = encodeURIComponent(SITE_URL);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  return { success: true, toast: "Abriendo LinkedIn..." };
}

/**
 * PC: open WhatsApp web with pre-filled message (no image download).
 */
export function shareToWhatsApp(): ShareResult {
  const text = encodeURIComponent(`${SHARE_TEXT} \u{2192} ${SITE_URL}`);
  window.open(`https://wa.me/?text=${text}`, "_blank");
  return { success: true, toast: "Abriendo WhatsApp..." };
}

/**
 * PC: open Twitter/X with pre-filled tweet (no image download).
 */
export function shareToTwitter(): ShareResult {
  const text = encodeURIComponent(
    "\u{1F1E8}\u{1F1F4} Segunda vuelta Colombia 2026. Antes de votar el 21 de junio, compara propuestas, controversias y mitos verificados con fuentes."
  );
  const hashtags = "Colombia2026,SegundaVuelta21J";
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(SITE_URL)}&hashtags=${hashtags}`,
    "_blank"
  );
  return { success: true, toast: "Abriendo X (Twitter)..." };
}

/**
 * Copy link to clipboard.
 */
export async function copyLink(): Promise<ShareResult> {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    return { success: true, toast: "\u{00A1}Enlace copiado!" };
  } catch {
    return { success: false, toast: "No se pudo copiar el enlace" };
  }
}

/**
 * Download the generated share image.
 */
export async function downloadImage(): Promise<ShareResult> {
  try {
    const canvas = await generateCanvas("1x1");
    const blob = await canvasToBlob(canvas);
    downloadBlob(blob, "colombia-elige-2026.png");
    return { success: true, toast: "Imagen descargada" };
  } catch {
    return { success: false, toast: "Error al generar la imagen" };
  }
}

/**
 * Dispatch by platform key.
 */
export async function executePlatformShare(platform: SharePlatform): Promise<ShareResult> {
  switch (platform) {
    case "native-with-image":
      return shareNativeWithImage();
    case "facebook":
      return shareToFacebook();
    case "whatsapp":
      return shareToWhatsApp();
    case "linkedin":
      return shareToLinkedIn();
    case "twitter":
      return shareToTwitter();
    case "copy":
      return copyLink();
    case "download":
      return downloadImage();
  }
}
