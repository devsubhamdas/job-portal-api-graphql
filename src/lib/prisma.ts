import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL),
  // log: ['query', 'info', 'warn', 'error'],
});
