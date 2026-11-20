import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // Old static URLs from the HTML build. content-engine is now Hook OS.
  redirects() {
    return [
      { source: "/content-engine", destination: "/hook-os", permanent: true },
      { source: "/content-engine.html", destination: "/hook-os", permanent: true },
      { source: "/hook-os.html", destination: "/hook-os", permanent: true },
      { source: "/media-buying.html", destination: "/media-buying", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
