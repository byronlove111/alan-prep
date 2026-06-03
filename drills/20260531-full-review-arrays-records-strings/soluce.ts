// ============================================================
// SOLUCE — Array.map · Array.filter · Array.reduce · Array.find · Array.sort
//          · Object.entries · Object.fromEntries · Object.values
//          · Record<K,V> · destructuring · string methods (split, trim, toUpperCase, toFixed)
//          · parseFloat · optional chaining (?.) · nullish coalescing (??)
// ============================================================

export interface Claim {
  id: string;
  memberId: string;
  category: string;
  amount: number;
  date: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  plan?: string;
}

export interface MemberSummary {
  memberId: string;
  total: number;
  claimCount: number;
}

// ------------------------------------------------------------
// 1. Parser une ligne brute de remboursement
// ------------------------------------------------------------
export function parseClaim(raw: string): Claim {
  const [id, memberId, category, amountStr, date] = raw.split('|').map(s => s.trim());
  return { id, memberId, category, amount: parseFloat(amountStr), date };
}

// ------------------------------------------------------------
// 2. Calculer le total remboursé par membre
// ------------------------------------------------------------
export function totalPerMember(claims: Claim[]): Record<string, number> {
  return claims.reduce<Record<string, number>>((acc, claim) => {
    acc[claim.memberId] = (acc[claim.memberId] ?? 0) + claim.amount;
    return acc;
  }, {});
}

// ------------------------------------------------------------
// 3. Filtrer les membres au-dessus d'un seuil
// ------------------------------------------------------------
export function filterAboveThreshold(
  totals: Record<string, number>,
  threshold: number
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(totals).filter(([, amount]) => amount > threshold)
  );
}

// ------------------------------------------------------------
// 4. Identifier les membres qui dépensent le plus
// ------------------------------------------------------------
export function topSpenders(claims: Claim[], n: number): MemberSummary[] {
  const summaries = claims.reduce<Record<string, MemberSummary>>((acc, { memberId, amount }) => {
    if (!acc[memberId]) {
      acc[memberId] = { memberId, total: 0, claimCount: 0 };
    }
    acc[memberId].total += amount;
    acc[memberId].claimCount += 1;
    return acc;
  }, {});

  return Object.values(summaries)
    .sort((a, b) => b.total - a.total)
    .slice(0, n);
}

// ------------------------------------------------------------
// 5. Grouper les claims par catégorie de soin
// ------------------------------------------------------------
export function groupByCategory(claims: Claim[]): Record<string, Claim[]> {
  return claims.reduce<Record<string, Claim[]>>((acc, claim) => {
    if (!acc[claim.category]) {
      acc[claim.category] = [];
    }
    acc[claim.category].push(claim);
    return acc;
  }, {});
}

// ------------------------------------------------------------
// 6. Formatter un résumé des totaux par catégorie
// ------------------------------------------------------------
export function formatSummaryLines(totals: Record<string, number>): string[] {
  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, amount]) => `${category.toUpperCase()}: ${amount.toFixed(2)}€`);
}

// ------------------------------------------------------------
// 7. Récupérer le nom complet d'un membre
// ------------------------------------------------------------
export function getMemberFullName(members: Member[], id: string): string {
  const member = members.find(m => m.id === id);
  return member?.firstName != null
    ? `${member.firstName} ${member.lastName}`
    : 'Inconnu';
}

// ============================================================
// TESTS MANUELS — décommente pour tester dans le terminal
// npx tsx soluce.ts
// ============================================================

// const CLAIMS: Claim[] = [
//   { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120.00, date: '2026-05-01' },
//   { id: 'C002', memberId: 'M02', category: 'optic',   amount: 89.00,  date: '2026-05-03' },
//   { id: 'C003', memberId: 'M01', category: 'optic',   amount: 45.50,  date: '2026-05-05' },
//   { id: 'C004', memberId: 'M03', category: 'dentist', amount: 200.00, date: '2026-05-06' },
//   { id: 'C005', memberId: 'M02', category: 'pharma',  amount: 32.00,  date: '2026-05-07' },
//   { id: 'C006', memberId: 'M01', category: 'pharma',  amount: 18.50,  date: '2026-05-08' },
//   { id: 'C007', memberId: 'M03', category: 'optic',   amount: 150.00, date: '2026-05-10' },
// ];
//
// const MEMBERS: Member[] = [
//   { id: 'M01', firstName: 'Sophie', lastName: 'Martin',  plan: 'premium' },
//   { id: 'M02', firstName: 'Lucas',  lastName: 'Dupont' },
//   { id: 'M03', firstName: 'Emma',   lastName: 'Bernard', plan: 'basic' },
// ];

// // 1. parseClaim
// console.log(parseClaim(' C001 | M01 | dentist | 120.00 | 2026-05-01 '));
// // => { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120, date: '2026-05-01' }

// // 2. totalPerMember
// console.log(totalPerMember(CLAIMS));
// // => { M01: 184, M02: 121, M03: 350 }

// // 3. filterAboveThreshold
// console.log(filterAboveThreshold(totalPerMember(CLAIMS), 150));
// // => { M01: 184, M03: 350 }

// // 4. topSpenders
// console.log(topSpenders(CLAIMS, 2));
// // => [{ memberId: 'M03', total: 350, claimCount: 2 }, { memberId: 'M01', total: 184, claimCount: 3 }]

// // 5. groupByCategory
// const grouped = groupByCategory(CLAIMS);
// console.log(Object.keys(grouped).sort());
// // => ['dentist', 'optic', 'pharma']
// console.log(grouped['optic'].length);
// // => 3

// // 6. formatSummaryLines
// console.log(formatSummaryLines({ pharma: 51.00, dentist: 320.00, optic: 285.00 }));
// // => ['DENTIST: 320.00€', 'OPTIC: 285.00€', 'PHARMA: 51.00€']

// // 7. getMemberFullName
// console.log(getMemberFullName(MEMBERS, 'M01'));
// // => 'Sophie Martin'
// console.log(getMemberFullName(MEMBERS, 'M99'));
// // => 'Inconnu'
