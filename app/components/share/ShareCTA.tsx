"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Download } from "lucide-react";
import {
  supportsNativeShare,
  executePlatformShare,
  type SharePlatform,
} from "./useShareActions";
import ScrollReveal from "../ScrollReveal";

interface ShareCTAProps {
  onToast: (msg: string) => void;
}

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const DESKTOP_BUTTONS: { id: SharePlatform; icon: React.ReactNode; label: string }[] = [
  { id: "facebook", icon: <FacebookIcon />, label: "Facebook" },
  { id: "whatsapp", icon: <MessageCircle size={18} />, label: "WhatsApp" },
  { id: "linkedin", icon: <LinkedInIcon />, label: "LinkedIn" },
  { id: "twitter", icon: <XIcon />, label: "X (Twitter)" },
  { id: "download", icon: <Download size={18} />, label: "Descargar imagen" },
];

export default function ShareCTA({ onToast }: ShareCTAProps) {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 && supportsNativeShare());
  }, []);

  const handleShare = useCallback(
    async (platform: SharePlatform) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await executePlatformShare(platform);
        onToast(result.toast);
      } catch {
        onToast("Error al compartir");
      } finally {
        setLoading(false);
      }
    },
    [loading, onToast]
  );

  const handleNativeShare = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await executePlatformShare("native-with-image");
      if (result.toast) onToast(result.toast);
    } catch {
      onToast("Error al compartir");
    } finally {
      setLoading(false);
    }
  }, [loading, onToast]);

  return (
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

        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNativeShare}
            disabled={loading}
            className="mb-4 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(212,175,55,0.3))",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#F0EFF4",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Share2 size={18} />
            {loading ? "Generando imagen..." : "Compartir con imagen"}
          </motion.button>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          {DESKTOP_BUTTONS.map((btn) => (
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
  );
}
