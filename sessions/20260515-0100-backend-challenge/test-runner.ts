export function test(description: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${description}`);
  } catch (e: any) {
    console.log(`❌ ${description}: ${e.message}`);
  }
}

export function expect(value: any) {
  return {
    toBe: (expected: any) => {
      if (value !== expected)
        throw new Error(`Expected "${expected}", got "${value}"`);
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(value) !== JSON.stringify(expected))
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
    },
    toBeUndefined: () => {
      if (value !== undefined)
        throw new Error(`Expected undefined, got "${JSON.stringify(value)}"`);
    },
    toBeDefined: () => {
      if (value === undefined)
        throw new Error(`Expected a value, got undefined`);
    },
  };
}
