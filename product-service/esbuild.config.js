import * as esbuild from "esbuild";

await esbuild
  .build({
    entryPoints: [
      "./package.json",
      "./mocks/mockData.js",
      "./handlers/availableProducts.js",
      "./handlers/product.js",
    ],
    bundle: true,
    outdir: "dist",
  })
  .catch(() => process.exit(1));
