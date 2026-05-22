import path from "path";

import { suggestCareLabel } from "../src/careLabelSuggester";
import { readCareLabels } from "../src/utils";

const careLabels = readCareLabels(
  path.join(__dirname, "..", "data", "care-labels.txt"),
);

describe("suggestCareLabel - target change", () => {
  it("suggests Teleconsultation when the member splits the word", () => {
    expect(
      suggestCareLabel("tele consultation follow up", careLabels)?.label,
    ).toBe("Teleconsultation");
  });

  it("suggests Teleconsultation with slash-separated wording", () => {
    expect(suggestCareLabel("tele/consultation", careLabels)?.label).toBe(
      "Teleconsultation",
    );
  });
});
