import { ObjectType, Field, registerEnumType, ID } from "type-graphql";

import TodoItem from "./Todo.type";

@ObjectType()
export default class User {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field((type) => [TodoItem], { nullable: true })
  todos?: [TodoItem] | null;
}
