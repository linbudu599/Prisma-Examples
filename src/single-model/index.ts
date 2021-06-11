import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

// middleware
prisma.$use(async (params, next) => {
  // model
  // action
  // args
  // dataPath
  // runInTransaction
  const result = await next(params);
  return result;
});

async function createTodo(title: string, content?: string) {
  const res = await prisma.todo.create({
    data: {
      title,
      content: content ?? null,
    },
  });
  return res;
}

async function getTodos(status?: boolean) {
  const res = await prisma.todo.findMany({
    orderBy: [{ id: "desc" }],
    where: status
      ? {
          finished: status,
        }
      : {},
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
  const origin = await prisma.todo.findUnique({
    where: { id },
  });

  if (!origin) {
    throw new Error("Item Inexist!");
  }

  const res = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title: title ?? origin.title,
      content: content ?? origin.content,
      finished: finished ?? origin.finished,
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

async function convertStatus(status: boolean) {
  const res = await prisma.todo.updateMany({
    where: {
      finished: !status,
    },
    data: {
      finished: {
        set: status,
      },
    },
  });

  return res;
}

async function clear() {
  const res = await prisma.todo.deleteMany();
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

  const querySingleRes = await getTodoById(createRes.id);
  console.log("QUERY_ONE");
  console.log(querySingleRes);

  const updateSingleRes = await updateTodo(
    createRes.id,
    "UPDATED_TITLE",
    "UPDATED_CONTENT"
  );
  console.log("UPDATE_SINGLE");
  console.log(updateSingleRes);

  const finishAllRes = await convertStatus(true);
  console.log("FINISH_ALL");
  console.log(finishAllRes);

  const deleteSingleRes = await deleteTodo(createRes.id);
  console.log("DELETE_ONE");
  console.log(deleteSingleRes);

  const clearRes = await clear();
  console.log("CLEAR_ALL");
  console.log(clearRes);

  await prisma.$disconnect();
})();
