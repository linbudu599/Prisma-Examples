import { Resolver, Query, Arg, Mutation, Ctx, Int } from "type-graphql";

import User, { CreateUserInput, UpdateUserInput } from "../types/User.type";

import { IContext } from "../typing";

@Resolver()
export default class UserResolver {
  constructor() {}

  @Query((returns) => [User])
  async QueryAllUsers(@Ctx() ctx: IContext): Promise<User[]> {
    return await ctx.prisma.user.findMany({
      include: { todos: true },
    });
  }

  @Query((returns) => User, { nullable: true })
  async QueryUserById(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: IContext
  ): Promise<User | null> {
    return await ctx.prisma.user.findUnique({
      where: {
        id,
      },
      include: { todos: true },
    });
  }

  @Query((returns) => [User], { nullable: true })
  async QueryUserByString(
    @Arg("str") str: string,
    @Ctx() ctx: IContext
  ): Promise<User[]> {
    return await ctx.prisma.user.findMany({
      where: {
        OR: [{ name: { contains: str } }, { nickName: { contains: str } }],
      },
      include: { todos: true },
    });
  }

  @Mutation((returns) => User, { nullable: true })
  async CreateUser(
    @Arg("createParams", (type) => CreateUserInput) params: CreateUserInput,
    @Ctx() ctx: IContext
  ): Promise<User> {
    return await ctx.prisma.user.create({
      data: {
        name: params.name,
        nickName: params?.nickName,
      },
      include: { todos: true },
    });
  }

  @Mutation((returns) => User, { nullable: true })
  async UpdateUser(
    @Arg("updateParams", (type) => UpdateUserInput) params: UpdateUserInput,
    @Ctx() ctx: IContext
  ): Promise<User> {
    return await ctx.prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name: params.name,
        nickName: params?.nickName,
      },
      include: { todos: true },
    });
  }

  @Mutation((returns) => User, { nullable: true })
  async DeleteUser(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: IContext
  ): Promise<User> {
    return await ctx.prisma.user.delete({
      where: { id },
    });
  }
}
