type TestFn = () => void | Promise<void>;

const tests: Array<{ description: string; fn: TestFn }> = [];

export function test(description: string, fn: TestFn) {
  tests.push({ description, fn });
}

export function expect(value: any) {
  return {
    toBe: (expected: any) => {
      if (value !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
      }
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(value) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
      }
    },
    toBeDefined: () => {
      if (value === undefined) {
        throw new Error("Expected a value, got undefined");
      }
    },
  };
}

export async function run() {
  let failures = 0;

  for (const { description, fn } of tests) {
    try {
      await fn();
      console.log(`✅ ${description}`);
    } catch (error: any) {
      failures += 1;
      console.log(`❌ ${description}: ${error?.message ?? String(error)}`);
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
  }
}
