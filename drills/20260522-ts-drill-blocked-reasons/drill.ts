// ============================================================
// DRILL - normalize blocked movement reasons
// ============================================================
// Context:
//   Alan operators review blocked employment movements when new
//   member data partially matches an existing profile.
//   The raw reason labels are noisy, but the ops team wants a
//   simple summary of the top unresolved blocker reasons.
//
// Goal:
//   Implement the functions below so the Jest tests pass.
//   Focus on clean TypeScript data transformations, not cleverness.
// ============================================================

export type MovementStatus = "blocked" | "resolved";

export interface BlockedMovement {
  movementId: string;
  source: "import" | "admin_invite" | "integration";
  status: MovementStatus;
  rawReason?: string | null;
}

export type CanonicalBlockedReason =
  | "contract_dates"
  | "duplicate_member"
  | "identity_mismatch"
  | "name_mismatch"
  | "other";

export interface ReasonCount {
  reason: CanonicalBlockedReason;
  count: number;
}

export function normalizeBlockedReason(
  rawReason: string | null | undefined,
): CanonicalBlockedReason {
  throw new Error("not implemented");
}

export function topBlockedReasons(
  movements: BlockedMovement[],
  limit = 3,
): ReasonCount[] {
  throw new Error("not implemented");
}

// Manual examples:
// normalizeBlockedReason(" SSN mismatch ") -> "identity_mismatch"
// normalizeBlockedReason("duplicate employee account") -> "duplicate_member"
// topBlockedReasons(sample, 2) -> [
//   { reason: "identity_mismatch", count: 3 },
//   { reason: "contract_dates", count: 2 },
// ]
