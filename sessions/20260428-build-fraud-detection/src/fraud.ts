import { Claim, FraudFlag, FraudReason } from "./types";
import { sampleClaims } from "../data/sample";
import { claimsByMember } from "./claims";

function formatDate(date: string): string {
	const [day, month, year] = date.split('/');
	return `${year}${month}`;
};

export function flagSuspicious(claims: Claim[]): FraudFlag[]{

	if (claims.length <= 0) return [];

	const members : Record<string, Claim> = claimsByMember(claims);
	const flags : FraudFlag[] = [];

	for (const [memberId, memberClaims] of Object.entries(members)){

		const reasons: FraudReason[] = [];
		const suspiciousClaims: string[] = [];

		// test 1 : Duplicate Act the same day
		const byActAndDate : Record<string, Claim[]> = {};

		for (const claim of memberClaims){
		const key = `${claim.actCode}|${claim.date}`;
		if (!byActAndDate[key])
			byActAndDate[key] = [];
		byActAndDate[key].push(claim);
		}

		for (const [key, group] of Object.entries(byActAndDate)){
			if (group.length >= 2){
				reasons.push("duplicate_act_same_day");
				suspiciousClaims.push(...group.map(c => c.id));
			}
		}

		// test 2 : amount above treshold
		for (const claim of memberClaims){
			if (claim.amount > 200){
				if (!reasons.includes("amount_above_threshold")){
					reasons.push("amount_above_threshold");
				}
				if (!suspiciousClaims.includes(claim.id)){
					suspiciousClaims.push(claim.id);
				}
			}
		}

		// test 3 : more than 5 claims in the same month
		const byMonth: Record<string, Claim[]> = {};

		for (const claim of memberClaims){
			const key = formatDate(claim.date);
			if (!byMonth[key]){
				byMonth[key] = [];
			}
			byMonth[key].push(claim);
		}

		for (const [, monthGroup] of Object.entries(byMonth)){
			if (monthGroup.length > 5){
				if (!reasons.includes("high_frequency")){
					reasons.push("high_frequency");
				}
				for (const claim of monthGroup) {
					if (!suspiciousClaims.includes(claim.id)) {
					  suspiciousClaims.push(claim.id);
					}
				  }
			}
		}

		if (reasons.length > 0){
			flags.push({
				memberId, reasons, suspiciousClaims
			});
		}
	}
	return flags
}