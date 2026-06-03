// ============================================================
// DRILL — Array.map · Array.filter · Array.reduce · Array.find · Array.sort
//         · Object.entries · Object.fromEntries · Object.values
//         · Record<K,V> · destructuring · string methods (split, trim, toUpperCase, toFixed)
//         · parseFloat · optional chaining (?.) · nullish coalescing (??)
// ============================================================
// Alan reçoit chaque jour des milliers de demandes de remboursement via
// différentes sources : fichiers CSV bruts des établissements de santé,
// objets structurés depuis l'API membres, et agrégats calculés en temps
// réel pour le dashboard ops. Ton rôle : écrire le pipeline utilitaire
// qui fait tourner tout ça de bout en bout.
//
// Lance : npm test
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
// Les exports CSV des établissements de santé arrivent sous forme de
// chaînes brutes séparées par des pipes. Chaque champ peut contenir des
// espaces parasites laissés par le système source. L'équipe data ingestion
// a besoin de transformer ces lignes en objets Claim avant tout traitement.
//
// parseClaim(' C001 | M01 | dentist | 120.00 | 2026-05-01 ')
// => { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120, date: '2026-05-01' }
// ------------------------------------------------------------
export function parseClaim(raw: string): Claim {
  const [id, memberId, category, amount, date] = raw
    .split("|")
    .map((x) => x.trim());
  return { id, memberId, category, amount: Number(amount), date };
}

// ------------------------------------------------------------
// 2. Calculer le total remboursé par membre
// ------------------------------------------------------------
// Le dashboard finance affiche, pour une liste de claims sur une période,
// le montant total versé à chaque membre. Les membres sans claim ne doivent
// pas apparaître dans le résultat. Si un membre a plusieurs claims, leurs
// montants s'additionnent.
//
// totalPerMember([
//   { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120.00, date: '2026-05-01' },
//   { id: 'C003', memberId: 'M01', category: 'optic',   amount: 45.50,  date: '2026-05-05' },
//   { id: 'C002', memberId: 'M02', category: 'optic',   amount: 89.00,  date: '2026-05-03' },
// ])
// => { M01: 165.50, M02: 89 }
// ------------------------------------------------------------
export function totalPerMember(claims: Claim[]): Record<string, number> {
  const dict: Record<string, number> = {};

  for (const claim of claims) {
    if (!dict[claim.memberId]) {
      dict[claim.memberId] = 0;
    }
    dict[claim.memberId] += claim.amount;
  }

  return dict;
}

// ------------------------------------------------------------
// 3. Filtrer les membres au-dessus d'un seuil
// ------------------------------------------------------------
// Pour déclencher une revue de dossier, l'équipe fraude isole les membres
// dont le total de remboursements dépasse un seuil sur la période. Elle
// fournit un dictionnaire memberId → total et un montant seuil, et attend
// en retour uniquement les membres concernés.
//
// filterAboveThreshold({ M01: 184.00, M02: 121.00, M03: 350.00 }, 150)
// => { M01: 184, M03: 350 }
//
// filterAboveThreshold({ M01: 50.00 }, 100)
// => {}
// ------------------------------------------------------------
export function filterAboveThreshold(
  totals: Record<string, number>,
  threshold: number,
): Record<string, number> {
  const it = Object.entries(totals);
  const dict: Record<string, number> = {};

  for (const member of it) {
    if (member[1] > threshold) {
      dict[member[0]] = member[1];
    }
  }

  return dict;
}

// ------------------------------------------------------------
// 4. Identifier les membres qui dépensent le plus
// ------------------------------------------------------------
// L'équipe actuariat veut un classement des N membres avec le plus gros
// volume de remboursements sur une période, pour ajuster la tarification
// annuelle. La liste doit être triée par total décroissant et inclure le
// nombre de claims de chaque membre.
//
// topSpenders(CLAIMS, 2)
// => [
//   { memberId: 'M03', total: 350, claimCount: 2 },
//   { memberId: 'M01', total: 184, claimCount: 3 },
// ]
// ------------------------------------------------------------

// {
//   id: "C001",
//   memberId: "M01",
//   category: "dentist",
//   amount: 120.0,
//   date: "2026-05-01",
// },
export function topSpenders(claims: Claim[], n: number): MemberSummary[] {
  const summary: MemberSummary[] = [];
  const total = totalPerMember(claims);
  const it = Object.entries(total)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

  for (const i of it) {
    summary.push({
      memberId: i[0],
      total: i[1],
      claimCount: claims.filter((x) => x.memberId === i[0]).length,
    });
  }
  return summary;
}

// ------------------------------------------------------------
// 5. Grouper les claims par catégorie de soin
// ------------------------------------------------------------
// Le rapport mensuel par poste de dépense regroupe tous les claims selon
// leur catégorie (dentist, optic, pharma…). Chaque catégorie contient la
// liste complète des claims correspondants. Une catégorie absente des claims
// ne doit pas apparaître dans le résultat.
//
// groupByCategory([
//   { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120.00, date: '2026-05-01' },
//   { id: 'C002', memberId: 'M02', category: 'optic',   amount: 89.00,  date: '2026-05-03' },
//   { id: 'C004', memberId: 'M03', category: 'dentist', amount: 200.00, date: '2026-05-06' },
// ])
// => {
//   dentist: [{ id: 'C001', ... }, { id: 'C004', ... }],
//   optic:   [{ id: 'C002', ... }],
// }
// ------------------------------------------------------------
export function groupByCategory(claims: Claim[]): Record<string, Claim[]> {
  throw new Error("not implemented");
}

// ------------------------------------------------------------
// 6. Formatter un résumé des totaux par catégorie
// ------------------------------------------------------------
// Le rapport PDF envoyé aux partenaires affiche chaque poste de dépense
// sur une ligne, triée alphabétiquement. Le format attendu est
// "CATEGORIE: montant€" avec exactement 2 décimales et la catégorie
// en majuscules.
//
// formatSummaryLines({ pharma: 51.00, dentist: 320.00, optic: 285.00 })
// => ['DENTIST: 320.00€', 'OPTIC: 285.00€', 'PHARMA: 51.00€']
//
// formatSummaryLines({})
// => []
// ------------------------------------------------------------
export function formatSummaryLines(totals: Record<string, number>): string[] {
  throw new Error("not implemented");
}

// ------------------------------------------------------------
// 7. Récupérer le nom complet d'un membre
// ------------------------------------------------------------
// Avant d'afficher un claim dans l'interface conseiller, Alan enrichit
// chaque ligne avec le nom complet du membre concerné. Si le membre
// n'existe pas dans la base (données manquantes ou ID inconnu), on affiche
// "Inconnu" plutôt que de bloquer l'interface.
//
// getMemberFullName([{ id: 'M02', firstName: 'Lucas', lastName: 'Dupont' }], 'M02')
// => 'Lucas Dupont'
//
// getMemberFullName([{ id: 'M02', firstName: 'Lucas', lastName: 'Dupont' }], 'M99')
// => 'Inconnu'
// ------------------------------------------------------------
export function getMemberFullName(members: Member[], id: string): string {
  throw new Error("not implemented");
}

// ============================================================
// TESTS MANUELS — décommente pour tester dans le terminal
// npx tsx drill.ts
// ============================================================

const CLAIMS: Claim[] = [
  {
    id: "C001",
    memberId: "M01",
    category: "dentist",
    amount: 120.0,
    date: "2026-05-01",
  },
  {
    id: "C002",
    memberId: "M02",
    category: "optic",
    amount: 89.0,
    date: "2026-05-03",
  },
  {
    id: "C003",
    memberId: "M01",
    category: "optic",
    amount: 45.5,
    date: "2026-05-05",
  },
  {
    id: "C004",
    memberId: "M03",
    category: "dentist",
    amount: 200.0,
    date: "2026-05-06",
  },
  {
    id: "C005",
    memberId: "M02",
    category: "pharma",
    amount: 32.0,
    date: "2026-05-07",
  },
  {
    id: "C006",
    memberId: "M01",
    category: "pharma",
    amount: 18.5,
    date: "2026-05-08",
  },
  {
    id: "C007",
    memberId: "M03",
    category: "optic",
    amount: 150.0,
    date: "2026-05-10",
  },
];

const MEMBERS: Member[] = [
  { id: "M01", firstName: "Sophie", lastName: "Martin", plan: "premium" },
  { id: "M02", firstName: "Lucas", lastName: "Dupont" },
  { id: "M03", firstName: "Emma", lastName: "Bernard", plan: "basic" },
];

// 1. parseClaim
// console.log(parseClaim(" C001 | M01 | dentist | 120.00 | 2026-05-01 "));
// => { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120, date: '2026-05-01' }

// 2. totalPerMember
// totalPerMember([
//   { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120.00, date: '2026-05-01' },
//   { id: 'C003', memberId: 'M01', category: 'optic',   amount: 45.50,  date: '2026-05-05' },
//   { id: 'C002', memberId: 'M02', category: 'optic',   amount: 89.00,  date: '2026-05-03' },
// ])
// => { M01: 184, M02: 121, M03: 350 }

// 3. filterAboveThreshold
// console.log(filterAboveThreshold(totalPerMember(CLAIMS), 150));
// => { M01: 184, M03: 350 }

// 4. topSpenders
console.log(topSpenders(CLAIMS, 2));
// => [{ memberId: 'M03', total: 350, claimCount: 2 }, { memberId: 'M01', total: 184, claimCount: 3 }]

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
