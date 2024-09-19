import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", // Destination for the service worker
  register: true,
  skipWaiting: true,
  disable: false,
  fallbacks: {
    document: "/offline", // if you want to fallback to a custom page rather than /_offline
    image: "/images/offline/nowifi.gif",
  },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
