let passed = 0;
let failed = 0;

export function test(description: string, fn: () => void): void {
  try {
    fn();
    console.log(`  ✅ ${description}`);
    passed++;
  } catch (e: any) {
    console.log(`  ❌ ${description}: ${e.message}`);
    failed++;
  }
}

export function expect(value: any) {
  return {
    toBe(expected: any) {
      if (value !== expected)
        throw new Error(`Expected "${expected}", got "${value}"`);
    },
    toEqual(expected: any) {
      if (JSON.stringify(value) !== JSON.stringify(expected))
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
    },
    toContain(expected: any) {
      if (!value.includes(expected))
        throw new Error(`Expected to contain "${expected}", got ${JSON.stringify(value)}`);
    },
    toBeTruthy() {
      if (!value) throw new Error(`Expected truthy, got ${JSON.stringify(value)}`);
    },
    toBeFalsy() {
      if (value) throw new Error(`Expected falsy, got ${JSON.stringify(value)}`);
    },
    toBeNull() {
      if (value !== null) throw new Error(`Expected null, got ${JSON.stringify(value)}`);
    },
  };
}

export function printSummary(): number {
  console.log(`\n${passed} passed, ${failed} failed`);
  return failed;
}
