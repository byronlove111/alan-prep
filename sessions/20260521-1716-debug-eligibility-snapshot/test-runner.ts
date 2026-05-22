import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (error: any) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${error.message}`);
    failed++;
  }
}

function expect(actual: unknown) {
  return {
    toBe(expected: unknown) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      }
    },
    toEqual(expected: unknown) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      }
    },
    toContain(expected: unknown) {
      if (!Array.isArray(actual) || !actual.includes(expected)) {
        throw new Error(`Expected array to contain ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      }
    },
    toHaveLength(expected: number) {
      if (!actual || (actual as { length?: number }).length !== expected) {
        throw new Error(`Expected length ${expected}, got ${(actual as { length?: number })?.length}`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy value, got ${JSON.stringify(actual)}`);
      }
    }
  };
}

(global as any).test = test;
(global as any).expect = expect;

const testDirectory = path.join(__dirname, "tests");
const testFiles = fs.readdirSync(testDirectory).filter((file) => file.endsWith(".test.ts")).sort();

for (const file of testFiles) {
  console.log(`\n📋 ${file}`);
  try {
    require(path.join(testDirectory, file));
  } catch (error: any) {
    console.log(`  ❌ Could not load file: ${error.message}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
