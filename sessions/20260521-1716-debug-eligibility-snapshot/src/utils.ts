export function compact<T>(values: Array<T | null | undefined>): T[] {
  return values.filter((value): value is T => value !== null && value !== undefined);
}

export function groupBy<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = getKey(item);
    groups[key] ??= [];
    groups[key].push(item);
    return groups;
  }, {});
}

export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function normalizeToken(value: string): string {
  return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function compareIsoDates(left: string, right: string): number {
  return left.localeCompare(right);
}

export function isDateWithinInterval(referenceDate: string, startDate: string, endDate: string | null): boolean {
  if (compareIsoDates(referenceDate, startDate) < 0) {
    return false;
  } 

  if (endDate === null) {
    return true;
  }

  const diffDate = compareIsoDates(referenceDate, endDate);
  if (diffDate === 0) {
    return true;
  } else {
    return diffDate < 0;
  }
}
