import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

const randomName = () => `林不渡-${Math.floor(Math.random() * 100000)}`;
const randomTitle = () => `Title-${Math.floor(Math.random() * 100000)}`;
const randomCategory = () => `Caterogy-${Math.floor(Math.random() * 100000)}`;
const randomBio = () => `Bio-${Math.floor(Math.random() * 100000)}`;
const randomFragment = () => `Fragment-${Math.floor(Math.random() * 100000)}`;

(async () => {
  const simpleSelectFields = {
    id: true,
    name: true,
    profile: true,
    posts: true,
    fragment: true,
  };

  const sampleUser = await prisma.user.create({
    data: {
      name: randomName(),
    },
  });

  console.log("=== Upsert User Only ===");
  // create on inexist
  // update on exist
  const upsertUserOnly = await prisma.user.upsert({
    where: {
      name: randomName(),
    },
    create: {
      name: randomName(),
    },
    update: {
      name: randomName(),
    },
    select: simpleSelectFields,
  });
  console.log(upsertUserOnly);

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

  console.log("=== Self 1-1 Relation ===");
  const connectToInvitor = await prisma.user.create({
    data: {
      name: randomName(),
      invitor: {
        connect: { id: upsertUserOnly.id },
      },
    },
    include: {
      invitor: true,
      invitation: true,
    },
  });
  console.log(connectToInvitor);

  console.log("Self 1-n Relation");
  const connectToInvitations = await prisma.user.create({
    data: {
      name: randomName(),
      invitation: {
        connect: [
          { id: upsertUserOnly.id },
          {
            id: sampleUser.id,
          },
        ],
      },
    },
    include: {
      invitor: true,
      invitation: true,
    },
  });
  console.log(connectToInvitations);

  console.log("=== Connect User & Fragment ===");
  const connectUserAndFragment = await prisma.user.update({
    where: {
      id: upsertUserOnly.id,
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
      fragment: {
        connectOrCreate: {
          where: {
            // nonexistent Id
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

  console.log("=== Explicit ManyToMany Operation ===");
  const p1 = await prisma.post.create({
    data: {
      title: "P1",
      author: {
        connectOrCreate: {
          where: {
            name: "A1",
          },
          create: {
            name: "A1",
          },
        },
      },
    },
  });

  const p2 = await prisma.post.create({
    data: {
      title: "P2",
      author: {
        connectOrCreate: {
          where: {
            name: "A2",
          },
          create: {
            name: "A2",
          },
        },
      },
    },
  });

  const c1 = await prisma.category.create({
    data: {
      name: "C1",
    },
  });

  const c2 = await prisma.category.create({
    data: {
      name: "C2",
    },
  });

  async function createCategoriesOnPostsRecord(cId: number, pId: number) {
    const cpRecord = await prisma.categoriesOnPosts.create({
      data: {
        post: {
          connect: {
            id: pId,
          },
        },
        category: {
          connect: {
            id: cId,
          },
        },
      },
    });
    console.log(
      `Record Create: Post${cpRecord.postId}-Caterogy${cpRecord.categoryId}`
    );
  }

  await createCategoriesOnPostsRecord(c1.id, p1.id);
  await createCategoriesOnPostsRecord(c1.id, p2.id);
  await createCategoriesOnPostsRecord(c2.id, p1.id);
  await createCategoriesOnPostsRecord(c2.id, p2.id);

  console.log("=== Batch Operation Basic Filtering ===");
  const batchOperation = await prisma.user.findMany({
    where: {
      // String Filter
      name: {
        // equals: "林不渡",
        // not: "INEXIST_STR",
        notIn: ["林不渡", "林不渡111"],
        // in: [],
        // lte gt gte
        // lt: "",
        contains: "不渡",
        startsWith: "林",
        // endsWith:"",
      },
      // Int Filter
      age: {
        // equal
        // not
        // in
        // notIn
        // lt lte gt gte
      },
      // Boolean Filter
      avaliable: {
        equals: true,
        not: false,
      },
    },
  });
  console.log(batchOperation);

  console.log("=== Multi Filter Conditions ===");
  const multiFilterCondition = await prisma.user.findMany({
    where: {
      // 通常会被省略掉
      AND: {
        avaliable: true,
      },
      // 所有均返回false
      // NOT: [],
      // 其中一组返回true
      OR: [
        {
          profile: {
            bio: {
              contains: "",
            },
          },
        },
        {
          age: {
            gt: 0,
          },
        },
      ],
    },
    select: { id: true },
  });

  console.log("=== Relation Filter Condition ===");

  const relationFilter = await prisma.category.findMany({
    where: {
      posts: {
        every: {
          // 所有关联均满足此条件
          postId: {
            gte: 1,
          },
        },
        // 在1-n m-n 情况下, 只要一条记录满足此条件
        some: {
          postId: {
            gte: 1,
          },
        },
        // 没有记录满足此条件
        none: {
          postId: {
            lte: 10,
          },
        },
      },
    },
    select: {
      id: true,
      posts: true,
    },
  });
  console.log(relationFilter);

  console.log("=== Include Filtering ===");

  // 返回拥有posts未发布的用户 也会包含没有posts的用户
  const includeFiltering1 = await prisma.user.findMany({
    include: {
      posts: {
        where: {
          published: false,
        },
        select: {
          id: true,
        },
      },
    },
  });

  console.log(
    "includeFiltering1: ",
    includeFiltering1.map((user) => ({
      id: user.id,
      postIds: user.posts.map((post) => post.id),
    }))
  );

  // 返回至少有一篇未发布文章的用户
  const includeFiltering2 = await prisma.user.findMany({
    where: {
      posts: {
        some: {
          published: false,
        },
      },
    },
    include: {
      posts: {
        where: {
          published: false,
        },
        select: {
          id: true,
        },
      },
    },
  });

  console.log(
    "includeFiltering2: ",
    includeFiltering2.map((user) => ({
      id: user.id,
      postIds: user.posts.map((post) => post.id),
    }))
  );

  console.log("=== Select Filtering ===");

  // 只会返回用户未发布的文章的标题
  const selectFiltering = await prisma.user.findMany({
    where: {
      avaliable: true,
    },
    select: {
      id: true,
      posts: {
        where: {
          published: false,
        },
        select: {
          title: true,
        },
      },
    },
  });

  console.log(
    selectFiltering
      .filter((record) => record.posts.length)
      .map((record) => ({
        id: record.id,
        postTitle: record.posts.map((post) => post.title),
      }))
  );

  await prisma.$disconnect();
})();
