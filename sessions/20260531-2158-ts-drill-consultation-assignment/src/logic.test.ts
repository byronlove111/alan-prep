import { assignConsultations } from "./logic";
import { ConsultationRequest, Doctor } from "./types";

describe("assignConsultations", () => {
  it("assigne au médecin avec le plus de slots disponibles", () => {
    const doctors: Doctor[] = [
      { id: 1, name: "Dr. Martin", specialty: "Cardiologie", availableSlots: 1 },
      { id: 2, name: "Dr. Chen",   specialty: "Cardiologie", availableSlots: 5 },
    ];
    const requests: ConsultationRequest[] = [
      { id: 1, patientName: "Alice", specialty: "Cardiologie" },
    ];
    const result = assignConsultations(requests, doctors);
    expect(result[0].status).toBe("assigned");
    expect(result[0].assignedDoctorId).toBe(2);
  });

  it("quand un médecin est plein, la demande suivante va chez l'autre — au-delà : unassigned", () => {
    const doctors: Doctor[] = [
      { id: 1, name: "Dr. Martin", specialty: "Cardiologie", availableSlots: 1 },
      { id: 2, name: "Dr. Chen",   specialty: "Cardiologie", availableSlots: 1 },
    ];
    const requests: ConsultationRequest[] = [
      { id: 1, patientName: "Alice", specialty: "Cardiologie" },
      { id: 2, patientName: "Bruno", specialty: "Cardiologie" },
      { id: 3, patientName: "Clara", specialty: "Cardiologie" },
    ];
    const result = assignConsultations(requests, doctors);
    expect(result[0].status).toBe("assigned");
    expect(result[1].status).toBe("assigned");
    expect(result[2].status).toBe("unassigned");
    expect(result[2].assignedDoctorId).toBeNull();
  });
});
