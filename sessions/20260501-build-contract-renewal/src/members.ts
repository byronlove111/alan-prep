import { Member } from "./types";

/**
 * Finds a member by ID. Returns null if not found.
 */
export function findMember(members: Member[], memberId: string): Member | null {
  return members.find(m => m.id === memberId) ?? null;
}

/**
 * Returns all members belonging to a given company.
 */
export function getMembersByCompany(members: Member[], companyId: string): Member[] {
  return members.filter(m => m.companyId === companyId);
}

/**
 * Returns a display label for a member: "Name <email>".
 */
export function formatMemberLabel(member: Member): string {
  return `${member.name} <${member.email}>`;
}
