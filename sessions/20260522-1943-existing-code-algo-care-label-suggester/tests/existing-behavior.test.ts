import path from "path";

import { suggestCareLabel } from "../src/careLabelSuggester";
import { readCareLabels } from "../src/utils";

const careLabels = readCareLabels(
  path.join(__dirname, "..", "data", "care-labels.txt"),
);

describe("suggestCareLabel - existing behavior", () => {
  it("matches an exact canonical label", () => {
    expect(suggestCareLabel("General consultation", careLabels)?.label).toBe(
      "General consultation",
    );
  });

  it("handles case and extra spaces", () => {
    expect(suggestCareLabel("  optical   lenses  ", careLabels)?.label).toBe(
      "Optical lenses",
    );
  });

  it("handles separator noise for multi-word labels", () => {
    expect(suggestCareLabel("physiotherapy-session", careLabels)?.label).toBe(
      "Physiotherapy session",
    );
  });

  it("returns null when the wording is unrelated", () => {
    expect(suggestCareLabel("family doctor note", careLabels)).toBeNull();
  });
});
