const fs = require("fs-extra");
const chalk = require("chalk");

fs.copy("./src/single-model/prisma", "./dist/single-model/prisma")
  .then((_) => {
    console.log(chalk.green("=== Copy Single-Model Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy("./src/multi-models/prisma", "./dist/multi-models/prisma")
  .then((_) => {
    console.log(chalk.green("=== Copy Multi-Models Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy(
  "./src/multi-models-advanced/prisma",
  "./dist/multi-models-advanced/prisma"
)
  .then((_) => {
    console.log(
      chalk.green("=== Copy Multi-Models-Advanced Prisma Client ===")
    );
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy(
  "./src/typegraphql-apollo-server/prisma",
  "./dist/typegraphql-apollo-server/prisma"
)
  .then((_) => {
    console.log(chalk.green("=== Copy TypeGraphQL-Apollo Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });
