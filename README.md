# Prisma-Article-Example
&lt;&lt;Prisma: 下一代ORM, 不仅仅是ORM>> Demo 仓库

鸽置

## 规划

[ROADMAP](./ROADMAP.md)

## 开始

```bash
# 安装Prisma CLI
npm install @prisma/cli -g
yarn global add @prisma/cli

# 进入任意一个目录下
cd single-model
cd multi-models

# 生成sqlite文件
prisma db push --preview-feature

# 生成prisma client文件
prisma generate

# 改动Prisma Schema后执行此命令来迁移数据库 并重新执行generate生成Prisma Client
prisma migrate
```