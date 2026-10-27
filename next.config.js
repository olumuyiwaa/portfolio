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
      {
        source: '/:path*',
        // This guard ensures it ONLY fires when hitting your Netlify domain,
        // protecting from infinite loops and letting local dev work normally.
        has: [
          {
            type: 'host',
            value: 'emmanueloladoyin.netlify.app',
          },
        ],
        destination: 'https://emmanueloladoyin.vercel.app/:path*',
        permanent: true, // 301 Redirect
      },
    ];
  },
};

module.exports = nextConfig;
