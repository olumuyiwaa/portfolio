import { buildMetadata } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Start a project or ask a question.",
  path: "/contact",
});

export default function Layout({ children }) {
  return children;
}
