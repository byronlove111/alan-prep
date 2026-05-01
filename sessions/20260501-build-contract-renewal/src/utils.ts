// ============================================================
// Shared utilities — reuse these in your feature
// ============================================================

/**
 * Parses a "YYYY-MM-DD" date string and returns a Date object.
 */
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Returns the number of days between two dates (b - a).
 * Positive if b is after a, negative if b is before a.
 */
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

/**
 * Formats a Date object to "YYYY-MM-DD".
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns true if the given contract status means the contract is still running.
 */
export function isActiveStatus(status: string): boolean {
  return status === "active";
}
