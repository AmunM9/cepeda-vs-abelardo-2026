"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, MessageCircle, Download } from "lucide-react";
import {
  supportsNativeShare,
  executePlatformShare,
  type SharePlatform,
} from "./useShareActions";

interface ShareFABProps {
  onToast: (msg: string) => void;
}

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* Desktop: Facebook, WhatsApp, LinkedIn, X, Download — reversed because flex-col-reverse */
const DESKTOP_PLATFORMS: { id: SharePlatform; icon: React.ReactNode; label: string }[] = [
  { id: "download", icon: <Download size={20} />, label: "Imagen" },
  { id: "twitter", icon: <XIcon />, label: "X" },
  { id: "linkedin", icon: <LinkedInIcon />, label: "LinkedIn" },
  { id: "whatsapp", icon: <WhatsAppIcon />, label: "WhatsApp" },
  { id: "facebook", icon: <FacebookIcon />, label: "Facebook" },
];

export default function ShareFAB({ onToast }: ShareFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile after mount to avoid hydration mismatch */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 && supportsNativeShare());
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > lastScrollY && currentY - lastScrollY > 60) {
          setVisible(false);
          setIsOpen(false);
        } else if (lastScrollY - currentY > 30) {
          setVisible(true);
        }
        setLastScrollY(currentY);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        setIsOpen(false);
      }
    },
    [loading, onToast]
  );

  const handleFABClick = useCallback(async () => {
    if (isMobile) {
      /* Mobile: share natively with image */
      setLoading(true);
      try {
        const result = await executePlatformShare("native-with-image");
        if (result.toast) onToast(result.toast);
      } catch {
        onToast("Error al compartir");
      } finally {
        setLoading(false);
      }
    } else {
      setIsOpen((prev) => !prev);
    }
  }, [isMobile, onToast]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse items-center gap-3"
        >
          {/* Desktop platform icons */}
          <AnimatePresence mode="sync">
            {isOpen &&
              DESKTOP_PLATFORMS.map((p, i) => {
                const total = DESKTOP_PLATFORMS.length;
                const enterDelay = i * 0.04;
                const exitDelay = (total - 1 - i) * 0.03;
                return (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.6, y: 24 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                        delay: enterDelay,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      y: 12,
                      transition: {
                        duration: 0.15,
                        ease: [0.4, 0, 1, 1],
                        delay: exitDelay,
                      },
                    }}
                    onClick={() => handleShare(p.id)}
                    disabled={loading}
                    className="h-11 rounded-full flex items-center gap-2 px-4 transition-colors whitespace-nowrap"
                    style={{
                      background: "rgba(22,22,31,0.95)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#F0EFF4",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                      fontSize: "14px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    title={p.label}
                  >
                    {p.icon}
                    <span>{p.label}</span>
                  </motion.button>
                );
              })}
          </AnimatePresence>

          {/* Main FAB — animated gradient border + share icon */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleFABClick}
            disabled={loading}
            className="w-[56px] h-[56px] rounded-full flex items-center justify-center relative share-fab-border"
            style={{
              background: "#0A0A0F",
              color: "#FFFFFF",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
            aria-label="Compartir"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10"
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10"
                >
                  <Share2 size={24} strokeWidth={2.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
