/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep the MongoDB driver out of the bundle; it is loaded at runtime.
    serverComponentsExternalPackages: ["mongodb"],
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/insights", headers: noindex },
      { source: "/api/insights/:path*", headers: noindex },
    ];
  },
  async redirects() {
    return [
      // Rule 1: Redirect Netlify -> emmanueloladoyin.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)emmanueloladoyin\\.netlify\\.app', // Regex handles HTTP/HTTPS & subdomains
          },
        ],
        destination: 'https://emmanueloladoyin.com/:path*',
        permanent: true, // 301 Redirect
      },
      // Rule 2: Redirect Vercel subdomain -> emmanueloladoyin.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)emmanueloladoyin\\.vercel\\.app',
          },
        ],
        destination: 'https://emmanueloladoyin.com/:path*',
        permanent: true, // 301 Redirect
      },
    ];
  },
};

module.exports = nextConfig;