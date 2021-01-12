module.exports = {
  outDir: "./dist",
  esbuild: {
    minify: false,
    target: "es2015",
  },
  assets: {
    baseDir: "src",
    filePatterns: ["**/*.json"],
  },
};
