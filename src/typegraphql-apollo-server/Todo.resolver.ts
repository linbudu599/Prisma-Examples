import { Resolver, Query, Arg, Mutation } from "type-graphql";

import TodoItem from "./Todo.type";

@Resolver()
export default class TodoResolver {
  constructor() {}

  @Query((returns) => [TodoItem])
  async QueryAllTodos(): Promise<TodoItem[]> {
    return [];
  }
}
