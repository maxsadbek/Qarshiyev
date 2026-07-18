import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { requireDatabaseUrl } from './env';

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: requireDatabaseUrl() }),
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

let instance: ReturnType<typeof prismaClientSingleton> | null = null;

function getPrisma() {
  if (!instance) {
    instance = prismaClientSingleton();
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

