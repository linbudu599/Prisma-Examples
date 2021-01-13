# Prisma-Article-Example

&lt;&lt;Prisma: 下一代ORM, 不仅仅是ORM>> Demo 仓库

**鸽置**

## 规划

[ROADMAP](./ROADMAP.md)

## 开始

```bash
# 安装Prisma CLI
npm install @prisma/cli @prisma/client -g
yarn global add @prisma/cli @prisma/client

# 进入任意一个目录下
cd single-model # 单表
cd multi-models # 多表关联

# 生成sqlite文件
prisma db push --preview-feature

# 生成prisma client文件
prisma generate

# 改动Prisma Schema后执行此命令来迁移数据库 并重新执行generate生成Prisma Client
prisma migrate
```

### with TypeGraphQL + Apollo-Server

- [Generated Schema](src/typegraphql-apollo-server/graphql/shema.graphql)
- [Prisma Model](src/typegraphql-apollo-server/prisma/schema.prisma)
- [Resolvers](src/typegraphql-apollo-server/resolvers/)

- Explore
  - `npm run dev` / `yarn dev`
  - open GraphiQL in [http://localhost:5999/graphql](http://localhost:5999/graphql)
  - [Example GraphQL Query / Mutation](src/typegraphql-apollo-server/graphql/)