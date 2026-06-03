import {
  parseClaim,
  totalPerMember,
  filterAboveThreshold,
  topSpenders,
  groupByCategory,
  formatSummaryLines,
  getMemberFullName,
  type Claim,
  type Member,
} from './drill';

const CLAIMS: Claim[] = [
  { id: 'C001', memberId: 'M01', category: 'dentist', amount: 120.00, date: '2026-05-01' },
  { id: 'C002', memberId: 'M02', category: 'optic',   amount: 89.00,  date: '2026-05-03' },
  { id: 'C003', memberId: 'M01', category: 'optic',   amount: 45.50,  date: '2026-05-05' },
  { id: 'C004', memberId: 'M03', category: 'dentist', amount: 200.00, date: '2026-05-06' },
  { id: 'C005', memberId: 'M02', category: 'pharma',  amount: 32.00,  date: '2026-05-07' },
  { id: 'C006', memberId: 'M01', category: 'pharma',  amount: 18.50,  date: '2026-05-08' },
  { id: 'C007', memberId: 'M03', category: 'optic',   amount: 150.00, date: '2026-05-10' },
];

const MEMBERS: Member[] = [
  { id: 'M01', firstName: 'Sophie', lastName: 'Martin',  plan: 'premium' },
  { id: 'M02', firstName: 'Lucas',  lastName: 'Dupont' },
  { id: 'M03', firstName: 'Emma',   lastName: 'Bernard', plan: 'basic' },
];

// ============================================================
// 1. parseClaim
// ============================================================
describe('parseClaim', () => {
  it('parse une chaîne brute avec espaces autour des pipes', () => {
    expect(parseClaim(' C001 | M01 | dentist | 120.00 | 2026-05-01 ')).toEqual({
      id: 'C001',
      memberId: 'M01',
      category: 'dentist',
      amount: 120.00,
      date: '2026-05-01',
    });
  });

  it('parse une chaîne sans espaces parasites', () => {
    expect(parseClaim('C005|M02|pharma|32.00|2026-05-07')).toEqual({
      id: 'C005',
      memberId: 'M02',
      category: 'pharma',
      amount: 32.00,
      date: '2026-05-07',
    });
  });

  it('convertit le montant en number (pas une string)', () => {
    const claim = parseClaim('C003|M01|optic|45.50|2026-05-05');
    expect(typeof claim.amount).toBe('number');
    expect(claim.amount).toBe(45.50);
  });
});

// ============================================================
// 2. totalPerMember
// ============================================================
describe('totalPerMember', () => {
  it('additionne les montants par memberId', () => {
    expect(totalPerMember(CLAIMS)).toEqual({
      M01: 184.00,
      M02: 121.00,
      M03: 350.00,
    });
  });

  it('retourne un objet vide pour un tableau vide', () => {
    expect(totalPerMember([])).toEqual({});
  });

  it('fonctionne avec un seul claim', () => {
    expect(totalPerMember([CLAIMS[0]])).toEqual({ M01: 120.00 });
  });
});

// ============================================================
// 3. filterAboveThreshold
// ============================================================
describe('filterAboveThreshold', () => {
  it('garde uniquement les membres dont le total dépasse le seuil', () => {
    expect(filterAboveThreshold({ M01: 184.00, M02: 121.00, M03: 350.00 }, 150)).toEqual({
      M01: 184.00,
      M03: 350.00,
    });
  });

  it('retourne un objet vide si personne ne dépasse le seuil', () => {
    expect(filterAboveThreshold({ M01: 50.00, M02: 80.00 }, 100)).toEqual({});
  });

  it("n'inclut pas les membres exactement égaux au seuil (> strict)", () => {
    expect(filterAboveThreshold({ M01: 150.00, M02: 200.00 }, 150)).toEqual({ M02: 200.00 });
  });

  it('retourne tous les membres si le seuil est 0', () => {
    const totals = { M01: 184.00, M02: 121.00 };
    expect(filterAboveThreshold(totals, 0)).toEqual(totals);
  });
});

// ============================================================
// 4. topSpenders
// ============================================================
describe('topSpenders', () => {
  it('retourne les N membres avec le plus gros total, ordre décroissant', () => {
    expect(topSpenders(CLAIMS, 2)).toEqual([
      { memberId: 'M03', total: 350.00, claimCount: 2 },
      { memberId: 'M01', total: 184.00, claimCount: 3 },
    ]);
  });

  it('retourne tous les membres si n est supérieur au nombre de membres uniques', () => {
    const result = topSpenders(CLAIMS, 10);
    expect(result).toHaveLength(3);
    expect(result[0].memberId).toBe('M03');
    expect(result[2].memberId).toBe('M02');
  });

  it('compte correctement le nombre de claims par membre', () => {
    const result = topSpenders(CLAIMS, 3);
    const m01 = result.find(s => s.memberId === 'M01');
    expect(m01?.claimCount).toBe(3);
  });

  it('retourne un tableau vide pour un tableau de claims vide', () => {
    expect(topSpenders([], 3)).toEqual([]);
  });
});

// ============================================================
// 5. groupByCategory
// ============================================================
describe('groupByCategory', () => {
  it('groupe les claims par catégorie', () => {
    const grouped = groupByCategory(CLAIMS);
    expect(Object.keys(grouped).sort()).toEqual(['dentist', 'optic', 'pharma']);
  });

  it('chaque catégorie contient les bons claims', () => {
    const grouped = groupByCategory(CLAIMS);
    expect(grouped['dentist']).toHaveLength(2);
    expect(grouped['dentist'].map(c => c.id)).toEqual(['C001', 'C004']);
    expect(grouped['optic']).toHaveLength(3);
    expect(grouped['optic'].map(c => c.id)).toEqual(['C002', 'C003', 'C007']);
    expect(grouped['pharma']).toHaveLength(2);
  });

  it('retourne un objet vide pour un tableau vide', () => {
    expect(groupByCategory([])).toEqual({});
  });

  it("ne crée pas de clé pour les catégories absentes", () => {
    const grouped = groupByCategory([CLAIMS[0]]);
    expect(Object.keys(grouped)).toEqual(['dentist']);
  });
});

// ============================================================
// 6. formatSummaryLines
// ============================================================
describe('formatSummaryLines', () => {
  it('formate et trie les lignes alphabétiquement', () => {
    expect(formatSummaryLines({ pharma: 51.00, dentist: 320.00, optic: 285.00 })).toEqual([
      'DENTIST: 320.00€',
      'OPTIC: 285.00€',
      'PHARMA: 51.00€',
    ]);
  });

  it('retourne un tableau vide pour un objet vide', () => {
    expect(formatSummaryLines({})).toEqual([]);
  });

  it('affiche exactement 2 décimales', () => {
    const lines = formatSummaryLines({ optic: 89 });
    expect(lines[0]).toBe('OPTIC: 89.00€');
  });

  it('met les catégories en majuscules', () => {
    const lines = formatSummaryLines({ dentist: 100.00 });
    expect(lines[0]).toBe('DENTIST: 100.00€');
  });
});

// ============================================================
// 7. getMemberFullName
// ============================================================
describe('getMemberFullName', () => {
  it("retourne le nom complet pour un membre connu", () => {
    expect(getMemberFullName(MEMBERS, 'M01')).toBe('Sophie Martin');
    expect(getMemberFullName(MEMBERS, 'M02')).toBe('Lucas Dupont');
    expect(getMemberFullName(MEMBERS, 'M03')).toBe('Emma Bernard');
  });

  it("retourne 'Inconnu' pour un ID inconnu", () => {
    expect(getMemberFullName(MEMBERS, 'M99')).toBe('Inconnu');
  });

  it("retourne 'Inconnu' pour une liste vide", () => {
    expect(getMemberFullName([], 'M01')).toBe('Inconnu');
  });
});
