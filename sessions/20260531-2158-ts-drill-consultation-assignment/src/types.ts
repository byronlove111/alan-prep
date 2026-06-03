export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  availableSlots: number;
};

export type ConsultationRequest = {
  id: number;
  patientName: string;
  specialty: string;
};

export type AssignmentStatus = "assigned" | "unassigned";

export type AssignmentResult = {
  requestId: number;
  patientName: string;
  assignedDoctorId: number | null;
  assignedDoctorName: string | null;
  status: AssignmentStatus;
};
