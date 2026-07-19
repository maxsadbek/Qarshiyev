/** @type {import('next').NextConfig} */
const nextConfig = {
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
  turbopack: {
    // Fix: Prevents Turbopack from detecting the wrong workspace root
    // when there are multiple package-lock.json files in parent directories.
    root: process.cwd(),
  },
};

export default nextConfig;
