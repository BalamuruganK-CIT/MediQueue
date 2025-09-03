"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { analyzeSymptoms } from "./actions"
import { Loader2, Lightbulb, ShieldCheck } from "lucide-react"
import type { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis"

interface AnalysisState {
  data: SymptomAnalysisOutput | null;
  error: string | null;
}

export default function SymptomAnalysisPage() {
  const [symptoms, setSymptoms] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);

    const result = await analyzeSymptoms({ symptoms });
    if (result.success && result.data) {
      setAnalysisResult({ data: result.data, error: null });
    } else {
      setAnalysisResult({ data: null, error: result.error || "An unknown error occurred." });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Symptom Analysis</h1>
        <p className="text-muted-foreground">
          Describe your symptoms, and our AI will provide potential causes and recommendations.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold">Disclaimer:</span> This tool is not a substitute for professional medical advice.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>
              Be as detailed as possible. Include when the symptoms started, their severity, and any other relevant information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., I have a persistent dry cough, a mild fever, and a headache that started 3 days ago..."
              rows={6}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || !symptoms.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Analyze Symptoms
            </Button>
          </CardFooter>
        </form>
      </Card>

      {analysisResult && (
        <div className="grid gap-6 md:grid-cols-2">
          {analysisResult.data && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Possible Causes</CardTitle>
                    <CardDescription>Based on the symptoms you provided.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{analysisResult.data.possibleCauses}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-accent-foreground" />
                  <div>
                    <CardTitle>Recommended Actions</CardTitle>
                    <CardDescription>Suggestions for your next steps.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                   <p className="text-sm whitespace-pre-wrap">{analysisResult.data.recommendedActions}</p>
                </CardContent>
              </Card>
            </>
          )}
          {analysisResult.error && (
            <Card className="md:col-span-2 border-destructive">
               <CardHeader>
                  <CardTitle className="text-destructive">Analysis Failed</CardTitle>
               </CardHeader>
               <CardContent>
                  <p>{analysisResult.error}</p>
               </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
