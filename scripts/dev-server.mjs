import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(
  process.execPath,
  [nextBin, "dev", "--hostname", "127.0.0.1", "--port", "3000"],
  {
    cwd: root,
    env: process.env,
    stdio: "inherit",
    windowsHide: true
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
