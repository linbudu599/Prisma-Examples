import "reflect-metadata";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";

import TodoResolver from "./resolvers/Todo.resolver";
import UserResolver from "./resolvers/User.resolver";

import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

const spinner = ora({
  text: chalk.cyanBright("Starting Server... \n"),
}).start();

const schema = buildSchemaSync({
  resolvers: [TodoResolver, UserResolver],
  dateScalarMode: "timestamp",
  emitSchemaFile: path.resolve(__dirname, "./graphql/shema.graphql"),
});

const server = new ApolloServer({
  schema,
  introspection: true,
  context: { prisma },
  playground: {
    settings: {
      "editor.theme": "dark" as "dark",
      "editor.reuseHeaders": true,
      "editor.fontSize": 16,
      "editor.fontFamily": `'Fira Code', 'Source Code Pro', 'Consolas'`,
      "tracing.hideTracingResponse": false,
      "queryPlan.hideQueryPlanResponse": false,
    },
  },
});

server.listen(5999, () => {
  setTimeout(() => {
    spinner.succeed(
      chalk.greenBright(
        `[Apollo Server] Server ready at http://localhost:5999/graphql \n`
      )
    );
  }, 1000);
});
