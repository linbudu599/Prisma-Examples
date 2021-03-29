const fs = require("fs-extra");
const chalk = require("chalk");

fs.copy("./src/single-model/prisma", "./dist/src/single-model/prisma")
  .then((_) => {
    console.log(chalk.green("=== Copy Single-Model Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy("./src/multi-models/prisma", "./dist/src/multi-models/prisma")
  .then((_) => {
    console.log(chalk.green("=== Copy Multi-Models Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy(
  "./src/multi-models-advanced/prisma",
  "./dist/src/multi-models-advanced/prisma"
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
  "./dist/src/typegraphql-apollo-server/prisma"
)
  .then((_) => {
    console.log(chalk.green("=== Copy TypeGraphQL-Apollo Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

// In multi-clients example we will re-generate client later
fs.copy(
  "./src/multi-clients/prisma-key/schema.prisma",
  "./dist/src/multi-clients/prisma-key/schema.prisma"
)
  .then((_) => {
    console.log(chalk.green("=== Copy Multi-DB(Key) Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy(
  "./src/multi-clients/prisma-value/schema.prisma",
  "./dist/src/multi-clients/prisma-value/schema.prisma"
)
  .then((_) => {
    console.log(chalk.green("=== Copy Multi-DB(Value) Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });

fs.copy("./src/with-typeorm/prisma", "./dist/src/with-typeorm/prisma")
  .then((_) => {
    console.log(chalk.green("=== Copy WithTypeORM Prisma Client ==="));
  })
  .catch((err) => {
    console.error(err);
  });
