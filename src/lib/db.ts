/**
 * @module Database
 * @description Singleton do Prisma para acesso persistente ao PostgreSQL.
 * @layer Infrastructure
 * @depends @prisma/client
 * @consumers services and server actions
 * @maintenance docs/MAINTENANCE.md#infraestrutura
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
