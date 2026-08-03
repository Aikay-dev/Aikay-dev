import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#151312",
          color: "#f7f6f3",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", width: 64, height: 4, background: "#e0603c" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {profile.headline[0]}
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {profile.headline[1]}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#a49f97",
          }}
        >
          <span>{profile.name}</span>
          <span>
            {profile.role} — {profile.location}
          </span>
        </div>
      </div>
    ),
    size
  );
}
