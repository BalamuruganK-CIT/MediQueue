'use server';
/**
 * @fileOverview A symptom analysis AI agent.
 *
 * - analyzeSymptoms - A function that handles the symptom analysis process.
 * - SymptomAnalysisInput - The input type for the analyzeSymptoms function.
 * - SymptomAnalysisOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  patientDetails: z.object({
    name: z.string().describe('The name of the patient.'),
    age: z.number().describe('The age of the patient.'),
    gender: z.string().describe('The gender of the patient.'),
    medicalHistory: z.string().optional().describe('The relevant medical history of the patient.'),
    medications: z.string().optional().describe('A list of current medications the patient is taking.'),
  }),
  symptoms: z.string().describe('A description of the symptoms the patient is experiencing.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
    possibleConditions: z.array(z.string()).describe("A list of possible conditions or diagnoses based on the symptoms."),
    recommendations: z.array(z.string()).describe("Recommended next steps, tests, or precautions for the patient."),
    doctorNotes: z.string().describe("Critical information or notes for the doctor.")
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptoms(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are a medical assistant AI. Analyze the patient's symptoms carefully.
Provide:
1. Possible conditions or diagnoses.
2. Recommended next steps, tests, or precautions.
3. Notes for the doctor about any critical information.

Patient Details:
- Name: {{{patientDetails.name}}}
- Age: {{{patientDetails.age}}}
- Gender: {{{patientDetails.gender}}}
- Medical History: {{{patientDetails.medicalHistory}}}
- Medications: {{{patientDetails.medications}}}

Symptoms:
{{{symptoms}}}
`,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Unable to get analysis from the model.");
    }
    return output;
  }
);
