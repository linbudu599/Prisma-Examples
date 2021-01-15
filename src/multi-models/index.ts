import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

(async () => {
  // const tmp = await prisma.user.create({
  //   data: {
  //     name: "林不渡",
  //     age: 21,
  //     profile: {
  //       create: {
  //         bio: "FrontEnd Developer",
  //       },
  //     },
  //     posts: {
  //       create: {
  //         title: "Prisma2: 下一代ORM, 不仅仅是ORM",
  //         content: "鸽置",
  //         categories: {
  //           create: [
  //             {
  //               category: {
  //                 create: {
  //                   name: "NodeJS",
  //                 },
  //               },
  //             },
  //             {
  //               category: {
  //                 create: {
  //                   name: "ORM",
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   },
  //   include: {
  //     profile: true,
  //     posts: {
  //       include: {
  //         categories: true,
  //       },
  //     },
  //   },
  // });
  // console.log(tmp);

  const randomName = () => `林不渡-${Math.floor(Math.random() * 100000)}`;
  const randomTitle = () => `Title-${Math.floor(Math.random() * 100000)}`;
  const randomCategory = () => `Caterogy-${Math.floor(Math.random() * 100000)}`;
  const randomBio = () => `Bio-${Math.floor(Math.random() * 100000)}`;
  const randomFragment = () => `Fragment-${Math.floor(Math.random() * 100000)}`;

  const constName = "林不渡";

  const simpleSelectFields = {
    id: true,
    name: true,
    profile: true,
    posts: true,
    fragment: true,
  };

  console.log("=== Create User Only ===");
  const createUserOnly = await prisma.user.upsert({
    where: {
      name: constName,
    },
    create: {
      name: constName,
    },
    update: {
      name: constName,
    },
    select: simpleSelectFields,
  });
  console.log(createUserOnly);

  console.log("=== Create User with All Relations ===");
  const createUserWithAllRelations = await prisma.user.create({
    data: {
      name: randomName(),
      profile: {
        create: {
          bio: randomBio(),
        },
      },
      posts: {
        create: [
          {
            title: randomTitle(),
          },
          {
            title: randomTitle(),
          },
        ],
      },
      fragment: {
        create: {
          indicator: randomFragment(),
        },
      },
    },
    select: simpleSelectFields,
  });
  console.log(createUserWithAllRelations);

  console.log("=== Create Fragment Only ===");
  const createFragmentOnly = await prisma.fragment.create({
    data: {
      indicator: randomFragment(),
    },
    select: {
      id: true,
      belongsTo: true,
    },
  });
  console.log(createFragmentOnly);

  console.log("=== Connect User & Fragment ===");
  const connectUserAndFragment = await prisma.user.update({
    where: {
      id: createUserOnly.id,
    },
    data: {
      fragment: {
        connect: {
          id: createFragmentOnly.id,
        },
      },
    },
    select: simpleSelectFields,
  });
  console.log(connectUserAndFragment);

  console.log("=== ConnectOrCreateRelations ===");
  const connectOrCreateRelations = await prisma.user.create({
    data: {
      name: randomName(),
      profile: {
        connectOrCreate: {
          where: {
            // Inexist Id
            id: 9999,
          },
          create: {
            bio: randomBio(),
          },
        },
      },
      posts: {
        connectOrCreate: {
          where: {
            // Inexist Id
            id: 9999,
          },
          create: {
            title: randomTitle(),
          },
        },
      },
      fragment: {
        connectOrCreate: {
          where: {
            id: 9999,
          },
          create: {
            indicator: randomFragment(),
          },
        },
      },
    },
  });
  console.log(connectOrCreateRelations);

  console.log("=== Conditions Query ===");
  const conditionsQuery = await prisma.user.findFirst({
    where: {
      name: constName,
      AND: {
        avaliable: true,
      },
      // OR: {
      //   profile: {
      //     is: {
      //       bio: randomBio(),
      //     },
      //   },
      // },
      // NOT: {
      //   age: 999,
      // },
    },
    orderBy: {
      id: "asc",
    },
    // cursor: {
    //   id: 0,
    // },
    take: 100,
  });
  console.log(conditionsQuery);

  console.log("=== Distinct Query ===");
  const distinctQuery = await prisma.user.findMany({
    distinct: ["name"],
    select: { id: true },
  });
  console.log(distinctQuery);

  await prisma.$disconnect();
})();
