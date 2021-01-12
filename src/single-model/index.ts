import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const result = await next(params);
  return result;
});

async function createTodo(title: string, content?: string) {
  const res = await prisma.todo.create({
    data: {
      title,
      content,
    },
  });
  return res;
}

async function getTodos(status?: boolean) {
  const res = await prisma.todo.findMany({
    orderBy: [{ id: "desc" }],
    where: {
      finished: status,
    },
    // 不能exclude?
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });
  return res;
}

async function getTodoById(id: number) {
  const res = await prisma.todo.findUnique({
    where: { id },
  });
  return res;
}

async function updateTodo(
  id: number,
  title?: string,
  content?: string,
  finished?: boolean
) {
  const res = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      finished,
    },
  });
  return res;
}

async function deleteTodo(id: number) {
  const res = await prisma.todo.delete({
    where: { id },
  });
  return res;
}

async function clear() {
  const res = await prisma.todo.deleteMany();
  return res;
}

async function convertStatus(status: boolean) {
  const res = await prisma.todo.updateMany({
    // data: {
    //   finished:status
    // }
    data: {
      finished: {
        set: status,
      },
    },
  });

  return res;
}

(async () => {
  const createRes = await createTodo(
    `Learn Prisma2 and take deep breath for ${Math.floor(
      Math.random() * 50
    )} times`,
    "Oops"
  );
  console.log("CREATE");
  console.log(createRes);

  const queryAllRes = await getTodos();
  console.log("QUERY_ALL");
  console.log(queryAllRes.map((item) => item.id));

  const querySingleRes = await getTodoById(queryAllRes[0].id);
  console.log("QUERY_ONE");
  console.log(querySingleRes);

  const updateSingleRes = await updateTodo(
    queryAllRes[0].id,
    "UPDATED_TITLE",
    "UPDATED_CONTENT",
    true
  );
  console.log("UPDATE_SINGLE");
  console.log(updateSingleRes);

  const deleteSingleRes = await deleteTodo(queryAllRes[0].id);
  console.log("DELETE_ONE");
  console.log(deleteSingleRes);

  const finishAllRes = await convertStatus(true);
  console.log("FINISH_ALL");
  console.log(finishAllRes);

  const clearRes = await clear();
  console.log("CLEAR_ALL");
  console.log(clearRes);

  await prisma.$disconnect();
})();
