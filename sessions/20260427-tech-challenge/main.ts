import { analyzeBatch } from './batch-analyzer';
import { readFileSync } from 'fs';

const text = readFileSync('./data/batch-sample.txt', 'utf-8');
const results = analyzeBatch(text);

console.log('=== Batch Analysis ===\n');
for (const member of results) {
  const cap = member.capExceeded ? '⚠️  CAP EXCEEDED' : '✅';
  console.log(`${cap} ${member.memberId}`);
  console.log(`   Claims: ${member.claimCount}`);
  console.log(`   Total:  €${member.totalAmount}`);
  console.log(`   Last:   ${member.lastClaimDate}`);
  console.log('');
}
