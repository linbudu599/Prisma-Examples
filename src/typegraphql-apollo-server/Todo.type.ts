import { ObjectType, Field, registerEnumType, ID, Int } from "type-graphql";

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

  @Field({ nullable: true })
  content?: boolean;

  @Field()
  finished!: boolean;

  @Field((type) => ItemType)
  type!: ItemType;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}
