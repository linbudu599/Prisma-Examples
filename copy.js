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
