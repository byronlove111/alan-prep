import { EligibilitySnapshot, NormalizedEligibilityLine, RawEligibilityLine } from "../types";
import { compareIsoDates, groupBy, isDateWithinInterval, unique } from "../utils";
import { normalizeEligibilityLine, sortByPriorityAndFreshness } from "./sourceLineNormalizer";

function pickLastKnownLine(lines: NormalizedEligibilityLine[], referenceDate: string): NormalizedEligibilityLine {
  const candidates = lines
    .filter((line) => compareIsoDates(line.effectiveFrom, referenceDate) <= 0)
    .sort((left, right) => {
      const startDateDifference = compareIsoDates(right.effectiveFrom, left.effectiveFrom);

      if (startDateDifference !== 0) {
        return startDateDifference;
      }

      return compareIsoDates(right.reportedAt, left.reportedAt);
    });

  return candidates[0] ?? sortByPriorityAndFreshness(lines)[0];
}

function calculateEnding(line: NormalizedEligibilityLine, referenceDate: string): boolean {
  if (line.status !== "eligible" && line.status !== "pending_documents") {
    return false;
  }

  if (line.effectiveTo === null) {
    return false;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const referenceTimestamp = new Date(`${referenceDate}T00:00:00Z`).getTime();
  const endingTimestamp = new Date(`${line.effectiveTo}T00:00:00Z`).getTime();
  const daysUntilEnding = (endingTimestamp - referenceTimestamp) / millisecondsPerDay;

  return daysUntilEnding >= 0 && daysUntilEnding <= 3;
}

function buildSnapshotForMember(memberLines: NormalizedEligibilityLine[], referenceDate: string): EligibilitySnapshot {
  const currentLines = sortByPriorityAndFreshness(
    memberLines.filter((line) => isDateWithinInterval(referenceDate, line.effectiveFrom, line.effectiveTo))
  ); 

  if (currentLines.length === 0) {
    const lastKnownLine = pickLastKnownLine(memberLines, referenceDate);

    return {
      memberId: lastKnownLine.memberId,
      memberName: lastKnownLine.memberName,
      country: lastKnownLine.country,
      plan: lastKnownLine.plan,
      coverageKey: lastKnownLine.coverageKey,
      finalStatus: "terminated",
      activeFrom: lastKnownLine.effectiveFrom,
      activeTo: lastKnownLine.effectiveTo,
      contributingSources: [lastKnownLine.source],
      needsManualReview: false,
      isEndingSoon: false
    };
  }

  const chosenLine = currentLines[0];

  return {
    memberId: chosenLine.memberId,
    memberName: chosenLine.memberName,
    country: chosenLine.country,
    plan: chosenLine.plan,
    coverageKey: chosenLine.coverageKey,
    finalStatus: chosenLine.status,
    activeFrom: chosenLine.effectiveFrom,
    activeTo: chosenLine.effectiveTo,
    contributingSources: unique(currentLines.map((line) => line.source)),
    isEndingSoon: calculateEnding(chosenLine, referenceDate),
    needsManualReview:
      unique(currentLines.map((line) => line.plan)).length > 1 ||
      unique(currentLines.map((line) => line.status)).length > 1
  };
}

export function buildEligibilitySnapshots(
  rawLines: RawEligibilityLine[],
  referenceDate: string
): EligibilitySnapshot[] {
  const normalizedLines = rawLines.map(normalizeEligibilityLine);
  const byMember = groupBy(normalizedLines, (line) => line.memberId);

  return Object.values(byMember)
    .map((memberLines) => buildSnapshotForMember(memberLines, referenceDate))
    .sort((left, right) => left.memberId.localeCompare(right.memberId));
}
