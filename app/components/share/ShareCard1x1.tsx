"use client";

const CEPEDA_IMG = "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/ivan.jpeg";
const ESPRIELLA_IMG = "https://7kyibpw30uo7mf99.public.blob.vercel-storage.com/abelardo.jpeg";

export default function ShareCard1x1() {
  return (
    <div
      id="share-card-1x1"
      style={{
        position: "fixed",
        left: "-9999px",
        top: 0,
        width: "1080px",
        height: "1080px",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        background: "#0A0A0F",
      }}
    >
      {/* === HEADER — solid black, no transparency === */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "#0A0A0F",
          padding: "32px 48px 24px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "56px",
            lineHeight: 1.15,
            color: "#FFFFFF",
          }}
        >
          ¿Ya sabes por quien votar?
        </p>
        <p
          style={{
            margin: "6px 0 0",
            fontWeight: 400,
            fontSize: "26px",
            color: "#707070",
          }}
        >
          El 21 de junio Colombia decide
        </p>
      </div>

      {/* === SPLIT PHOTOS — pushed down to clear header === */}
      <div style={{ position: "absolute", top: "136px", left: 0, right: 0, bottom: "210px", display: "flex" }}>
        {/* Left — Cepeda */}
        <div style={{ position: "relative", width: "50%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${CEPEDA_IMG}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 15%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(45,20,87,0.7) 0%, rgba(91,45,142,0.3) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "55%",
              background: "linear-gradient(to top, #0A0A0F 8%, transparent)",
            }}
          />

          {/* Name block — bottom of photo area */}
          <div
            style={{
              position: "absolute",
              bottom: "36px",
              left: "32px",
              right: "8px",
              zIndex: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(139,92,246,0.3)",
                color: "#C084FC",
                border: "1px solid rgba(139,92,246,0.5)",
                borderRadius: "9999px",
                padding: "0px 14px 16px",
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Pacto Historico
            </span>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "72px",
                lineHeight: 0.88,
                color: "#E9D5FF",
                textTransform: "uppercase",
                margin: "0 0 10px 0",
                textShadow: "0 3px 16px rgba(0,0,0,0.9)",
              }}
            >
              IVAN<br />CEPEDA
            </h2>
            <p
              style={{
                color: "rgba(245,197,24,0.9)",
                fontSize: "24px",
                fontStyle: "italic",
                marginTop: "14px",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
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
              backgroundPosition: "center 15%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, rgba(8,14,31,0.75) 0%, rgba(15,29,61,0.3) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "55%",
              background: "linear-gradient(to top, #0A0A0F 8%, transparent)",
            }}
          />

          {/* Name block */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "32px",
              left: "8px",
              zIndex: 10,
              textAlign: "right",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(212,175,55,0.25)",
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.5)",
                borderRadius: "9999px",
                padding: "0px 14px 16px",
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Defensores de la Patria
            </span>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "56px",
                lineHeight: 0.88,
                color: "#FDE68A",
                textTransform: "uppercase",
                margin: "0 0 10px 0",
                textShadow: "0 3px 16px rgba(0,0,0,0.9)",
              }}
            >
              ABELARDO<br />DE LA<br />ESPRIELLA
            </h2>
            <p
              style={{
                color: "rgba(212,175,55,0.9)",
                fontSize: "24px",
                fontStyle: "italic",
                marginTop: "6px",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              &ldquo;Firme por la Patria&rdquo;
            </p>
          </div>
        </div>

        {/* Center divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
            zIndex: 15,
          }}
        />

        {/* VS badge */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 30,
          }}
        >
          {/* Outer gradient ring */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8B5CF6, #D4AF37)",
              padding: "4px",
              boxShadow: "0 0 24px rgba(0,0,0,0.6)",
            }}
          >
            {/* Inner black circle */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#0A0A0F",
                textAlign: "center",
                lineHeight: "44px",
                paddingTop: "0px",
                paddingBottom: "20px",
                fontSize: "24px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                boxSizing: "border-box",
              }}
            >
              VS
            </div>
          </div>
        </div>
      </div>

      {/* === FOOTER === */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "210px",
          background: "#0A0A0F",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          zIndex: 40,
          padding: "0 40px",
        }}
      >
        <p
          style={{
            color: "#666666",
            fontSize: "24px",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "0.03em",
          }}
        >
          Propuestas · Controversias · Mitos verificados
        </p>
        <p
          style={{
            color: "#FFFFFF",
            fontSize: "38px",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Vota con informacion, no con rumores
        </p>
        {/* URL pill — solid colors since html2canvas can't do gradient text */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            padding: "8px 24px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "28px",
              color: "#C084FC",
              letterSpacing: "0.01em",
            }}
          >
            cepeda-vs-abelardo.vercel.app
          </span>
        </div>
      </div>
    </div>
  );
}
