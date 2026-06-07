"use client";

import { motion } from "framer-motion";
import { useCandidate } from "./CandidateToggleContext";

export default function CandidateToggle() {
  const { active, toggle } = useCandidate();
  const isCepeda = active === "cepeda";

  const handleToggle = () => {
    const stickyOffset = 120; // 56px navbar + 64px toggle bar
    const sectionIds = ["hero", "hoja-de-vida", "propuestas", "controversias", "mitos", "contradicciones", "tabla", "apoyos"];
    
    let activeSectionId = "hero";
    let maxOverlap = -1;
    
    const viewportTop = stickyOffset;
    const viewportBottom = typeof window !== "undefined" ? window.innerHeight : 800;
    
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      
      // Calculate how many visible pixels of this section overlap with the active viewport area
      const visibleTop = Math.max(rect.top, viewportTop);
      const visibleBottom = Math.min(rect.bottom, viewportBottom);
      const overlap = Math.max(0, visibleBottom - visibleTop);
      
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        activeSectionId = id;
      }
    }

    // Toggle candidate state
    toggle();

    if (activeSectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    // Wait for the DOM to update with new heights and scroll to the section's new position
    setTimeout(() => {
      const el = document.getElementById(activeSectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const targetScrollY = window.scrollY + rect.top - stickyOffset;
        window.scrollTo({
          top: targetScrollY,
          behavior: "auto"
        });
      }
    }, 0);
  };

  return (
    <div className="md:hidden sticky top-[56px] z-40 flex justify-center py-3 px-4" style={{ background: "rgba(10,10,18,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={handleToggle}
        className="relative flex items-center rounded-full p-1"
        style={{
          width: "260px",
          height: "40px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        aria-label={`Mostrando datos de ${isCepeda ? "Iván Cepeda" : "Abelardo de la Espriella"}. Toca para cambiar.`}
      >
        {/* Sliding pill */}
        <motion.div
          className="absolute top-1 rounded-full"
          style={{ width: "126px", height: "32px" }}
          animate={{
            left: isCepeda ? "4px" : "130px",
            background: isCepeda
              ? "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(139,92,246,0.25))"
              : "linear-gradient(135deg, rgba(212,175,55,0.5), rgba(212,175,55,0.25))",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {/* Labels */}
        <span
          className="relative z-10 flex-1 text-center text-xs font-bold uppercase tracking-wider"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: isCepeda ? "#C084FC" : "rgba(255,255,255,0.4)",
            transition: "color 0.2s",
          }}
        >
          Cepeda
        </span>
        <span
          className="relative z-10 flex-1 text-center text-xs font-bold uppercase tracking-wider"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: !isCepeda ? "#FDE68A" : "rgba(255,255,255,0.4)",
            transition: "color 0.2s",
          }}
        >
          De la Espriella
        </span>
      </button>
    </div>
  );
}
