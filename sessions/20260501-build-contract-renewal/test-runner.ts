import * as fs from "fs";
import * as path from "path";

(global as any).__passed = 0;
(global as any).__failed = 0;

const testFiles = fs.readdirSync(path.join(__dirname, "tests")).filter(f => f.endsWith(".test.ts"));

for (const file of testFiles) {
  console.log(`\n📋 ${file}`);
  require(path.join(__dirname, "tests", file));
}

const passed = (global as any).__passed;
const failed = (global as any).__failed;
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
