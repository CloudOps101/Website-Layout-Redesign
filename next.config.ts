import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Keep old Squarespace links (search results, shared posts) working after launch
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-1", destination: "/about", permanent: true },
      { source: "/projects-1", destination: "/partnerships", permanent: true },
      { source: "/projects-2-1", destination: "/programs/health-wellness-fitness", permanent: true },
      { source: "/projects-2-1-1", destination: "/partnerships#naia", permanent: true },
      { source: "/projects-2-1-1-2", destination: "/programs/medical-innovation-districts", permanent: true },
      { source: "/projects-3", destination: "/programs/muzik-xpose-radio", permanent: true },
      { source: "/new-dropdown", destination: "/programs", permanent: true },
    ];
  },
};

export default nextConfig;
