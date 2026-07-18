import { PrismaClient } from '@prisma/client';

// ============================================================
// Prisma Client Singleton
// ============================================================
// TODO: Implement connection pooling for serverless environments
// (e.g., Vercel Edge Functions / Serverless Functions)
// See: https://pris.ly/d/help/next-js-best-practices

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// ============================================================
// Graceful shutdown helper
// ============================================================
// TODO: Call this in your server entry point or API route cleanup
export async function disconnectPrisma() {
  await prisma.$disconnect();
}
