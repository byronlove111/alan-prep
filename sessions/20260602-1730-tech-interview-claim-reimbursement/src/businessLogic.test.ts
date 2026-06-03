import Database from "better-sqlite3";
import { createTestDatabase } from "./testDb";
import { analyzeMemberClaimReimbursements } from "./businessLogic";

function insertMember(db: Database.Database, id: number, companyId: number, name: string): void {
  db.prepare("INSERT INTO members (id, company_id, name) VALUES (?, ?, ?)").run(
    id,
    companyId,
    name
  );
}

function insertClaim(
  db: Database.Database,
  id: number,
  memberId: number,
  careType: string,
  claimedAmount: number,
  reimbursedAmount: number,
  createdAt: string
): void {
  db.prepare(
    `INSERT INTO claims (id, member_id, care_type, claimed_amount, reimbursed_amount, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, memberId, careType, claimedAmount, reimbursedAmount, createdAt);
}

describe("analyzeMemberClaimReimbursements", () => {
  let db: Database.Database;

  beforeEach(() => {
    db = createTestDatabase();
  });

  afterEach(() => {
    db.close();
  });

  it("retourne un tableau vide pour un membre inconnu", () => {
    expect(analyzeMemberClaimReimbursements(db, 999)).toEqual([]);
  });

  it("retourne un tableau vide quand le membre n'a aucune claim", () => {
    expect(analyzeMemberClaimReimbursements(db, 3)).toEqual([]);
  });

  it("retourne changePercent null pour une seule claim", () => {
    const result = analyzeMemberClaimReimbursements(db, 2);

    expect(result).toHaveLength(1);
    expect(result[0].changePercent).toBeNull();
    expect(result[0].date).toEqual(new Date("2024-01-20"));
    expect(result[0].careType).toBe("consultation");
  });

  it("produit un changePercent egal a 0 quand le taux est identique", () => {
    insertMember(db, 101, 1, "Stable User");
    insertClaim(db, 102, 101, "consultation", 100, 60, "2024-01-01");
    insertClaim(db, 103, 101, "pharmacy", 200, 120, "2024-02-01");

    const result = analyzeMemberClaimReimbursements(db, 101);

    expect(result[1].changePercent).toBe(0);
  });

  it("categorise un taux de 50.0 en Moyen et non Faible", () => {
    const result = analyzeMemberClaimReimbursements(db, 2);

    expect(result[0].reimbursementRate).toBe(50);
    expect(result[0].level).toBe("Moyen");
  });

  it("categorise un taux de 80.0 en Eleve et non Moyen", () => {
    insertMember(db, 102, 1, "High User");
    insertClaim(db, 104, 102, "optics", 100, 80, "2024-01-01");

    const result = analyzeMemberClaimReimbursements(db, 102);

    expect(result[0].reimbursementRate).toBe(80);
    expect(result[0].level).toBe("Élevé");
  });

  it("calcule chaque changePercent par rapport a la claim precedente", () => {
    insertMember(db, 103, 1, "Timeline User");
    insertClaim(db, 105, 103, "consultation", 100, 40, "2024-01-01");
    insertClaim(db, 106, 103, "pharmacy", 100, 50, "2024-02-01");
    insertClaim(db, 107, 103, "optics", 100, 80, "2024-03-01");

    const result = analyzeMemberClaimReimbursements(db, 103);

    expect(result[0].changePercent).toBeNull();
    expect(result[1].changePercent).toBe(25);
    expect(result[2].changePercent).toBe(60);
  });
});
