import { mocked } from "ts-jest/utils";
import { PrismaClient } from "../src/single-model/prisma/client";

const prisma = new PrismaClient();

const mockedPrisma = mocked(prisma, true);

declare global {
  const $prisma: typeof mockedPrisma;
  namespace NodeJS {
    interface Global {
      $prisma: typeof mockedPrisma;
    }
  }
}

global.$prisma = mockedPrisma;
