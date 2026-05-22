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

test("keeps overnight handover members in a coherent eligible state", () => {
  const snapshot = getSnapshot("m-004");

  expect(snapshot.finalStatus).toBe("eligible");
  expect(snapshot.plan).toBe("plus");
  expect(snapshot.activeTo).toBe("2026-05-21");
});

test("does not close a short bridge coverage too early in the day", () => {
  const snapshot = getSnapshot("m-005");

  expect(snapshot.finalStatus).toBe("eligible");
  expect(snapshot.coverageKey).toBe("FR:core");
});

test("keeps coverage active on the end date", () => {
  const snapshot = getSnapshot("m-005");

  expect(snapshot.finalStatus).toBe("eligible");
  expect(snapshot.activeFrom).toBe("2026-05-21");
  expect(snapshot.activeTo).toBe("2026-05-21");
});

test("marks eligible coverage ending on the reference date as ending soon", () => {
  const snapshot = getSnapshot("m-005");

  expect(snapshot.finalStatus).toBe("eligible");
  expect(snapshot.isEndingSoon).toBe(true);
});

test("does not mark pending documents coverage as ending soon without an end date", () => {
  const snapshot = getSnapshot("m-003");

  expect(snapshot.finalStatus).toBe("pending_documents");
  expect(snapshot.activeTo).toBe(null);
  expect(snapshot.isEndingSoon).toBe(false);
});

test("does not mark suspended coverage as ending soon", () => {
  const snapshot = getSnapshot("m-002");

  expect(snapshot.finalStatus).toBe("suspended");
  expect(snapshot.isEndingSoon).toBe(false);
});
