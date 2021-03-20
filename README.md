# Prisma-Article-Example

&lt;&lt;Prisma: 下一代ORM, 不仅仅是ORM>> Demo 仓库

**鸽置**

## 规划

[ROADMAP](./ROADMAP.md)

## 开始

```bash
# 安装Prisma CLI
npm install prisma @prisma/client -S

# 进入任意一个目录下
cd single-model # 单表
cd multi-models # 多表关联

# 需要全局安装prisma
# 生成sqlite文件
prisma db push --preview-feature

# 生成prisma client文件
prisma generate

# 改动Prisma Schema后执行此命令来迁移数据库 并重新执行generate生成Prisma Client
prisma migrate

# 快速执行示例
npm run build
npm run invoke
```

## Advanced Multi-Models Example

### Model

### Relation

- `User` -> `Post`: **1-n**
- `User` -> `Profile`: **1-1** (Optional)
- `User` -> `Fragment`: **1-n**
- `Post` -> `Category`: **m-n**(connected by `CategoriesOnPosts` model)
- Self-Relation `User`

### with TypeGraphQL + Apollo-Server

- [Generated Schema](src/typegraphql-apollo-server/graphql/shema.graphql)
- [Prisma Model](src/typegraphql-apollo-server/prisma/schema.prisma)
- [Resolvers](src/typegraphql-apollo-server/resolvers/)

- Explore
  - `npm run dev` / `yarn dev`
  - open GraphiQL in [http://localhost:5999/graphql](http://localhost:5999/graphql)
  - [Example GraphQL Query / Mutation](src/typegraphql-apollo-server/graphql/)