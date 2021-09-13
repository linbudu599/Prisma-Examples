import { mocked } from "ts-jest/utils";
import { PrismaClient } from "../src/single-model/prisma/client";

const prisma = new PrismaClient();

const mockedPrisma = mocked(prisma, true);

global.$prisma = mockedPrisma;
