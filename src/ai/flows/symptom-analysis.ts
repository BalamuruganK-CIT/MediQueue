'use server';

/**
 * @fileOverview Provides symptom analysis based on user input.
 *
 * - analyzeSymptoms - Analyzes symptoms and suggests possible causes and actions.
 * - SymptomAnalysisInput - The input type for the analyzeSymptoms function.
 * - SymptomAnalysisOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the symptoms experienced by the patient.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  possibleCauses: z
    .string()
    .describe('A list of possible causes for the symptoms.'),
  recommendedActions: z
    .string()
    .describe('Recommended actions based on the symptoms, such as seeking medical advice or home care.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptoms(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are a helpful AI assistant that analyzes symptoms provided by patients and suggests possible causes and recommended actions.

  Analyze the following symptoms:
  {{symptoms}}

  Provide a list of possible causes and recommended actions in the output.
  Format the possible causes and recommended actions as a single paragraph each.`,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
