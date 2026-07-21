import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const strict = process.argv.includes("--strict");
const cli = resolve("node_modules", "@playwright", "test", "cli.js");
const result = spawnSync(
  process.execPath,
  [cli, "test", "e2e/performance.spec.ts", "--project=chromium", "--workers=1"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PERFORMANCE_AUDIT: "1",
      PERFORMANCE_STRICT: strict ? "1" : "0",
    },
  },
);

process.exit(result.status ?? 1);
