import { Resolver, Query, Arg, Mutation } from "type-graphql";

import User from "../types/User.type";

@Resolver()
export default class UserResolver {
  constructor() {}

  @Query((returns) => [User])
  async QueryAllUsers(): Promise<User[]> {
    return [];
  }
}
