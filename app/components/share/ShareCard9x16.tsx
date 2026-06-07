"use client";

const CEPEDA_IMG = "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/ivan.jpeg";
const ESPRIELLA_IMG = "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/abelardo.jpeg";

export default function ShareCard9x16() {
  return (
    <div
      id="share-card-9x16"
      style={{
        position: "fixed",
        left: "-9999px",
        top: 0,
        width: "1080px",
        height: "1920px",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        background: "#0A0A0F",
      }}
    >
      {/* Top title */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 40,
        }}
      >
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "72px",
            color: "#F0EFF4",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0,
            textShadow: "0 4px 24px rgba(0,0,0,0.9)",
          }}
        >
          Colombia Elige
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "#9B9AA8",
            marginTop: "8px",
          }}
        >
          Segunda Vuelta Presidencial
        </p>
      </div>

      {/* Split background */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        {/* Left — Cepeda */}
        <div style={{ position: "relative", width: "50%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${CEPEDA_IMG}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "grayscale(30%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(45,20,87,0.85) 0%, rgba(91,45,142,0.5) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, #0A0A0F 2%, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, #0A0A0F 8%, transparent)",
            }}
          />
          {/* Text */}
          <div
            style={{
              position: "absolute",
              bottom: "360px",
              left: "48px",
              right: "12px",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(139,92,246,0.2)",
                color: "#C084FC",
                border: "1px solid rgba(139,92,246,0.35)",
                borderRadius: "9999px",
                padding: "8px 18px",
                fontSize: "20px",
                fontWeight: 500,
                marginBottom: "16px",
              }}
            >
              Pacto Historico
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "86px",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                color: "#E9D5FF",
                textTransform: "uppercase",
                margin: 0,
                textShadow: "0 4px 24px rgba(0,0,0,0.9)",
              }}
            >
              IVAN<br />CEPEDA
            </h2>
            <p
              style={{
                color: "rgba(245,197,24,0.85)",
                fontSize: "24px",
                fontStyle: "italic",
                marginTop: "16px",
              }}
            >
              &ldquo;El poder de la verdad&rdquo;
            </p>
          </div>
        </div>

        {/* Right — Espriella */}
        <div style={{ position: "relative", width: "50%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${ESPRIELLA_IMG}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "grayscale(20%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, rgba(8,14,31,0.88) 0%, rgba(15,29,61,0.5) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, #0A0A0F 2%, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, #0A0A0F 8%, transparent)",
            }}
          />
          {/* Text */}
          <div
            style={{
              position: "absolute",
              bottom: "360px",
              right: "48px",
              left: "12px",
              zIndex: 10,
              textAlign: "right",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(212,175,55,0.15)",
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.35)",
                borderRadius: "9999px",
                padding: "8px 18px",
                fontSize: "20px",
                fontWeight: 500,
                marginBottom: "16px",
              }}
            >
              Defensores de la Patria
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "74px",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                color: "#FDE68A",
                textTransform: "uppercase",
                margin: 0,
                textShadow: "0 4px 24px rgba(0,0,0,0.9)",
              }}
            >
              ABELARDO<br />DE LA ESPRIELLA
            </h2>
            <p
              style={{
                color: "rgba(212,175,55,0.85)",
                fontSize: "24px",
                fontStyle: "italic",
                marginTop: "16px",
              }}
            >
              &ldquo;Firme por la Patria&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          bottom: "320px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.2) 80%, transparent)",
          zIndex: 20,
        }}
      />
      {/* VS badge center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(91,45,142,0.9), rgba(15,29,61,0.9))",
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 0 40px rgba(0,0,0,0.7)",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "28px",
              color: "white",
              letterSpacing: "0.05em",
            }}
          >
            VS
          </span>
        </div>
        <span style={{ fontSize: "48px" }}>🇨🇴</span>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "26px",
            fontWeight: 700,
            color: "#F0EFF4",
            letterSpacing: "0.1em",
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          21 JUNIO 2026
        </span>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "280px",
          background: "rgba(10,10,15,0.9)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "0 60px",
          zIndex: 40,
        }}
      >
        <p
          style={{
            color: "#F0EFF4",
            fontSize: "30px",
            margin: 0,
            textAlign: "center",
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          Lee las propuestas completas con fuentes verificadas
        </p>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(212,175,55,0.2))",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "16px 36px",
          }}
        >
          <p
            style={{
              color: "#C084FC",
              fontSize: "32px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            cepeda-vs-abelardo.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}
