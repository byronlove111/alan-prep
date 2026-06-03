import { AssignmentResult, ConsultationRequest, Doctor } from "./types";

export function assignConsultations(
  requests: ConsultationRequest[],
  doctors: Doctor[],
): AssignmentResult[] {
  const results: AssignmentResult[] = [];
  for (const request of requests) {
    let result: AssignmentResult = {
      requestId: request.id,
      patientName: request.patientName,
      assignedDoctorId: null,
      assignedDoctorName: null,
      status: "unassigned",
    };

    const doctorsAvailable = doctors
      .filter(
        (doctor) =>
          doctor.specialty === request.specialty && doctor.availableSlots > 0,
      )
      .sort((a, b) => b.availableSlots - a.availableSlots);
    console.log(doctorsAvailable);

    if (doctorsAvailable.length === 0) {
      results.push(result);
      continue;
    }

    if (doctorsAvailable[0].availableSlots >= 1) {
      result.assignedDoctorId = doctorsAvailable[0].id;
      result.assignedDoctorName = doctorsAvailable[0].name;
      result.status = "assigned";
      doctorsAvailable[0].availableSlots -= 1;
    }
    results.push(result);
  }
  return results;
}
