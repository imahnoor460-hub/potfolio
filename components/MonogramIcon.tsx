import { ImageResponse } from "next/og";

// "MI" monogram on the emerald-cyan gradient, rendered as a PNG for app/icon.tsx
// and app/apple-icon.tsx.
export function renderMonogram(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #047857, #0e7490)",
          borderRadius: size * 0.22,
          color: "#f6f4ef",
          fontSize: size * 0.42,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        MI
      </div>
    ),
    { width: size, height: size },
  );
}
