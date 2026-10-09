import { buildMetadata } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "About",
  description: "Software engineer and technical contractor based in Lagos, Nigeria.",
  path: "/about",
});

export default function Layout({ children }) {
  return children;
}
