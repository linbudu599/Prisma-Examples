import { PrismaClient } from "./prisma/client";

export interface IContext {
  prisma: PrismaClient;
}
