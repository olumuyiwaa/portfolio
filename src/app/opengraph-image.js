import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Applies to every route that doesn't define its own opengraph-image file.
// Built with next/og instead of a static asset because there is no
// designed logo/OG image anywhere in this repo (no public/ directory at
// all) — this at least gives link previews on Slack/X/LinkedIn something
// on-brand instead of a blank box, using the same green (#3F6B52) the
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
                backgroundColor: "#F7F5F0",
                backgroundImage:
                    "linear-gradient(135deg, #F7F5F0 0%, #E7EFE9 100%)",
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
                    backgroundColor: "#3F6B52",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    color: "#F7F5F0",
                    fontWeight: 700,
                  }}
              >
                E
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#171B1A" }}>
                Emmanuel
              </div>
            </div>
            <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: "#171B1A",
                  lineHeight: 1.15,
                  maxWidth: 900,
                }}
            >
              Full-stack developer
            </div>
            <div
                style={{
                  fontSize: 28,
                  color: "#5F6664",
                  marginTop: 20,
                  maxWidth: 800,
                }}
            >
              Flutter, Next.js and Node.js products, built end to end.
            </div>
          </div>
      ),
      { ...size }
  );
}
