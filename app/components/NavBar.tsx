"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#hero", label: "Inicio" },
  { href: "#hoja-de-vida", label: "Hoja de vida" },
  { href: "#propuestas", label: "Propuestas" },
  { href: "#controversias", label: "Controversias" },
  { href: "#mitos", label: "Mitos y verdades" },
  { href: "#contradicciones", label: "Contradicciones" },
  { href: "#tabla", label: "Comparación" },
  { href: "#apoyos", label: "Apoyos" },
  { href: "#compartir", label: "Compartir" },
];

export default function NavBar() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10,10,15,0)", "rgba(10,10,15,0.92)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{
        backgroundColor: bg as unknown as string,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm"
    >
      <nav
        className="max-w-7xl mx-auto px-4 flex items-center justify-between"
        style={{ height: "56px" }}
      >
        <a
          href="#hero"
          className="font-barlow-cond text-sm font-bold tracking-widest uppercase"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "var(--text-secondary)",
          }}
        >
          CO · 2026
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.slice(1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs tracking-wide transition-colors duration-150"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Source criteria button */}
        <a
          href="#footer"
          className="hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-colors duration-150"
          style={{
            color: "var(--text-secondary)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          ¿Cómo elegimos las fuentes?
        </a>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--text-secondary)" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm border-b"
              style={{
                color: "var(--text-secondary)",
                borderColor: "rgba(255,255,255,0.05)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
