import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import { PrismaKey, PrismaClient } from "./prisma/client";
import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

const prisma = new PrismaClient();

dotenv.config();

// TypeGoose model
class TypeGooseValue {
  @prop()
  public key!: string;

  @prop()
  public value!: string;
}

const ValueModel = getModelForClass(TypeGooseValue);

async function main() {
  try {
    const connection = await mongoose.connect(
      process.env.WITH_TYPEGOOSE_TYPEGOOSE_VALUE_URL!,
      { dbName: "prisma" }
    );

    await ValueModel.deleteMany({});
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

    const value1 = await ValueModel.create({
      key: key1.key,
      value: "Linbudu",
    });

    console.log("value1: ", value1);

    const value2 = await ValueModel.create({
      key: key2.key,
      value: "Linbudu",
    });

    console.log("value2: ", value2);

    // query
    const keys: PrismaKey[] = await prisma.prismaKey.findMany();

    for (const keyItem of keys) {
      const key = keyItem.key;

      console.log(`Search By: ${key}`);

      const value = await ValueModel.findOne({
        key,
      });

      console.log("Search Result: ", value);
      console.log("===");
    }

    await connection.disconnect();
    await prisma.$disconnect();
  } catch (error) {
    console.warn("\nAre u sure MongoDB is running?\n\n");
    console.warn(error);
  }
}

main();
