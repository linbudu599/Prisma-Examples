import { Resolver, Query, Arg, Mutation, Ctx, Int } from "type-graphql";

import TodoItem, {
  ItemType,
  CreateTodoInput,
  UpdateTodoInput,
  BatchPayload,
} from "../types/Todo.type";

import { IContext } from "../typing";

@Resolver(TodoItem)
export default class TodoResolver {
  constructor() {}

  @Query((returns) => [TodoItem!]!)
  async QueryAllTodos(@Ctx() ctx: IContext): Promise<TodoItem[]> {
    return await ctx.prisma.todo.findMany({ include: { creator: true } });
  }

  @Query((returns) => TodoItem, { nullable: true })
  async QueryTodoById(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: IContext
  ): Promise<TodoItem | null> {
    return await ctx.prisma.todo.findUnique({
      where: {
        id,
      },
      include: { creator: true },
    });
  }

  @Query((returns) => [TodoItem!]!)
  async QueryTodoByString(
    @Arg("str") str: string,
    @Ctx() ctx: IContext
  ): Promise<TodoItem[]> {
    return await ctx.prisma.todo.findMany({
      where: {
        OR: [{ title: { contains: str } }, { content: { contains: str } }],
      },
      include: { creator: true },
    });
  }

  @Query((returns) => [TodoItem!]!)
  async QueryTodoByTypes(
    @Arg("type", (type) => ItemType) type: ItemType,
    @Ctx() ctx: IContext
  ): Promise<TodoItem[]> {
    return await ctx.prisma.todo.findMany({
      where: {
        type,
      },
      include: { creator: true },
    });
  }

  @Query((returns) => [TodoItem!]!)
  async QueryUserTodos(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: IContext
  ): Promise<TodoItem[]> {
    return await ctx.prisma.todo.findMany({
      where: {
        creatorId: id,
      },
    });
  }

  @Mutation((returns) => TodoItem, { nullable: true })
  async MutateTodoStatus(
    @Arg("id", (type) => Int) id: number,
    @Arg("status") status: boolean,
    @Ctx() ctx: IContext
  ): Promise<TodoItem | null> {
    try {
      return await ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          finished: status,
        },
        include: { creator: true },
      });
    } catch (error) {
      return null;
    }
  }

  @Mutation((returns) => TodoItem, { nullable: true })
  async CreateTodo(
    @Arg("createParams", (type) => CreateTodoInput) params: CreateTodoInput,
    @Ctx() ctx: IContext
  ): Promise<TodoItem | null> {
    try {
      return await ctx.prisma.todo.create({
        data: {
          title: params.title,
          content: params?.content,
          type: params?.type ?? ItemType.FEATURE,
          creator: {
            connect: {
              id: params.userId,
            },
          },
        },
        include: { creator: true },
      });
    } catch (error) {
      return null;
    }
  }

  @Mutation((returns) => TodoItem, { nullable: true })
  async UpdateTodo(
    @Arg("updateParams", (type) => UpdateTodoInput) params: UpdateTodoInput,
    @Ctx() ctx: IContext
  ): Promise<TodoItem | null> {
    try {
      return await ctx.prisma.todo.update({
        where: {
          id: params.id,
        },
        data: {
          title: params.title,
          content: params?.content,
          type: params?.type,
        },
        include: { creator: true },
      });
    } catch (error) {
      return null;
    }
  }

  @Mutation((returns) => TodoItem, { nullable: true })
  async DeleteTodoById(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: IContext
  ): Promise<TodoItem | null> {
    try {
      return await ctx.prisma.todo.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }

  @Mutation((returns) => BatchPayload)
  async DeleteUserTodos(
    @Arg("userId", (type) => Int) id: number,
    @Ctx() ctx: IContext
  ) {
    try {
      return await ctx.prisma.todo.deleteMany({
        where: {
          creatorId: id,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
