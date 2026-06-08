"use client";

import html2canvas from "html2canvas";

const SITE_URL = "https://cepeda-vs-abelardo.vercel.app";
const SHARE_TEXT =
  "\u{1F1E8}\u{1F1F4} Antes de votar el 21 de junio, compara a los candidatos en propuestas reales, controversias y mitos verificados.";

/* ── Image generation ─────────────────────────────────────── */

/**
 * Fetch a remote image and return it as a base64 data URL.
 * Data URLs are always same-origin — they bypass every CORS issue and don't
 * depend on the browser having painted a CSS backgroundImage (which Android
 * Chrome skips for off-screen elements).
 */
async function fetchAsDataURL(url: string): Promise<string> {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Find every child element whose inline style has a CSS backgroundImage URL,
 * fetch each image, and swap the URL to a base64 data URL in-place.
 * Returns a restore function that puts the original URLs back.
 *
 * This solves three Android Chrome problems at once:
 * 1) Off-screen elements don't load backgroundImage — data URLs need no load.
 * 2) CORS cache-key mismatch between <img crossOrigin> and CSS bg — gone.
 * 3) html2canvas clones the DOM, so moving the original element on-screen
 *    doesn't help the clone — data URLs are already embedded in the style.
 */
async function inlineBackgroundImages(
  element: HTMLElement,
): Promise<() => void> {
  const bgElements = element.querySelectorAll<HTMLElement>("[style]");
  const restoreFns: Array<() => void> = [];

  const work: Array<Promise<void>> = [];

  bgElements.forEach((el) => {
    const bg = el.style.backgroundImage;
    const match = bg.match(/url\(['"]?(https?:\/\/[^'")\s]+)['"]?\)/);
    if (!match) return;

    const originalBg = bg;
    const url = match[1];

    work.push(
      fetchAsDataURL(url).then((dataUrl) => {
        el.style.backgroundImage = `url('${dataUrl}')`;
        restoreFns.push(() => {
          el.style.backgroundImage = originalBg;
        });
      }),
    );
  });

  await Promise.all(work);

  return () => restoreFns.forEach((fn) => fn());
}

async function generateCanvas(
  variant: "1x1" | "9x16",
): Promise<HTMLCanvasElement> {
  const element = document.getElementById(`share-card-${variant}`);
  if (!element) throw new Error(`Share card not found: share-card-${variant}`);

  await document.fonts.ready;

  /* Replace remote CSS backgroundImage URLs with base64 data URLs.
     Data URLs are same-origin and don't depend on browser painting. */
  const restoreImages = await inlineBackgroundImages(element);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      /* html2canvas clones the DOM into a hidden iframe at left:-10000px and
         re-computes layout. Our element is at left:-9999px, so the clone also
         gets zero computed dimensions → createPattern fails with "width or
         height of 0" (html2canvas #2981). onclone lets us fix the clone's
         position without touching the original or causing a visual flash. */
      onclone: (clonedDoc: Document) => {
        const clone = clonedDoc.getElementById(`share-card-${variant}`);
        if (clone) {
          clone.style.position = "absolute";
          clone.style.left = "0";
          clone.style.top = "0";
        }
      },
    });
    return canvas;
  } finally {
    restoreImages();
  }
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
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, toast: `Error al compartir: ${msg}`, cancelled: false };
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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, toast: `Error al generar imagen: ${msg}` };
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
