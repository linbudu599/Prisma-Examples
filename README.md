# Prisma-Article-Example

&lt;&lt;Prisma: 下一代ORM, 不仅仅是ORM>> Demo 仓库


## 开始

```bash
npm install

# 可选：将Prisma CLI安装到全局
# 新版本@中prisma/cli已被弃用，更名为prisma
npm install prisma -g

# 可用示例：
# 单表
cd single-model
 # 多表关联
cd multi-models
 # 多表关联下的进阶使用
cd multi-models-advanced
# GraphQL 示例
cd typegraphql-apollo-server 
# 多数据库示例
cd multi-databases

# 为所有示例生成Prisma Client
npm run gen:client

# 需要全局安装prisma

# 生成sqlite文件
prisma db push --preview-feature

# 生成prisma client文件
prisma generate

# 改动Prisma Schema后执行此命令来迁移数据库 并重新执行generate生成Prisma Client
# prisma migrate

# 快速执行示例
npm run build
npm run invoke

# 执行测试（GraphQL 示例）
npm run test
```

## Advanced Multi-Models Example

### Relation

- `User` -> `Post`: **1-n**
- `User` -> `Profile`: **1-1** (Optional in User, Required in Profile)
- `User` -> `Fragment`: **1-n** (Optional in User, Optional in Fragment)
- `Post` -> `Category`: **m-n**(connected by `CtegoriesOnPosts` model)
- Self-Relation: `User.invitor`(**1-1**) & `User.invitation`(**1-n**)

### with TypeGraphQL + Apollo-Server

- [Generated Schema](src/typegraphql-apollo-server/graphql/shema.graphql)
- [Generated TypeScript Code](src/typegraphql-apollo-server/generated/index.ts)
- [Prisma Model](src/typegraphql-apollo-server/prisma/schema.prisma)
- [Resolvers](src/typegraphql-apollo-server/resolvers/)
- Explore
  - `npm run dev`
  - open GraphiQL in [http://localhost:5999/graphql](http://localhost:5999/graphql)
  - [Example GraphQL Query / Mutation](src/typegraphql-apollo-server/graphql/)(查询语句中的参数（如ID）需要你完成数据库初始数据填充后，再使用初始数据的ID)
  - [GenQL: Type Safe Graphql Query Builder](https://github.com/remorses/genql): `npm run gen:genql` (**Require local server online**)，[Example](src/typegraphql-apollo-server/graphql/genql.ts)
- Test:
  - 在执行测试用例前，会清空并重新生成GraphQL示例下的数据库初始数据。

### with NestJS

- Create `PrismaService` which extends `PrismaClient`:

  ```typescript
  import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';

  @Injectable()
  export class PrismaService
    extends PrismaClient
    implements
      OnModuleInit,
      OnApplicationBootstrap,
      OnModuleDestroy,
      OnApplicationShutdown {
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

- Register `PrismaService` as a provider, and `PrismaModule` as a Global module:

  ```typescript
  import { Global, Module } from '@nestjs/common';

  import { PrismaService } from './prisma.service';

  @Global()
  @Module({
    providers: [PrismaService],
    exports: [PrismaService],
  })
  export default class PrismaModule {}
  ```

- Import `PrismaModule` in `AppModule`:

  ```typescript
  import PrismaModule from './prisma/prisma.module';

  @Module({
    imports: [PrismaModule],
  })
  export class AppModule
    implements NestModule, OnApplicationBootstrap, OnApplicationShutdown {
    constructor(private readonly connection: Connection) {}

    async configure(
      consumer: MiddlewareConsumer
    ): Promise<void | MiddlewareConsumer> {
    
    }

    // you can connect/disconnect prisma client here
    async onApplicationBootstrap() {}

    async onApplicationShutdown() {}
  }
  ```

- Use `PrismaService`:

  ```typescript
  import { Injectable } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';

  @Injectable()
  export class UserService {
    constructor(private prisma: PrismaService) {}

    async queryAllUsers() {
      const res = await this.prisma.user.findMany({});
      return res;
    }
  }
  ```