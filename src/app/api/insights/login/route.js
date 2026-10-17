import { COOKIE_NAME, SESSION_SECONDS, createSession, passwordMatches } from "@/lib/insightsAuth";

export const dynamic = "force-dynamic";

// Best-effort per-instance lockout: 5 wrong passwords per 15 minutes per IP.
const fails = new Map();
const ipOf = (h) => h.get("x-nf-client-connection-ip") || h.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
const redirect = (to, extra = {}) => new Response(null, { status: 303, headers: { Location: to, ...extra } });

export async function POST(request) {
  const ip = ipOf(request.headers);
  const now = Date.now();
  const recent = (fails.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  if (recent.length >= 5) return redirect("/insights?error=locked");

  let password = "";
  try {
    password = String((await request.formData()).get("password") || "");
  } catch {}

  if (!passwordMatches(password)) {
    recent.push(now);
    fails.set(ip, recent);
    await new Promise((r) => setTimeout(r, 700));
    return redirect("/insights?error=1");
  }

  fails.delete(ip);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return redirect("/insights", {
    "Set-Cookie": `${COOKIE_NAME}=${createSession()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${secure}`,
  });
}
