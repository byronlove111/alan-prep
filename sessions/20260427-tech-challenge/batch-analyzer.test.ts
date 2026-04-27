import { analyzeBatch } from './batch-analyzer';
import { test, expect } from './test-runner';

// Happy path — single member, single claim
test('parses a single claim correctly', () => {
  const batch = `M-001,C23,15/03/2026,25.00`;

  const result = analyzeBatch(batch);
  expect(result.length).toBe(1);
  expect(result[0].memberId).toBe('M-001');
  expect(result[0].claimCount).toBe(1);
  expect(result[0].totalAmount).toBe(25);
});

// Grouping — two members
test('groups claims by member ID', () => {
  const batch = `M-001,C23,15/03/2026,25.00
M-002,SPE7,10/03/2026,45.00
M-001,MK50,20/03/2026,35.00`;

  const result = analyzeBatch(batch);
  expect(result.length).toBe(2);

  const m001 = result.find(r => r.memberId === 'M-001');
  expect(m001?.claimCount).toBe(2);
  expect(m001?.totalAmount).toBe(60);
});

test('return the most recent date', () => {
  const batch = `M-001,C23,15/03/2026,25.00
  M-001,MK50,20/03/2026,35.00
  M-001,SPE7,05/04/2026,80.00
`;

  const result = analyzeBatch(batch);
  expect(result[0].lastClaimDate).toBe("05/04/2026");
  expect(result[0].claimCount).toBe(3);
});