export type PatientMeasurement = {
  date: Date;
  weight: number;
  height: number;
};

export type BmiCategory = "Normal" | "Surpoids" | "Obèse";

export type AnalysisResult = {
  date: Date;
  bmi: number;
  category: BmiCategory;
  changePercent: number | null;
};
