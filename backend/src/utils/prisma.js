import { PrismaClient } from '@prisma/client';

let prisma = null;

if (process.env.DATABASE_URL) {
  try {
    prisma = new PrismaClient();
  } catch (err) {
    console.warn('Prisma initialization failed:', err.message);
  }
}

export default prisma;
