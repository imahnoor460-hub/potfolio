import { ImageResponse } from "next/og";
import { profile } from "@/data/cv";

export const alt = `${profile.name} — Full-Stack Developer & AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f4ede1",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(192,80,44,0.22), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "monospace",
            fontSize: 24,
            color: "#c0502c",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#c0502c",
              display: "flex",
            }}
          />
          status: available_for_hire
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            fontWeight: 700,
            color: "#1f1b16",
            display: "flex",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 34,
            color: "#6f6556",
            display: "flex",
          }}
        >
          Full-Stack Developer &amp; AI Engineer
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 24,
            fontFamily: "monospace",
            color: "#2f5d62",
            display: "flex",
            gap: 16,
          }}
        >
          <span style={{ display: "flex" }}>React · Next.js · Django</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>AI / LLMs / Agentic Workflows</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
