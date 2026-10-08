import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, ROLE, DEFAULT_DESCRIPTION, GITHUB_URL } from "@/lib/siteConfig";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${ROLE}`, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { siteName: SITE_NAME, type: "website", url: SITE_URL },
  twitter: { card: "summary_large_image" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: ROLE,
  url: SITE_URL,
  sameAs: [GITHUB_URL],
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
