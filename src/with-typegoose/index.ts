import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import { Key, PrismaClient } from "./prisma/client";
import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

const prisma = new PrismaClient();
dotenv.config();

class Value {
  @prop()
  public key!: string;

  @prop()
  public value!: string;
}

const ValueModel = getModelForClass(Value);

async function main() {
  const connection = await mongoose.connect(
    process.env.WITH_TYPEGOOSE_TYPEGOOSE_VALUE_URL!,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "prisma" }
  );

  await ValueModel.deleteMany({});
  await prisma.key.deleteMany();

  // seeding
  const key1 = await prisma.key.create({
    data: {
      key: uuidv4(),
    },
    select: {
      key: true,
    },
  });
  console.log("key1: ", key1);

  const key2 = await prisma.key.create({
    data: {
      key: uuidv4(),
    },
    select: {
      key: true,
    },
  });
  console.log("key2: ", key2);

  const value1 = await ValueModel.create({
    key: key1.key,
    value: "林不渡",
  } as Value);

  console.log("value1: ", value1);

  const value2 = await ValueModel.create({
    key: key2.key,
    value: "林不渡",
  } as Value);

  console.log("value2: ", value2);

  // query
  const keys = await prisma.key.findMany();

  for (const keyItem of keys) {
    const key = ((keyItem as unknown) as Key).key;

    // FIXME: type
    console.log(`Search By: ${key}`);

    const value = await ValueModel.findOne({
      key,
    });

    console.log("value: ", value);
    console.log("===");
  }

  await connection.disconnect();
  await prisma.$disconnect();
}

main();
