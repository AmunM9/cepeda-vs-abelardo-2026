"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date("2026-06-21T08:00:00-05:00");
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const placeholder = !mounted;
  const items = [
    { v: placeholder ? "--" : String(timeLeft.days).padStart(2, "0"), l: "días" },
    { v: placeholder ? "--" : String(timeLeft.hours).padStart(2, "0"), l: "horas" },
    { v: placeholder ? "--" : String(timeLeft.minutes).padStart(2, "0"), l: "min" },
    { v: placeholder ? "--" : String(timeLeft.seconds).padStart(2, "0"), l: "seg" },
  ];

  return (
    <div className="flex gap-2 md:gap-3 justify-center">
      {items.map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="glass rounded-lg md:rounded-xl px-2 py-1.5 md:px-3 md:py-2.5 min-w-[44px] md:min-w-[58px] text-center" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="font-barlow-cond text-xl md:text-3xl font-black tabular-nums" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              {v}
            </span>
          </div>
          <span className="text-[10px] md:text-xs mt-1 block" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center overflow-hidden">

      {/* === SPLIT BACKGROUNDS === */}
      <div className="absolute inset-y-0 left-0 w-1/2">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/ivan.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "grayscale(30%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(45,20,87,0.82) 0%, rgba(91,45,142,0.55) 60%, rgba(91,45,142,0.1) 100%)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-64 md:h-48" style={{ background: "linear-gradient(to top, var(--bg-base) 10%, transparent)" }} />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/abelardo.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "grayscale(20%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to left, rgba(8,14,31,0.85) 0%, rgba(15,29,61,0.6) 60%, rgba(15,29,61,0.1) 100%)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-64 md:h-48" style={{ background: "linear-gradient(to top, var(--bg-base) 10%, transparent)" }} />
      </div>

      {/* Vertical divider */}
      <div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-px z-10"
        style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.18) 70%, transparent)" }}
      />

      <h1 className="sr-only">
        Cepeda vs De la Espriella — Comparador Segunda Vuelta Presidencial Colombia 2026
      </h1>

      {/* Top badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 pt-24 pb-4 text-center"
      >
        <span className="badge" style={{ background: "rgba(0,0,0,0.5)", color: "#E0E0E0", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
          Segunda Vuelta · 21 de junio de 2026 · Colombia
        </span>
      </motion.div>

      {/* === CANDIDATE NAMES — at the bottom, over suits === */}
      <div className="relative z-20 w-full flex pb-[260px] md:pb-[160px]" style={{ marginTop: "auto" }}>

        {/* LEFT: Iván Cepeda */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-1/2 flex flex-col items-start justify-end px-4 md:px-14"
        >
          <span className="badge mb-2 md:mb-3 text-[10px] md:text-xs" style={{ background: "rgba(139,92,246,0.2)", color: "#C084FC", border: "1px solid rgba(139,92,246,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
            Pacto Histórico
          </span>

          <h2
            className="hero-name-cepeda"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              background: "linear-gradient(160deg, #E9D5FF 10%, #C084FC 50%, #F5C518 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textTransform: "uppercase",
            }}
          >
            IVÁN<br />CEPEDA
          </h2>

          <p className="mt-2 md:mt-3 text-xs md:text-sm" style={{ color: "rgba(245,197,24,0.85)", fontFamily: "'DM Sans', sans-serif" }}>
            "El poder de la verdad"
          </p>
        </motion.div>

        {/* RIGHT: Abelardo de la Espriella */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-1/2 flex flex-col items-end justify-end px-4 md:px-14 text-right"
        >
          <span className="badge mb-2 md:mb-3 text-[7px] md:text-xs whitespace-nowrap" style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.35)", fontFamily: "'DM Sans', sans-serif", padding: "2px 6px", letterSpacing: "0.05em" }}>
            Defensores de la Patria
          </span>

          <h2
            className="hero-name-espriella"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              background: "linear-gradient(160deg, #FDE68A 10%, #D4AF37 50%, #93C5FD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textTransform: "uppercase",
            }}
          >
            ABELARDO<br />DE LA ESPRIELLA
          </h2>

          <p className="mt-2 md:mt-3 text-xs md:text-sm" style={{ color: "rgba(212,175,55,0.85)", fontFamily: "'DM Sans', sans-serif" }}>
            "Firme por la Patria"
          </p>
        </motion.div>
      </div>

      {/* VS badge + Countdown + Scroll cue — absolute bottom center */}
      <div className="absolute bottom-[8%] md:bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pb-4 md:pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-2 md:mb-3"
        >
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-xs md:text-sm"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              background: "linear-gradient(135deg, rgba(91,45,142,0.9), rgba(15,29,61,0.9))",
              border: "2px solid rgba(255,255,255,0.15)",
              boxShadow: "0 0 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
              color: "white",
              letterSpacing: "0.05em",
            }}
          >
            VS
          </div>
        </motion.div>

        <div className="mb-3">
          <Countdown />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
            style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}
          >
            <span>Explorar</span>
            <div className="w-px h-6" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
