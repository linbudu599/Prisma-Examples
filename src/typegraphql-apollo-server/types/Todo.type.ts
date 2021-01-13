import {
  ObjectType,
  Field,
  registerEnumType,
  ID,
  Int,
  InputType,
} from "type-graphql";
import {
  IsEnum,
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
} from "class-validator";

export enum ItemType {
  LIFE = "LIFE",
  FEATURE = "FEATURE",
  BUG = "BUG",
  IDEA = "IDEA",
}
registerEnumType(ItemType, {
  name: "ItemType",
  description: "Todo Item Type",
});

@ObjectType()
export default class TodoItem {
  @Field((type) => ID)
  id!: number;

  @Field()
  title!: string;

  // 对于可能为nul的原始类型的特殊处理
  @Field((type) => String, { nullable: true })
  content?: string | null;

  @Field()
  finished!: boolean;

  @Field()
  // 由于SQLite不支持enum, 如果这里使用enum会导致生成的Prisma Client类型不匹配
  type!: string;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @Length(2, 10)
  title!: string;

  @Field((type) => Int)
  @IsNumber()
  @IsPositive()
  userId!: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  content?: string;

  @Field({ nullable: true })
  @IsEnum(ItemType)
  @IsOptional()
  type?: string;
}

@InputType()
export class UpdateTodoInput {
  @Field((type) => Int)
  @IsNumber()
  @IsPositive()
  id!: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 10)
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  content?: string;

  @Field({ nullable: true })
  @IsEnum(ItemType)
  @IsOptional()
  type?: string;
}
