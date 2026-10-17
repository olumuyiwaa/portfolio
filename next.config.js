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
};

module.exports = nextConfig;
