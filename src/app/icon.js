import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Same reasoning as opengraph-image.js — there's no favicon.ico or any
// image asset anywhere in this repo, so browsers were falling back to a
// generic globe/blank tab icon. Generated instead of designed for now;
// swap for a real favicon whenever a proper logo asset exists.
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
                backgroundColor: "#3F6B52",
                borderRadius: 14,
                color: "#F7F5F0",
                fontSize: 38,
                fontWeight: 700,
                fontFamily: "sans-serif",
              }}
          >
            E
          </div>
      ),
      { ...size }
  );
}
