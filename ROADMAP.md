# Prisma：下一代ORM，不仅仅是ORM

## 前言

- ORM定义、发展历程
- TypeORM、Sequelize...
- SQL(Query)Builder vs ORM vs Prisma
- GraphQL + Prisma + GraphQL-Code-Generator + GenQL: 全链路的类型安全保障

## 初始化 & CLI 命令

- `prisma init`：创建一个prisma项目

- `prisma generate`：生成prisma client
  - 控制生成的位置
  - 指定schema位置
- `prisma introspect`：基于数据库生成schema
  - 一笔带过
  - `prisma db pull`
- `prisma db push`：在不记录迁移的情况下应用变更，会重新生成Prisma Client
  - `--accept-data-loss`
- `prisma migrate`：数据库变更
- schema.prisma: datasource & provider & model
- Prisma Client 初始化 + 实例化
- SQLite 简介



## 基本

- 基本Schema语法
  - datasource
  - generator
  - model
  - 环境变量自动读取
  - 数据类型 标量
    - 数据库类型属性`@db.VarChar`
    - ?
    - []
  - 使用VSCode来获得高亮
  - model相关
    - 入门：简单的单个model
    - 进阶：级联关系，多model
  - @unique 和 @@unique 多级约束
  - 带过： @@index 索引
  - 内置函数



## Single-REST-CRUD

- 标量字段scalar fields
- 语法(类比GraphQL Schema)
- 字段属性@ 区块属性@@
  - @id @@id @@unique @@index等
- 内置函数
  - cuid uuid等PK
  - now dbgenerated等
- demo
- 查询、查询选项、嵌套查询、条件过滤与操作符、标量过滤
- 原子操作



## 级联-GraphQL-CRUD

- 1-1 1-n m-n
- :information_source: model @relation @relationId
- Cascade CRUD
- :information_source: Special Cascade Delete
- demo
- 级联查询



## 探索

- 工作原理
- UNDER_THE_HOOD
- DataLoader & GraphQL n+1 https://github.com/prisma/prisma/blob/master/src/packages/client/src/runtime/Dataloader.ts
- prisma studio
- BlitzJS & RedwoodJS
- TypeGraphQL  