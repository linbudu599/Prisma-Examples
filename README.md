# Prisma-Examples

![prisma](https://img.shields.io/github/package-json/dependency-version/linbudu599/Prisma-Article-Example/prisma) ![prisma-client](https://img.shields.io/github/package-json/dependency-version/linbudu599/Prisma-Article-Example/@prisma/client)

## Left Targets

- Example with MongoDB
- Example with Prisma Data Platform

## Getting Started

```bash
pnpm install

# Optional: Install Prisma CLI Globally
# @prisma/cli has been deprecated and prisma instead should be installed
pnpm install prisma -g

# run all examples in a single command!
pnpm start

# avaliable examples:

# single model
pnpm dev:single

# multi models & relations
pnpm dev:multi

# advanced multi models example
pnpm dev:advanced

# GraphQL example(TypeGraphQL + Apollo-Server)
pnpm dev:graphql

# with TypeORM
pnpm dev:with-typeorm

# generate Prisma Client for all examples
pnpm gen:client

# common prisma commands

# sync Prisma Schema with database(in this repo, will generate sqlite file)
prisma db push

# generate Prisma Client from prisma schema
prisma generate

# execute this command to invoke database migration after Prisma Schema got modified
prisma migrate

# generate Prisma Schema from exist database
prisma introspect

# run test cases（GraphQL example）
pnpm test:graphql
```

## Advanced Multi-Models Example

### Relation

- `User` -> `Post`: **1-n**
- `User` -> `Profile`: **1-1** (Optional in User, Required in Profile)
- `User` -> `Fragment`: **1-n** (Optional in User, Optional in Fragment)
- `Post` -> `Category`: **m-n**(connected by `CtegoriesOnPosts` model)
- Self-Relation: `User.invitor`(**1-1**) & `User.invitation`(**1-n**)

## With TypeGraphQL + Apollo-Server

- [Generated Schema](src/typegraphql-apollo-server/graphql/shema.graphql)
- [Generated TypeScript Code](src/typegraphql-apollo-server/generated/index.ts)
- [Prisma Model](src/typegraphql-apollo-server/prisma/schema.prisma)
- [Resolvers](src/typegraphql-apollo-server/resolvers/)
- Explore
  - `pnpm dev`
  - open GraphiQL in [http://localhost:5999/graphql](http://localhost:5999/graphql)
  - [Example GraphQL Query / Mutation](src/typegraphql-apollo-server/graphql/)(arguments in operations are from database initial data seeding)
  - [GenQL: Type Safe Graphql Query Builder](https://github.com/remorses/genql): `pnpm gen:genql` (**Require local server online**)，[Example](src/typegraphql-apollo-server/graphql/genql.ts)
- Test:
  - database in GraphQL example will be reset before running test cases.

<!-- ## Multi-Clients

The design of Prisma Client enables you to generate client from various schemas(different databse type / different database connection / different feature configuration / ...)

Check [Multi-Clients](src/multi-clients/index.ts) for details。 -->

## With Other ORMs

### With TypeORM(SQLite + SQLite)

[Example](src/with-typeorm/index.ts)

## With NestJS

- Create `PrismaService` which extends `PrismaClient`:

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

- Register `PrismaService` as a provider, and `PrismaModule` as a Global module:

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

- Import `PrismaModule` in `AppModule`:

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

- Use `PrismaService`:

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

## Unit Test

- see [prisma-unit-test](./prisma-unit-test) folder.
