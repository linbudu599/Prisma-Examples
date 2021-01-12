import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

(async () => {
  const tmp = await prisma.user.create({
    data: {
      name: "林不渡",
      age: 21,
      profile: {
        create: {
          bio: "FrontEnd Developer",
        },
      },
      posts: {
        create: {
          title: "Prisma2: 下一代ORM, 不仅仅是ORM",
          content: "鸽置",
          categories: {
            create: [
              {
                category: {
                  create: {
                    name: "NodeJS",
                  },
                },
              },
              {
                category: {
                  create: {
                    name: "ORM",
                  },
                },
              },
            ],
          },
        },
      },
    },
    include: {
      profile: true,
      posts: {
        include: {
          categories: true,
        },
      },
    },
  });
  console.log(tmp);

  await prisma.$disconnect();
})();
