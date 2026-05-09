import type { Member } from "./types";

export function findMember(members: Member[], memberId: string): Member | undefined {
  return members.find((m) => m.memberId === memberId);
}

export function formatMemberLabel(member: Member): string {
  return `${member.firstName} ${member.lastName} (${member.email})`;
}
