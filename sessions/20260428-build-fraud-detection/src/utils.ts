import { Claim } from "./types";

// Converts DD/MM/YYYY → YYYYMMDD for reliable string comparison
export function toSortableDate(date: string): string {
  const [day, month, year] = date.split("/");
  return `${year}${month}${day}`;
}

export function extractYear(date: string): string {
  return date.split("/")[2];
}

// Returns "YYYY-MM" — useful for grouping claims by calendar month
export function extractMonth(date: string): string {
  const [, month, year] = date.split("/");
  return `${year}-${month}`;
}

export function roundAmount(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function claimsForMember(claims: Claim[], memberId: string): Claim[] {
  return claims.filter((c) => c.memberId === memberId);
}
