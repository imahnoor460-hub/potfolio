import { ImageResponse } from "next/og";
import { profile } from "@/data/cv";

// Shared 1200x630 social card for app/opengraph-image.tsx and
// app/twitter-image.tsx. Satori only supports flexbox and a subset of CSS, so
// every container with more than one child sets `display: "flex"`.

export const ogAlt = `${profile.name} — ${profile.title}`;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const highlights = ["AI Agents", "LLMs & RAG", "Django · React · Next.js"];

export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: "linear-gradient(120deg, #047857, #0e7490)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            borderRadius: 36,
            background: "#fafafa",
            color: "#09090b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 32,
                background: "linear-gradient(135deg, #047857, #0e7490)",
                color: "#ffffff",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              MI
            </div>
            <div style={{ display: "flex", fontSize: 28, color: "#52525b" }}>mahnooriftikhar.online</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>
              {profile.name}
            </div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: "#047857", marginTop: 18 }}>
              {profile.title}
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {highlights.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  fontSize: 24,
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid #e4e4e7",
                  background: "#ffffff",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
