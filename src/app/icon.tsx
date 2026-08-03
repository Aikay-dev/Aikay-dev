import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151312",
          color: "#f7f6f3",
          fontSize: 19,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.03em",
        }}
      >
        EE
      </div>
    ),
    size
  );
}
