export interface Claim {
  memberId: string;
  actCode: string;
  date: string;
  amount: number;
}

export interface MemberSummary {
  memberId: string;
  claimCount: number;
  totalAmount: number;
  lastClaimDate: string;
  capExceeded: boolean;
}

const YEARLY_CAP = 500;

function parseClaim(line: string): Claim {
  const [memberId, actCode, date, amount] = line.split(',');
  return {
    memberId: memberId.trim(),
    actCode: actCode.trim(),
    date: date.trim(),
    amount: parseFloat(amount.trim()),
  };
}

export function analyzeBatch(text: string): MemberSummary[] {
  const lines = text
    .trim()
    .split('\n')
    .filter(l => !l.startsWith('#') && l.trim() !== '');


  const claims = lines.map(parseClaim);

  const byMember: Record<string, Claim[]> = {};
  for (const claim of claims) {
    if (!byMember[claim.memberId]) byMember[claim.memberId] = [];
    byMember[claim.memberId].push(claim);
  }


  return Object.entries(byMember).map(([memberId, memberClaims]) => {
    const totalAmount = memberClaims.reduce((acc, c) => acc + c.amount, 0);

    // const lastClaimDate = memberClaims.reduce((latest, c) =>
    //   c.date > latest ? c.date : latest,
    //   memberClaims[0].date
    // );

    // let lastClaimDate : Date = null;
    // for (const member of memberClaims){
    //   const date = new Date(member.date);
    //   if (lastClaimDate < date){
    //     lastClaimDate = date;
    //   }
    // }

    const toSortableDate = (date:string) => {
      const [day, month, year] = date.split('/');
      return `${year}${month}${day}`
    }

    let lastClaimDate : Date = memberClaims[0].date;
    for (const c of memberClaims){
      if (toSortableDate(lastClaimDate) < toSortableDate(c.date)){
        lastClaimDate = c.date;
      }
    }


    return {
      memberId,
      claimCount: memberClaims.length,
      totalAmount: Math.round(totalAmount * 100) / 100,
      lastClaimDate: lastClaimDate,
      capExceeded: totalAmount > YEARLY_CAP,
    };
  });
}
