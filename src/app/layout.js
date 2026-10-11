import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, ROLE, DEFAULT_DESCRIPTION, GITHUB_URL, LINKEDIN_URL } from "@/lib/siteConfig";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${ROLE}`, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { siteName: SITE_NAME, type: "website", url: SITE_URL },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1311" },
  ],
};

// Runs before first paint so the saved (or system) theme never flashes.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  alternateName: "Oladoyin Emmanuel",
  jobTitle: ROLE,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  sameAs: [GITHUB_URL, LINKEDIN_URL].filter(Boolean),
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_URL} />
        <meta name="google-site-verification" content="-UtgsAREFGJ7XRYl-OrbOpmzjv3uRHj2l0n-2J5rSTA" />
      </head>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
