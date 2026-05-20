import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Essays and Notes`;

export default function OpengraphImage() {
  const host = new URL(site.url).host;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f6f4ee",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "96px 112px",
          color: "#1a1814",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#8a8475",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 132,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: "#1a1814",
            }}
          >
            Essays
          </div>
          <div
            style={{
              fontSize: 132,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: "#4a463d",
            }}
          >
            and Notes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#8a8475",
          }}
        >
          <span>{host}</span>
          <span
            style={{
              width: 8,
              height: 8,
              background: "#1a1814",
              borderRadius: 4,
              display: "block",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
