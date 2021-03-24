import { v4 as uuidv4 } from "uuid";

import { PrismaClient as PrismaKeyClient, Key } from "./prisma-key/client";
import { PrismaClient as PrismaValueClient } from "./prisma-value/client";

const keyClient = new PrismaKeyClient();

const valueClient = new PrismaValueClient();

async function main() {
  // seed
  const key1 = await keyClient.key.create({
    data: {
      key: uuidv4(),
    },
    select: {
      key: true,
    },
  });
  console.log("key1: ", key1);

  const key2 = await keyClient.key.create({
    data: {
      key: uuidv4(),
    },
    select: {
      key: true,
    },
  });

  console.log("key2: ", key2);

  const value1 = await valueClient.value.create({
    data: {
      key: key1.key,
      value: "林不渡",
    },
    select: {
      key: true,
      value: true,
    },
  });

  console.log("value1: ", value1);

  const value2 = await valueClient.value.create({
    data: {
      key: key2.key,
      value: "林不渡",
    },
    select: {
      key: true,
      value: true,
    },
  });

  console.log("value2: ", value2);

  // use
  const keys = await keyClient.key.findMany({});

  for (const keyItem of keys) {
    const key = ((keyItem as unknown) as Key).key;

    // FIXME: type
    console.log(`Search By: ${key}`);
    const value = await valueClient.value.findFirst({
      where: {
        key,
      },
    });
    console.log(`Search Result: ${value?.value}`);
    console.log("===");
  }

  await keyClient.$disconnect();
  await valueClient.$disconnect();
}

main();
