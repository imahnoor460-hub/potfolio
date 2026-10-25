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
          backgroundColor: "#0b0f17",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(129,140,248,0.25), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "monospace",
            fontSize: 24,
            color: "#818cf8",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#818cf8",
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
            color: "#e5e9f0",
            display: "flex",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 34,
            color: "#9aa4b2",
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
            color: "#6b7280",
            display: "flex",
            gap: 16,
          }}
        >
          <span style={{ display: "flex" }}>UCP · Computer Science</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>AI / LLMs / Agentic Workflows</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
