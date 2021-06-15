import { PrismaClient } from "./client";

const prisma = new PrismaClient();

export async function seed() {
  await prisma.todo.deleteMany();

  const todo1 = await prisma.todo.create({
    data: {
      title: "Prisma",
    },
    select: {
      id: true,
    },
  });

  console.log("todo1", todo1);

  const todo2 = await prisma.todo.create({
    data: {
      title: "BlitzJS",
      content: "一体化框架思路",
      type: "IDEA",
    },
    select: {
      id: true,
    },
  });
  console.log("todo2", todo2);

  const todo3 = await prisma.todo.create({
    data: {
      title: "Better",
      content: "更强一点",
    },
    select: {
      id: true,
    },
  });
  console.log("todo3", todo3);

  const user1 = await prisma.user.create({
    data: {
      name: "不渡",
      todos: {
        connect: [todo1, todo2],
      },
    },
    select: {
      id: true,
    },
  });

  console.log("user1", user1);

  const user2 = await prisma.user.create({
    data: {
      name: "不渡",
      todos: {
        connect: [todo3],
      },
    },
    select: {
      id: true,
    },
  });

  console.log("user2", user2);

  await prisma.$disconnect();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
