import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import { createConnection } from "typeorm";

import { ValueEntity } from "./value.entity";

import { PrismaClient } from "./prisma/client";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Setup TypeORM Connection
  const connection = await createConnection({
    type: "sqlite",
    database: "./typeorm-value.sqlite",
    entities: [ValueEntity],
    synchronize: true,
    dropSchema: true,
  });

  await ValueEntity.clear();
  await prisma.prismaKey.deleteMany();

  // seeding
  const key1 = await prisma.prismaKey.create({
    data: {
      key: uuidv4(),
    },
    select: {
      key: true,
    },
  });
  console.log("key1: ", key1);

  const key2 = await prisma.prismaKey.create({
    data: {
      key: uuidv4(),
    },
    select: {
      key: true,
    },
  });
  console.log("key2: ", key2);

  const insertValues = await ValueEntity.createQueryBuilder()
    .insert()
    .into(ValueEntity)
    .values([
      {
        key: key1.key,
        value: "Linbudu",
      },
      {
        key: key2.key,
        value: "Linbudu",
      },
    ])
    .execute();

  const values = await ValueEntity.createQueryBuilder("value").getMany();
  console.log("values: ", values);

  // query
  const keys = await prisma.prismaKey.findMany();

  for (const keyItem of keys) {
    const key = keyItem.key;

    console.log(`Search By: ${key}`);

    const value = await ValueEntity.createQueryBuilder("value")
      .where("value.key = :key")
      .setParameters({
        key,
      })
      .getOne();

    console.log("Search Result: ", value);
    console.log("===");
  }

  await prisma.$disconnect();
  await connection.close();
}

main();
