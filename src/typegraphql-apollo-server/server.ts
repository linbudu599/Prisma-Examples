import "reflect-metadata";
import path from "path";

import chalk from "chalk";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";

import TodoResolver from "./resolvers/Todo.resolver";
import UserResolver from "./resolvers/User.resolver";

import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

const schema = buildSchemaSync({
  resolvers: [TodoResolver, UserResolver],
  dateScalarMode: "timestamp",
  emitSchemaFile: path.resolve(__dirname, "./graphql/shema.graphql"),
});

export const server = new ApolloServer({
  schema,
  introspection: true,
  context: { prisma },

  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            "editor.theme": "dark" as const,
            "editor.reuseHeaders": true,
            "editor.fontSize": 16,
            "editor.fontFamily": `'Fira Code', 'Source Code Pro', 'Consolas'`,
          },
        }),
  ],
});

server.listen(5999, () => {
  console.log(
    chalk.greenBright(
      `[Apollo Server] Server ready at http://localhost:5999/graphql \n`
    )
  );
});
