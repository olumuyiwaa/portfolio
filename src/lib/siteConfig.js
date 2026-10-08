export const SITE_NAME = "Emmanuel";
export const ROLE = "Full-stack developer";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const DEFAULT_DESCRIPTION =
  "Full-stack developer and technical contractor in Lagos, Nigeria. I build complete mobile, web and backend products with Flutter, Next.js and Node.js.";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "you@example.com";
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/olumuyiwaa";
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";

// Site-level images. Drop files in public/images and set the path here,
// for example "/images/hero.jpg". Empty strings render a blank placeholder.
export const IMAGES = {
  hero: "",
  about: "",
};

export function buildMetadata({ title, description, path = "" }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
