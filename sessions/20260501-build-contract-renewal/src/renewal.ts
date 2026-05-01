import { RenewalNotice, Member, Contract, UrgencyLevel } from "./types"
import { daysBetween, isActiveStatus, parseDate } from "./utils";
import { findMember } from "./members";

export function checkRenewals(listContracts: Contract[], listMembers: Member[], referenceDate: Date) : RenewalNotice[] {
	const renewalList : RenewalNotice[] = [];

	for (const contract of listContracts){
		let urgency: UrgencyLevel = "";
		
		if (!isActiveStatus(contract.status)) {
			continue;
		}

		const diff: number = daysBetween(parseDate(contract.endDate), referenceDate);
		if (diff >= 0) {
			continue;
		} else if (diff >= -14) {
			urgency = "critical"
		} else if (diff >= -30) {
			urgency = "warning"
		} else if (diff < -30) {
			urgency = "ok";
		}

		const member : Member = findMember(listMembers, contract.memberId);
		renewalList.push({
			contractId: contract.id,
			memberId: member.id,
			memberName: member.name,
			memberEmail: member.email,
			coverageLevel: contract.coverageLevel,
			endDate: contract.endDate,
			daysUntilExpiry: -diff,
			urgency: urgency,
		} as RenewalNotice);
	}
	return renewalList;
}