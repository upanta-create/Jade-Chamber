let prismaInstance;

try {
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis;

  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (err) {
  // Graceful stub proxy for builds/environments before Prisma engine is compiled
  console.warn('Prisma Client not yet generated. Operating in resilient fallback mode.');
  prismaInstance = new Proxy(
    {},
    {
      get: (target, prop) => {
        if (prop === '$queryRaw') {
          return () => Promise.reject(new Error('Prisma engine offline'));
        }
        return new Proxy(
          {},
          {
            get: () => () => Promise.reject(new Error(`Prisma model method offline`)),
          }
        );
      },
    }
  );
}

export const prisma = prismaInstance;
export default prisma;
