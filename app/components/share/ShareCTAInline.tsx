"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Link2 } from "lucide-react";
import {
  supportsNativeShare,
  executePlatformShare,
  type SharePlatform,
} from "./useShareActions";
import ScrollReveal from "../ScrollReveal";
import Toast from "./Toast";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const BUTTONS: { id: SharePlatform; icon: React.ReactNode; label: string }[] = [
  { id: "whatsapp", icon: <MessageCircle size={18} />, label: "WhatsApp" },
  { id: "instagram-feed", icon: <InstagramIcon />, label: "Instagram" },
  { id: "twitter", icon: <XIcon />, label: "X (Twitter)" },
  { id: "copy", icon: <Link2 size={18} />, label: "Copiar enlace" },
];

export default function ShareCTAInline() {
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleShare = useCallback(
    async (platform: SharePlatform) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await executePlatformShare(platform);
        setToastMsg(result.toast);
      } catch {
        setToastMsg("Error al compartir");
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const handleNativeShare = useCallback(async () => {
    const result = await executePlatformShare("native");
    if (result.toast) setToastMsg(result.toast);
  }, []);

  return (
    <>
      <ScrollReveal>
        <div
          className="rounded-2xl p-8 md:p-10 max-w-4xl mx-auto text-center mt-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            className="text-lg md:text-xl font-medium mb-6"
            style={{
              color: "var(--text-primary)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ¿Te parecio util esta informacion?
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              Ayuda a otros colombianos a votar informado.
            </span>
          </p>

          {/* Native share on mobile */}
          {typeof window !== "undefined" && supportsNativeShare() && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNativeShare}
              className="md:hidden mb-4 w-full py-3 rounded-xl font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(212,175,55,0.3))",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#F0EFF4",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Compartir
            </motion.button>
          )}

          {/* Platform buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {BUTTONS.map((btn) => (
              <motion.button
                key={btn.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare(btn.id)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0EFF4",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {btn.icon}
                <span className="hidden sm:inline">{btn.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <Toast message={toastMsg} onDismiss={() => setToastMsg(null)} />
    </>
  );
}
