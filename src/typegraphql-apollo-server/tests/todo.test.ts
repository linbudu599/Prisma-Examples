import {
  createTestClient,
  ApolloServerTestClient,
} from "apollo-server-testing";

import { server } from "./../server";

import {
  QueryAllTodosDocument,
  QueryTodoByIdDocument,
  QueryTodoByStringDocument,
  QueryTodoByTypesDocument,
  QueryUserTodosDocument,
  ItemType,
  TodoItem,
  QueryQueryTodoByIdArgs,
  QueryQueryTodoByStringArgs,
  QueryQueryTodoByTypesArgs,
  QueryQueryUserTodosArgs,
} from "../generated";

let client: ApolloServerTestClient;

beforeAll(() => {
  client = createTestClient(server);
});

afterAll(() => {
  server.stop();
});

describe("Todo", () => {
  it("QueryAllTodos", async () => {
    const { query } = client;
    const res = await query({ query: QueryAllTodosDocument });
    const data = res.data.QueryAllTodos as TodoItem[];
    // 可以直接从seed中导入对象来验证 但我懒得搞了
    expect(data.length).toBe(3);
    expect(data[0].id).toBe("1");
    expect(data[0].title).toBe("Prisma");
  });

  it("QueryTodoById", async () => {
    const { query } = client;
    const res = await query({
      query: QueryTodoByIdDocument,
      variables: { id: 1 } as QueryQueryTodoByIdArgs,
    });
    const data = res.data.QueryTodoById as TodoItem;
    expect(data).toBeDefined();
    expect(data.id).toBe("1");
  });

  it("QueryTodoByString", async () => {
    const { query } = client;
    const res = await query({
      query: QueryTodoByStringDocument,
      variables: { str: "Better" } as QueryQueryTodoByStringArgs,
    });
    const data = res.data.QueryTodoByString as TodoItem[];
    expect(data.length).toBe(1);
    expect(data[0].id).toBe("3");
  });

  it("QueryTodoByTypes", async () => {
    const { query } = client;
    const res = await query({
      query: QueryTodoByTypesDocument,
      variables: { type: ItemType.Idea } as QueryQueryTodoByTypesArgs,
    });
    const data = res.data.QueryTodoByTypes as TodoItem[];
    expect(data.length).toBe(1);
    expect(data[0].id).toBe("2");
  });

  it("QueryUserTodos", async () => {
    const { query } = client;
    const res = await query({
      query: QueryUserTodosDocument,
      variables: { id: 1 } as QueryQueryUserTodosArgs,
    });
    const data = res.data.QueryUserTodos as TodoItem[];
    expect(data.length).toBe(2);
    expect(data[0].id).toBe("1");
  });
});
