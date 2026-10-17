import { COOKIE_NAME } from "@/lib/insightsAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  return new Response(null, {
    status: 303,
    headers: { Location: "/insights", "Set-Cookie": `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0` },
  });
}
