import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e: any) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${e.message}`);
    failed++;
  }
}

function expect(actual: any) {
  return {
    toBe: (expected: any) => {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(actual) !== JSON.stringify(expected))
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toBeNull: () => {
      if (actual !== null) throw new Error(`Expected null, got ${JSON.stringify(actual)}`);
    },
    toBeTruthy: () => {
      if (!actual) throw new Error(`Expected truthy, got ${JSON.stringify(actual)}`);
    },
    toBeFalsy: () => {
      if (actual) throw new Error(`Expected falsy, got ${JSON.stringify(actual)}`);
    },
    toContain: (item: any) => {
      if (!Array.isArray(actual) || !actual.includes(item))
        throw new Error(`Expected array to contain ${JSON.stringify(item)}`);
    },
    toHaveLength: (len: number) => {
      if (!actual || actual.length !== len)
        throw new Error(`Expected length ${len}, got ${actual?.length}`);
    },
  };
}

const testFiles = fs.readdirSync(path.join(__dirname, "tests")).filter((f) => f.endsWith(".test.ts"));

(global as any).test = test;
(global as any).expect = expect;

for (const file of testFiles) {
  console.log(`\n📋 ${file}`);
  try {
    require(path.join(__dirname, "tests", file));
  } catch (e: any) {
    console.log(`  ❌ Could not load file: ${e.message}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
