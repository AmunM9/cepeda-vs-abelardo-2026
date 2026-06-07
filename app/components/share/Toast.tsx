"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-sm font-medium max-w-[90vw] text-center"
          style={{
            background: "rgba(16,16,24,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F0EFF4",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
