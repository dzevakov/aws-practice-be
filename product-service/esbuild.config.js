import * as esbuild from "esbuild";

await esbuild
  .build({
    entryPoints: [
      "./index.js"
    ],
    bundle: true,
    outdir: "dist",
  })
  .catch(() => process.exit(1));
