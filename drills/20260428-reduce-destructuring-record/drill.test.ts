import { parseLine, parseActs, totalByCode, topActCode } from './drill';
import { test, expect } from './test-runner';

// TODO 1
test('parseLine extrait code, label et amount', () => {
  const act = parseLine('C23|Consultation généraliste|25.00');
  expect(act.code).toBe('C23');
  expect(act.label).toBe('Consultation généraliste');
  expect(act.amount).toBe(25);
});

// TODO 2
test('parseActs transforme un tableau de strings en tableau d\'Act', () => {
  const lines = ['C23|Consultation|25.00', 'SPE7|Radiologie|45.00'];
  const acts = parseActs(lines);
  expect(acts.length).toBe(2);
  expect(acts[0].code).toBe('C23');
  expect(acts[1].amount).toBe(45);
});

// TODO 3
test('totalByCode calcule le total par code d\'acte', () => {
  const acts = [
    { code: 'C23', label: 'Consultation', amount: 25 },
    { code: 'SPE7', label: 'Radiologie', amount: 45 },
    { code: 'C23', label: 'Consultation', amount: 30 },
  ];
  const totals = totalByCode(acts);
  expect(totals['C23']).toBe(55);
  expect(totals['SPE7']).toBe(45);
});

// TODO 4
test('topActCode retourne le code avec le total le plus élevé', () => {
  const totals = { 'C23': 55, 'SPE7': 90, 'MK50': 35 };
  expect(topActCode(totals)).toBe('SPE7');
});

// TODO 5 — à toi d'écrire ce test
// Vérifie que topActCode fonctionne quand il n'y a qu'un seul code dans le dictionnaire
// test('...', () => { ... });
test("topActCode fonctionne si il n'y qu'un seul code dans le dict", () => {
  const totals = { 'MK50': 35 };
  expect(topActCode(totals)).toBe('MK50');
});