/** @type {import('next').NextConfig} */

const backendUrl = (process.env.BACKEND_URL || "http://localhost:5000").replace(
  /\/+$/,
  "",
);

const nextConfig = {
  // Preserve your existing Next.js settings.
  cacheComponents: true,
  partialPrefetching: true,

  // Tailwind CSS Turbopack configuration.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Forward frontend API requests to the Express backend.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
