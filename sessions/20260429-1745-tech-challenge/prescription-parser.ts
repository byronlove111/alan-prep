export interface Act {
  code: string;
  label: string;
  amount: number;
}

export interface Prescription {
  patient: string;
  doctor: string;
  date: string;
  acts: Act[];
}

// Parses a single act line: "C 23|Consultation généraliste|25.00"
function parseAct(line: string): Act {
  const [rawCode, label, rawAmount] = line.split("|").map((s) => s.trim());
  const code = rawCode.split(" ").join(""); // "C 23" → "C23"
  return {
    code,
    label,
    amount: parseFloat(rawAmount),
  };
}

function extractDoctorName(line: string): string {
  if (line.includes("Dr")) {
    return line.replace("Medecin : Dr. ", "");
  } else if (line.includes("Pr")) {
    return line.replace("Medecin : Pr. ", "");
  } else {
    return line.replace("Medecin : ", "");
  }
}

// Parses a full prescription text and returns structured data
export function parsePrescription(raw: string): Prescription {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const patient = lines[1].replace("Patient : ", "");

  const doctor = extractDoctorName(lines[2]);

  const date = lines[3].replace("Date : ", "");

  const sepIndex = lines.indexOf("---");
  const actLines = lines.slice(sepIndex + 1);

  const acts = actLines.slice(0, actLines.length).map(parseAct);

  return { patient, doctor, date, acts };
}
