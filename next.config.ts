import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Medium-hosted article covers are loaded straight from Medium's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn-images-1.medium.com" }],
  },
  // Dev server only: let phones/laptops on the same Wi-Fi open the site via
  // this machine's LAN address (e.g. http://192.168.1.9:3000) with scripts working.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
