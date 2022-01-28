# Prisma-Article-Example

**Prisma: 下一代 ORM, 不仅仅是 ORM** Demo 仓库

**简体中文** | [**English**](./README.md)

## 开始

```bash
pnpm install

# 可选：将Prisma CLI安装到全局
# 新版本中@prisma/cli已被弃用，更名为prisma
pnpm install prisma -g

# 从零开始创建-编译-执行所有案例
pnpm flow

# 目前可用的示例：
# 单表
cd single-model
 # 多表关联
cd multi-models
 # 多表关联下的进阶使用
cd multi-models-advanced
# GraphQL 示例
cd typegraphql-apollo-server
# 多数据库示例
cd multi-clients
# 与 TypeORM / TypeGoose 一同使用
cd with-typeorm
cd with-typegoose

# 为所有示例生成Prisma Client
pnpm gen:client

# prisma 常见命令

# 同步schema到数据库(本例中是生成sqlite文件)
prisma db push --preview-feature

# 生成prisma client文件
prisma generate

# 改动Prisma Schema后执行此命令来迁移数据库 并重新执行generate生成Prisma Client
prisma migrate

# 从已有的数据库生成prisma schema
prisma introspect

# 执行测试（GraphQL 示例）
pnpm test
```

## Advanced Multi-Models Example

### Relation

- `User` -> `Post`: **1-n**
- `User` -> `Profile`: **1-1** (在 `User` 表中可选, 在 `Profile` 表中必选)
- `User` -> `Fragment`: **1-n** (在 `User`/`Fragment` 表中可选)
- `Post` -> `Category`: **m-n**(使用额外的 `CategoriesOnPosts` 表来连结)
- Self-Relation（自关联）: `User.invitor`(**1-1**) & `User.invitation`(**1-n**)

## With TypeGraphQL + Apollo-Server

- [Generated Schema](src/typegraphql-apollo-server/graphql/shema.graphql)
- [Generated TypeScript Code](src/typegraphql-apollo-server/generated/index.ts)
- [Prisma Model](src/typegraphql-apollo-server/prisma/schema.prisma)
- [Resolvers](src/typegraphql-apollo-server/resolvers/)
- Explore
  - `pnpm dev`
  - open GraphiQL in [http://localhost:5999/graphql](http://localhost:5999/graphql)
  - [Example GraphQL Query / Mutation](src/typegraphql-apollo-server/graphql/)(查询语句中的参数（如 ID）需要你完成数据库初始数据填充后，再使用初始数据的 ID)
  - [GenQL: Type Safe Graphql Query Builder](https://github.com/remorses/genql): `pnpm gen:genql` (**Require local server online**)，[Example](src/typegraphql-apollo-server/graphql/genql.ts)
- Test:
  - 在执行测试用例前，会清空并重新生成 GraphQL 示例下的数据库初始数据。

## Multi-Clients

Prisma Client 的机制使得你可以使用多个 schema（即不同的数据库类型、不同的数据库连接、不同的 feature 开启配置等）来生成多个 client，然后分别导入这些 client 即可。

查看 [Multi-Clients](src/multi-clients/index.ts) 来获得具体示例。

## With Other ORMs

### With TypeORM(SQLite + SQLite)

[Example](src/with-typeorm/index.ts)

### With TypeGoose(SQLite + MongoDB)

[Example](src/with-typegoose/index.ts)

## With NestJS

- 基于`PrismaClient`创建`PrismaService`:

  ```typescript
  import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    OnApplicationBootstrap,
    OnApplicationShutdown,
  } from "@nestjs/common";
  import { PrismaClient } from "@prisma/client";

  @Injectable()
  export class PrismaService
    extends PrismaClient
    implements
      OnModuleInit,
      OnApplicationBootstrap,
      OnModuleDestroy,
      OnApplicationShutdown
  {
    constructor() {
      super();
    }

    async onModuleInit() {
      await this.$connect();
    }

    async onApplicationBootstrap() {
      // await seeds();
    }

    async onModuleDestroy() {}

    async onApplicationShutdown() {
      await this.$disconnect();
    }
  }
  ```

- 将`PrismaService`注册为自定义提供者, 同时将`PrismaModule`注册为全局模块:

  ```typescript
  import { Global, Module } from "@nestjs/common";

  import { PrismaService } from "./prisma.service";

  @Global()
  @Module({
    providers: [PrismaService],
    exports: [PrismaService],
  })
  export default class PrismaModule {}
  ```

- 在`AppModule`导入`PrismaModule`:

  ```typescript
  import PrismaModule from "./prisma/prisma.module";

  @Module({
    imports: [PrismaModule],
  })
  export class AppModule
    implements NestModule, OnApplicationBootstrap, OnApplicationShutdown
  {
    constructor(private readonly connection: Connection) {}

    async configure(
      consumer: MiddlewareConsumer
    ): Promise<void | MiddlewareConsumer> {}

    // you can connect/disconnect prisma client here
    async onApplicationBootstrap() {}

    async onApplicationShutdown() {}
  }
  ```

- 使用`PrismaService`:

  ```typescript
  import { Injectable } from "@nestjs/common";
  import { PrismaService } from "../../prisma/prisma.service";

  @Injectable()
  export class UserService {
    constructor(private prisma: PrismaService) {}

    async queryAllUsers() {
      const res = await this.prisma.user.findMany({});
      return res;
    }
  }
  ```
