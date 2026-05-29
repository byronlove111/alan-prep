import { AnalysisResult, PatientMeasurement, BmiCategory } from "./types";

export function analyzePatientHistory(
  measurements: PatientMeasurement[]
): AnalysisResult[] {
  const analysisResults : AnalysisResult[] = [];

  for (const measurement of measurements) {
    const heightInMeters = measurement.height / 100;
    const bmi = Math.round(measurement.weight / (heightInMeters * heightInMeters) * 100) / 100;
    let bmiCategory : BmiCategory = "Normal";

    if (bmi < 25) {
      bmiCategory = "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = "Surpoids";
    } else {
      bmiCategory = "Obèse";
    }

    analysisResults.push({
      date: measurement.date,
      bmi: bmi,
      category: bmiCategory,
      changePercent: null
    });

  }

  for (let i = 0; i < analysisResults.length; i++) {
    if (i === 0) {
      analysisResults[i].changePercent = null;
      continue;
    }

    const lastAnalysis = analysisResults[i - 1];
    const analysis = analysisResults[i];
    
    analysisResults[i].changePercent = ((analysis.bmi - lastAnalysis.bmi) / lastAnalysis.bmi) * 100;
  }

  return analysisResults;
}