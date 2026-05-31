import { CareAct } from "./types";
import { normalizeLooseText } from "./utils";

export function resolveActCode(input: string, acts: CareAct[]): string | null {
  const parsedInput = normalizeLooseText(input);
  console.log(parsedInput);
  for (const act of acts) {
    if (parsedInput === act.label.toLowerCase()) {
      return act.code;
    }
    for (const alias of act.aliases) {
      if (parsedInput === alias.toLowerCase()) {
        return act.code;
      }
    }
  }

  return null;
}
