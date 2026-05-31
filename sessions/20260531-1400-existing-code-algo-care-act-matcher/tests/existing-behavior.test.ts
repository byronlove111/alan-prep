import path from "path";

import { resolveActCode } from "../src/actMatcher";
import { loadCareActs } from "../src/utils";

const acts = loadCareActs(path.join(__dirname, "..", "data", "acts.json"));

describe("resolveActCode - existing behavior", () => {
  it("matches an exact canonical label", () => {
    expect(resolveActCode("Consultation generale", acts)).toBe("CONSULT_GP");
  });

  it("returns null for an unknown act", () => {
    expect(resolveActCode("Radiologie", acts)).toBeNull();
  });
});
