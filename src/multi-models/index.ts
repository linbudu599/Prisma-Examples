import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

const randomName = () => `Linbudu-${Math.floor(Math.random() * 100000)}`;
const randomTitle = () => `Title-${Math.floor(Math.random() * 100000)}`;
const randomCategory = () => `Caterogy-${Math.floor(Math.random() * 100000)}`;
const randomBio = () => `Bio-${Math.floor(Math.random() * 100000)}`;

// return All scalars and No Relations
// use select to return fields & nested relations
// use include to include relations

// user
// - profile
// - post
//   - category

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

  const createUserOnly = await prisma.user.create({
    data: {
      name: randomName(),
    },
    select: simpleSelectFields,
  });

  console.log("=== Create User Only ===");
  console.log(createUserOnly);

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
        // Provide transactional guarantees for creating,
        // updating or deleting data across multiple tables in a single Prisma Client query
        create: {
          title: randomTitle(),
          content: "鸽置",
          categories: {
            create: [{ name: "NodeJS" }, { name: "GraphQL" }],
          },
        },
      },
    },
    include: simpleIncludeFields,
  });

  console.log("=== Create User With Full Relations ===");
  console.log(createUserWithFullRelations);

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

  const connectOrCreateRelationsUser = await prisma.user.create({
    data: {
      name: randomName(),
      profile: {
        connectOrCreate: {
          where: {
            // nonexistent Id
            id: 9999,
          },
          // use props below to create
          create: {
            bio: "Created by connectOrCreate",
          },
        },
      },
      posts: {
        connectOrCreate: {
          where: {
            // nonexistent Id
            id: 9999,
          },
          // use props below to create
          create: {
            title: "Created by connectOrCreate",
          },
        },
      },
    },
    select: simpleSelectFields,
  });
  console.log("=== Connect Or Create Relations ===");
  console.log(connectOrCreateRelationsUser);

  const conditionsQuery = await prisma.user.findMany({
    where: {
      // Prisma.StringFilter
      name: {
        // equals/not/in/notIn
        // lt/lte gt/gte contains
        // startsWith endsWith
        equals: connectOrCreateRelationsUser.name,
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

  // Find all users with different name
  const distinctNameQuery = await prisma.user.findMany({
    // only supports plain scalars
    distinct: ["name"],
    select: { id: true },
  });

  console.log("=== Distinct Name Query ===");
  console.log(distinctNameQuery);

  const distinctRelationPostQuery = await Promise.all(
    (
      await prisma.post.findMany({
        distinct: "postUUID",
        select: { id: true },
      })
    ).map(({ id: postId }) =>
      prisma.user.findFirst({
        where: {
          posts: {
            some: {
              id: postId,
            },
          },
        },
        select: { id: true },
      })
    )
  );
  console.log("=== Distinct Relation Post Query ===");
  console.log(distinctRelationPostQuery);

  const oneToOneUpdate = await prisma.user.update({
    where: {
      name: connectOrCreateRelationsUser.name,
    },
    data: {
      profile: {
        update: {
          bio: "Updated Bio",
        },
        // update
        // upsert
        // delete
        // disconnect(true)
        // create
        // connect
        // connectOrCreate
        // set doesnot exist!
      },
    },
    select: simpleSelectFields,
  });
  console.log("=== OneToOne Relation Update ===");
  console.log(oneToOneUpdate);

  const oneToMnayUpdate = await prisma.user.update({
    where: {
      name: connectOrCreateRelationsUser.name,
    },
    data: {
      posts: {
        updateMany: {
          data: {
            title: "Updated Post Title",
          },
          where: {},
        },
        // set 与 many, 以及各选项类型
        // set: [],
        // update
        // updateMany
        // delete
        // deleteMany
        // disconnect: [
        //   {
        //     id: 1,
        //   },
        // ],
        // connect
        // create
        // connectOrCreate
        // upsert
      },
    },
    select: simpleSelectFields,
  });
  console.log("=== OneToMany Relation Update ===");
  console.log(oneToMnayUpdate);

  // 类似于oneToMany
  // const manyToManyUpdate = await prisma.post.update({
  //   where: {
  //     id: connectOrCreateRelationsUser.posts[0].id,
  //   },
  //   data: {
  //     categories: {},
  //   },
  // });

  await prisma.$disconnect();
})();
