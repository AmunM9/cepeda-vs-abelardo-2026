"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, MessageCircle, Link2 } from "lucide-react";
import {
  supportsNativeShare,
  executePlatformShare,
  type SharePlatform,
} from "./useShareActions";

interface ShareFABProps {
  onToast: (msg: string) => void;
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const PLATFORMS: { id: SharePlatform; icon: React.ReactNode; label: string }[] = [
  { id: "whatsapp", icon: <MessageCircle size={20} />, label: "WhatsApp" },
  { id: "instagram-feed", icon: <InstagramIcon />, label: "Instagram" },
  { id: "twitter", icon: <XIcon />, label: "X" },
  { id: "copy", icon: <Link2 size={20} />, label: "Copiar" },
];

export default function ShareFAB({ onToast }: ShareFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(false);

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
    if (supportsNativeShare() && window.innerWidth < 768) {
      const result = await executePlatformShare("native");
      if (result.toast) onToast(result.toast);
    } else {
      setIsOpen((prev) => !prev);
    }
  }, [onToast]);

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
          {/* Platform icons */}
          <AnimatePresence>
            {isOpen &&
              PLATFORMS.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.4, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.4, y: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: i * 0.05,
                  }}
                  onClick={() => handleShare(p.id)}
                  disabled={loading}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "rgba(22,22,31,0.95)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#F0EFF4",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                  title={p.label}
                >
                  {p.icon}
                </motion.button>
              ))}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleFABClick}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center relative share-fab-border"
            style={{
              background: "#0A0A0F",
              color: "#F0EFF4",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Share2 size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
