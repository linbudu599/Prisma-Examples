import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

const randomName = () => `林不渡-${Math.floor(Math.random() * 100000)}`;
const randomTitle = () => `Title-${Math.floor(Math.random() * 100000)}`;
const randomCategory = () => `Caterogy-${Math.floor(Math.random() * 100000)}`;
const randomBio = () => `Bio-${Math.floor(Math.random() * 100000)}`;

// return ALL scalars and None Relations
// use select to return fields & nested relations
// use include to include relations

(async () => {
  const simpleSelectFields = {
    id: true,
    name: true,
    profile: true,
    posts: true,
  };

  const simpleIncludeFields = {
    profile: true,
    posts: {
      include: {
        categories: true,
      },
    },
  };
  const createUserWithFullRelations = await prisma.user.create({
    data: {
      name: randomName(),
      age: 21,
      profile: {
        create: {
          bio: randomBio(),
        },
      },
      posts: {
        create: {
          title: randomTitle(),
          content: "鸽置",
          categories: {
            create: [{ name: "NodeJS" }, { name: "GraphQL" }],
          },
        },
      },
    },
    // select: simpleSelectFields
    include: simpleIncludeFields,
  });

  console.log("=== Create User With Full Relations ===");
  console.log(createUserWithFullRelations);

  const createUserOnly = await prisma.user.create({
    data: {
      name: randomName(),
    },
    select: simpleSelectFields,
  });

  console.log("=== Create User Only ===");
  console.log(createUserOnly);

  const createProfileOnly = await prisma.profile.create({
    data: {
      bio: randomBio(),
    },
    include: {
      user: true,
    },
  });

  console.log("=== Create Profile Only ===");
  console.log(createProfileOnly);

  const connectOrCreateRelations = await prisma.user.create({
    data: {
      name: randomName(),
      profile: {
        connectOrCreate: {
          where: {
            // nonexistent Id
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
            // nonexistent Id
            id: 9999,
          },
          create: {
            title: randomTitle(),
          },
        },
      },
    },
    select: simpleSelectFields,
  });
  console.log("=== Connect Or Create Relations ===");
  console.log(connectOrCreateRelations);

  const conditionsQuery = await prisma.user.findMany({
    where: {
      name: {
        // equals not in notIn lt/lte gt/gte contains
        // startsWith endsWith
        equals: connectOrCreateRelations.name,
      },
      // age: {
      //   gte: 0,
      // },
      // AND
      // AND: {
      //   avaliable: true,
      // },
      // OR
      // OR: {
      //   profile: {
      //     is: {
      //       bio: randomBio(),
      //     },
      //   },
      // },
      // NOT
      // NOT: {
      //   age: 999,
      // },
    },
    orderBy: {
      id: "asc",
    },
    // pagination
    // cursor: {
    //   id: 0,
    // },
    // take: 100,
  });

  console.log("=== Conditions & Pagination Query ===");
  console.log(conditionsQuery);

  // const distinctQuery = await prisma.user.findMany({
  //   distinct: ["name"],
  // // FIXME:
  // // select: { id: true },
  // });

  // console.log("=== Distinct Query ===");
  // console.log(distinctQuery);

  const oneToOneUpdate = await prisma.user.update({
    where: {
      name: connectOrCreateRelations.name,
    },
    data: {
      profile: {
        // update
        // upsert
        // delete
        // disconnect(true)
        // create
        // connect
        // connectOrCreate
        // 没有set
      },
    },
    select: simpleSelectFields,
  });
  console.log("=== OneToOne Relation Update ===");
  console.log(oneToOneUpdate);

  const oneToMnayUpdate = await prisma.user.update({
    where: {
      name: connectOrCreateRelations.name,
    },
    data: {
      posts: {
        // set 与 many, 以及各选项类型
        // set: [],
        // updateMany
        // deleteMany
        // disconnect: [
        //   {
        //     id: 1,
        //   },
        // ],
      },
    },
    select: simpleSelectFields,
  });
  console.log("=== OneToMany Relation Update ===");
  console.log(oneToMnayUpdate);

  await prisma.$disconnect();
})();
