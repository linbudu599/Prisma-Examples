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

  console.log("=== Conditions & Pagination Query ===");
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

  // console.log("=== Distinct Query ===");
  // const distinctQuery = await prisma.user.findMany({
  //   distinct: ["name"],
  //   select: { id: true },
  // });
  // console.log(distinctQuery);

  console.log("=== OneToOne Relation Update ===");
  const oneToOneUpdate = await prisma.user.update({
    where: {
      name: "林不渡",
    },
    data: {
      age: {
        set: 599,
      },
      profile: {
        // update
        // upsert
        // delete
        // disconnect
        // create
        // connect
        // connectOrCreate
        // disconnect:true
        // 没有set
      },
    },
    select: simpleSelectFields,
  });
  console.log(oneToOneUpdate);

  console.log("=== OneToMany Relation Update ===");
  const oneToMnayUpdate = await prisma.user.update({
    where: {
      name: "林不渡",
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
  console.log(oneToMnayUpdate);

  console.log("=== Explicit ManyToMany Operation ===");
  const p1 = await prisma.post.create({
    data: {
      title: "P1",
      author: {
        connectOrCreate: {
          where: {
            name: "U1",
          },
          create: {
            name: "U1",
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
            name: "U2",
          },
          create: {
            name: "U2",
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

  //   where: {
  //     postId_categoryId: {
  //       postId: p1.id,
  //       categoryId:c1.id
  //   }
  // },

  await createCategoriesOnPostsRecord(c1.id, p1.id);
  await createCategoriesOnPostsRecord(c1.id, p2.id);
  await createCategoriesOnPostsRecord(c2.id, p1.id);
  await createCategoriesOnPostsRecord(c2.id, p2.id);

  console.log("=== Filtering Summary ===");

  console.log("=== Batch Operation Basic Filtering ===");
  const batchOperation = await prisma.user.findMany({
    where: {
      // String Filter
      name: {
        // equals: "林不渡",
        // not: "INEXIST_STR",
        in: ["林不渡", "林不渡1"],
        // notIn: [],
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
      NOT: [],
      // 其中一组返回true
      OR: [
        {
          profile: {
            bio: "xxx",
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
  console.log(multiFilterCondition);

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
  // const includeFiltering = await prisma.user.findMany({
  //   include: {
  //     Profile: {
  //       where: {}
  //     }
  //   }
  // })

  // 返回拥有posts未发布的用户 也会包含没有posts的用户
  const includeFiltering1 = await prisma.user.findMany({
    include: {
      posts: {
        where: {
          published: false,
        },
      },
    },
  });

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
      },
    },
  });

  console.log("=== Select Filtering ===");

  // 只会返回用户未发布的文章的标题
  const selectFiltering = await prisma.user.findMany({
    where: {
      avaliable: true,
    },
    select: {
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
  await prisma.$disconnect();
})();
