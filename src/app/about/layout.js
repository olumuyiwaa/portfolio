import { buildMetadata } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: "About",
  description: "Mobile developer and technical contractor based in Lagos, Nigeria.",
  path: "/about",
});

export default function Layout({ children }) {
  return children;
}
