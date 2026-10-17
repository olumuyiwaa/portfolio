import { createHash, createHmac, timingSafeEqual } from "crypto";

// Password login for the private /insights dashboard.
// Set ANALYTICS_PASSWORD (required) and optionally ANALYTICS_SECRET in the
// environment. The session cookie is a signed expiry timestamp, so changing
// the password or secret signs everyone out.
export const COOKIE_NAME = "insights_session";
export const SESSION_SECONDS = 60 * 60 * 24 * 30;

export function authConfigured() {
  return Boolean(process.env.ANALYTICS_PASSWORD);
}

const key = () => `${process.env.ANALYTICS_SECRET || ""}|${process.env.ANALYTICS_PASSWORD || ""}`;
const sign = (value) => createHmac("sha256", key()).update(value).digest("hex");
const digest = (s) => createHash("sha256").update(String(s)).digest();

export function passwordMatches(input) {
  if (!authConfigured() || typeof input !== "string") return false;
  return timingSafeEqual(digest(input), digest(process.env.ANALYTICS_PASSWORD));
}

export function createSession() {
  const exp = String(Date.now() + SESSION_SECONDS * 1000);
  return `${exp}.${sign(exp)}`;
}

export function sessionValid(token) {
  if (!authConfigured() || typeof token !== "string") return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
