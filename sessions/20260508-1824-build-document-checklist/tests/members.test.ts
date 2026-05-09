import { findMember, formatMemberLabel } from "../src/members";
import type { Member } from "../src/types";

const members: Member[] = [
  {
    memberId: "m-001",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@example.com",
  },
  {
    memberId: "m-002",
    firstName: "Julien",
    lastName: "Dupont",
    email: "julien.dupont@example.com",
  },
];

test("findMember — finds existing member by id", () => {
  const result = findMember(members, "m-001");
  expect(result).toEqual(members[0]);
});

test("findMember — returns undefined for unknown id", () => {
  const result = findMember(members, "m-999");
  expect(result).toBe(undefined);
});

test("formatMemberLabel — returns correct string", () => {
  const label = formatMemberLabel(members[0]);
  expect(label).toBe("Sophie Martin (sophie.martin@example.com)");
});
