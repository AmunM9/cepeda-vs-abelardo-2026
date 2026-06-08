"use client";

import html2canvas from "html2canvas";

const SITE_URL = "https://cepeda-vs-abelardo.vercel.app";
const SHARE_TEXT =
  "\u{1F1E8}\u{1F1F4} Antes de votar el 21 de junio, compara a los candidatos en propuestas reales, controversias y mitos verificados.";

/* ── Image generation ─────────────────────────────────────── */

/**
 * Preload cross-origin images with CORS so they land in the browser cache
 * with the right headers BEFORE html2canvas reads them. Without this,
 * CSS backgroundImage loads bypass CORS, tainting the canvas on Android Chrome
 * and causing toBlob() to throw a security error.
 */
async function preloadCORSImages(element: HTMLElement): Promise<void> {
  const bgElements = element.querySelectorAll<HTMLElement>("[style]");
  const urls: string[] = [];

  bgElements.forEach((el) => {
    const bg = el.style.backgroundImage;
    const match = bg.match(/url\(['"]?(https?:\/\/[^'")\s]+)['"]?\)/);
    if (match) urls.push(match[1]);
  });

  await Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve();
          img.onerror = () => resolve(); /* don't block on failure */
          img.src = url;
        }),
    ),
  );
}

async function generateCanvas(variant: "1x1" | "9x16"): Promise<HTMLCanvasElement> {
  const element = document.getElementById(`share-card-${variant}`);
  if (!element) throw new Error(`Share card not found: share-card-${variant}`);

  await document.fonts.ready;
  await preloadCORSImages(element);

  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
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

export async function supportsFileShare(): Promise<boolean> {
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
  /** true when the user explicitly cancelled the native share sheet */
  cancelled?: boolean;
}

/**
 * Mobile: native share with generated image attached.
 * Returns { success: false, cancelled: true } when user dismissed the share sheet.
 * Returns { success: false, cancelled: false } when file sharing failed at runtime
 * (signals the caller to switch to fallback mode).
 */
export async function shareNativeWithImage(): Promise<ShareResult> {
  try {
    const canvas = await generateCanvas("1x1");
    const blob = await canvasToBlob(canvas);
    const file = new File([blob], "colombia-elige-2026.png", { type: "image/png" });

    await navigator.share({
      text: `${SHARE_TEXT} \u{2192} ${SITE_URL}`,
      files: [file],
    });
    return { success: true, toast: "\u{00A1}Compartido con imagen!", cancelled: false };
  } catch (err: unknown) {
    /* User tapped "Cancel" on the share sheet */
    if (err instanceof DOMException && err.name === "AbortError") {
      return { success: false, toast: "Compartir cancelado", cancelled: true };
    }
    /* Runtime failure (device lied about canShare, or share crashed) */
    return { success: false, toast: "", cancelled: false };
  }
}

/**
 * Open Facebook share dialog.
 * Uses location.href as fallback — in-app browsers often block window.open popups.
 */
export function shareToFacebook(): ShareResult {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}&quote=${encodeURIComponent(SHARE_TEXT)}`;
  const popup = window.open(shareUrl, "_blank");
  if (!popup || popup.closed) {
    window.location.href = shareUrl;
  }
  return { success: true, toast: "Abriendo Facebook..." };
}

/**
 * PC: open LinkedIn share dialog with title and summary.
 */
export function shareToLinkedIn(): ShareResult {
  const url = encodeURIComponent(SITE_URL);
  const title = encodeURIComponent("Colombia Elige 2026 — Cepeda vs. De la Espriella");
  const summary = encodeURIComponent(SHARE_TEXT);
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
    "_blank"
  );
  return { success: true, toast: "Abriendo LinkedIn..." };
}

/**
 * Open WhatsApp with pre-filled message.
 * Uses api.whatsapp.com/send which reliably opens the contact picker
 * on both mobile and desktop, unlike wa.me which fails in some in-app browsers.
 */
export function shareToWhatsApp(): ShareResult {
  const text = encodeURIComponent(`${SHARE_TEXT} \u{2192} ${SITE_URL}`);
  const shareUrl = `https://api.whatsapp.com/send?text=${text}`;
  const popup = window.open(shareUrl, "_blank");
  if (!popup || popup.closed) {
    window.location.href = shareUrl;
  }
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
