import { buildMetadata } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Work",
  description: "Selected client and product work across Flutter, Next.js and Node.js.",
  path: "/projects",
});

export default function Layout({ children }) {
  return children;
}
