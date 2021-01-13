import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

(async () => {
  await prisma.todo.deleteMany();

  const todo1 = await prisma.todo.create({
    data: {
      title: "Prisma",
    },
  });

  console.log("todo1", todo1);

  const todo2 = await prisma.todo.create({
    data: {
      title: "BlitzJS",
      content: "一体化框架思路",
      type: "IDEA",
    },
  });
  console.log("todo2", todo2);
})();
