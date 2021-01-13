import {
  IsString,
  Length,
  IsNumber,
  IsPositive,
  IsOptional,
} from "class-validator";
import { ObjectType, Field, ID, InputType, Int } from "type-graphql";

import TodoItem from "./Todo.type";

@ObjectType()
export default class User {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field((type) => String, { nullable: true })
  nickName?: string | null;

  @Field((type) => [TodoItem], { nullable: true })
  todos?: [TodoItem] | null;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(2, 10)
  name!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 10)
  nickName?: string;
}

@InputType()
export class UpdateUserInput {
  @Field((type) => Int)
  @IsNumber()
  @IsPositive()
  id!: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 10)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 10)
  nickName?: string;
}
