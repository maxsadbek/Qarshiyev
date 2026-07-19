import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: undefined | ReturnType<typeof createPrismaClient>;
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === '') {
    // Return a proxy that throws descriptive errors on actual use.
    // This allows the build to succeed without DATABASE_URL.
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        // Allow accessing constructor/name etc. without throwing
        if (typeof prop === 'string' && ['then', 'catch', 'finally', 'constructor', 'name', 'prototype', Symbol.toStringTag as unknown as string].includes(prop)) {
          return undefined;
        }
        return () => {
          throw new Error(
            'DATABASE_URL is not configured. This application requires a PostgreSQL database ' +
            'for full functionality. Authentication has been migrated to localStorage ' +
            'and works without a database.'
          );
        };
      },
    }) as unknown as PrismaClient;
  }

  let adapter: unknown;
  try {
    const { PrismaPg } = require('@prisma/adapter-pg');
    adapter = new PrismaPg({ connectionString: url });
  } catch {
    // Adapter not available — use default connection
  }

  return new PrismaClient({
    ...(adapter ? { adapter } as any : {}),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] as any : ['error'] as any,
  });
}

let instance: ReturnType<typeof createPrismaClient> | null = null;

function getPrisma() {
  if (!instance) {
    instance = createPrismaClient();
    if (process.env.NODE_ENV !== 'production') {
      globalThis.prisma = instance;
    }
  }
  return instance;
}

const prisma = new Proxy(getPrisma, {
  get(_target, prop) {
    const client = getPrisma();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
  apply(_target, _thisArg, _args) {
    return getPrisma();
  },
}) as unknown as PrismaClient;

export default prisma;
