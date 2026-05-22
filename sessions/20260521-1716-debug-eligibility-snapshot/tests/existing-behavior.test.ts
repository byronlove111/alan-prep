import { rawEligibilityLines, REFERENCE_DATE } from "../src/fixtures";
import { buildEligibilitySnapshots } from "../src/services/eligibilitySnapshot";

const snapshots = buildEligibilitySnapshots(rawEligibilityLines, REFERENCE_DATE);

function getSnapshot(memberId: string) {
  const snapshot = snapshots.find((item) => item.memberId === memberId);

  if (!snapshot) {
    throw new Error(`Missing snapshot for ${memberId}`);
  }

  return snapshot;
}

test("builds one snapshot per member", () => {
  expect(snapshots).toHaveLength(6);
});

test("keeps stable eligible members active across two sources", () => {
  const snapshot = getSnapshot("m-001");

  expect(snapshot.finalStatus).toBe("eligible");
  expect(snapshot.coverageKey).toBe("FR:core");
  expect(snapshot.contributingSources).toEqual(["payroll", "hris"]);
});

test("lets manual review suspend a member even if automatic feeds still say eligible", () => {
  const snapshot = getSnapshot("m-002");

  expect(snapshot.finalStatus).toBe("suspended");
  expect(snapshot.needsManualReview).toBeTruthy();
});

test("normalizes noisy plan codes before building the final coverage key", () => {
  const snapshot = getSnapshot("m-003");

  expect(snapshot.plan).toBe("plus");
  expect(snapshot.coverageKey).toBe("BE:plus");
  expect(snapshot.finalStatus).toBe("pending_documents");
});

test("marks members as terminated when their coverage really ended before the snapshot date", () => {
  const snapshot = getSnapshot("m-002");

  expect(snapshot.finalStatus).toBe("suspended");
});
