import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Applies to every route that doesn't define its own opengraph-image file.
// Built with next/og instead of a static asset because there is no
// designed logo/OG image anywhere in this repo (no public/ directory at
// all) — this at least gives link previews on Slack/X/LinkedIn something
// on-brand instead of a blank box, using the same green (#137352) the
// booking widget and site templates use as their default primary color.
export default function OpengraphImage() {
  return new ImageResponse(
      (
          <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "80px",
                backgroundColor: "#F8F7F3",
              }}
          >
            <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 28,
                }}
            >
              <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: "#137352",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
              >
                E
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#101814" }}>
                Emmanuel
              </div>
            </div>
            <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: "#101814",
                  lineHeight: 1.15,
                  maxWidth: 900,
                }}
            >
              Mobile developer
            </div>
            <div
                style={{
                  fontSize: 28,
                  color: "#54503F",
                  marginTop: 20,
                  maxWidth: 800,
                }}
            >
              Flutter apps for iOS and Android, with the web and backend to match.
            </div>
          </div>
      ),
      { ...size }
  );
}
