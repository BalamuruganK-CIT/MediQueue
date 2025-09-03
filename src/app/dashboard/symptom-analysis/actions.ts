"use server";

import { analyzeSymptoms as analyzeSymptomsFlow, type SymptomAnalysisInput, type SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

export async function analyzeSymptoms(input: SymptomAnalysisInput): Promise<{ success: boolean; data?: SymptomAnalysisOutput; error?: string; }> {
  try {
    const result = await analyzeSymptomsFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to analyze symptoms. Please try again." };
  }
}
