/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
   * Tell Turbopack the project root so it doesn't scan parent directories
   * for additional lockfiles and emit an inference warning.
   */
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // Ensure server components can access Node.js APIs used by Prisma, Telegraf, etc.
  serverExternalPackages: ['@prisma/client', 'telegraf', 'sharp'],
};

export default nextConfig;
