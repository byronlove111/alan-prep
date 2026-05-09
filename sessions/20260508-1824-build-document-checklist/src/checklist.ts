import { findContract } from "./contracts";
import { getRequiredDocuments } from "./utils";
import { isPendingActivation } from "./contracts";
import type { Contract, MemberDocument, Member, ActivationReport, DocumentType } from "./types";

export function generateActivationReport(
	memberId: string,
	members: Member[],
	contracts: Contract[],
	documents: MemberDocument[]
  ): ActivationReport | null {
	const contract = findContract(contracts, memberId);
	if (!contract || !isPendingActivation(contract)) {
	  return null;
	}

	const report : ActivationReport = {
		memberId: memberId,
		contractId: contract.contractId,
		plan: contract.plan,
		activationStatus: "",
		missingDocuments : [],
		rejectedDocuments : [],
		checklist : []
	};
	
	const requiredDocuments = getRequiredDocuments(contract.plan);
	for (const requiredType of requiredDocuments) {
		const memberDoc = documents.find((document) => document.documentType == requiredType);
		if (!memberDoc) {
			report.missingDocuments.push(requiredType);
			report.checklist.push({
				documentType: requiredType,
				required: true,
				status: "missing"
			})
		} else if (memberDoc.status == "rejected") {
			report.rejectedDocuments.push(requiredType)
			report.checklist.push({
				documentType: requiredType,
				required: true,
				status: "rejected"
			})
		} else if (memberDoc.status == "pending"){
			report.checklist.push({
				documentType: requiredType,
				required: true,
				status: "pending"
			})
		} else {
			report.checklist.push({
				documentType: requiredType,
				required: true,
				status: "received"
			})
		}
	}

	if (report.rejectedDocuments.length > 0) {
		report.activationStatus = "blocked";
	} else if (report.missingDocuments.length > 0 || report.checklist.find((doc) => doc.status == "pending")) {
		report.activationStatus = "incomplete";
	} else {
		report.activationStatus = "ready";
	}

	return report;
  }