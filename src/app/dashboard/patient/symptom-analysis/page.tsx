"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { analyzeSymptoms, type SymptomAnalysisInput, type SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis"
import { Loader2, AlertTriangle, Lightbulb, ClipboardList } from "lucide-react"

export default function SymptomAnalysisPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<SymptomAnalysisOutput | null>(null)
  const [formState, setFormState] = useState({
      name: "John Doe",
      age: "45",
      gender: "Male",
      medicalHistory: "Hypertension",
      medications: "Lisinopril",
      symptoms: "Experiencing persistent headaches and dizziness for the past 3 days.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setAnalysisResult(null)

    const input: SymptomAnalysisInput = {
        patientDetails: {
            name: formState.name,
            age: parseInt(formState.age, 10),
            gender: formState.gender,
            medicalHistory: formState.medicalHistory,
            medications: formState.medications,
        },
        symptoms: formState.symptoms
    }

    try {
      const result = await analyzeSymptoms(input)
      setAnalysisResult(result)
      toast({
          title: "Analysis Complete",
          description: "The AI has finished analyzing your symptoms.",
      })
    } catch (error) {
      console.error("Symptom analysis failed:", error)
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your symptoms. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Symptom Analysis</h1>
        <p className="text-muted-foreground">Describe your symptoms to get an AI-powered analysis.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Please provide some basic information. This will not be stored.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="symptom-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formState.name} onChange={handleChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" type="number" value={formState.age} onChange={handleChange} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input id="gender" name="gender" value={formState.gender} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                        <Textarea id="medicalHistory" name="medicalHistory" placeholder="e.g., Hypertension, Diabetes" value={formState.medicalHistory} onChange={handleChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="medications">Current Medications (Optional)</Label>
                        <Textarea id="medications" name="medications" placeholder="e.g., Lisinopril, Metformin" value={formState.medications} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="symptoms">Symptoms</Label>
                        <Textarea id="symptoms" name="symptoms" required placeholder="Describe your symptoms in detail..." className="min-h-[120px]" value={formState.symptoms} onChange={handleChange} />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                 <Button type="submit" form="symptom-form" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Analyze Symptoms
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
                <CardDescription>This is an AI-generated analysis. Always consult a doctor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="mt-4 text-muted-foreground">Analyzing your symptoms...</p>
                    </div>
                )}
                {!isLoading && !analysisResult && (
                     <div className="flex flex-col items-center justify-center h-full text-center bg-muted/50 rounded-lg p-8">
                        <p className="text-muted-foreground">Your analysis results will appear here.</p>
                     </div>
                )}
                {analysisResult && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Possible Conditions</h3>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                {analysisResult.possibleConditions.map((cond, i) => <li key={i}>{cond}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-5 w-5 text-yellow-500" /> Recommendations</h3>
                             <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                {analysisResult.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" /> Notes for Doctor</h3>
                            <p className="text-sm mt-2">{analysisResult.doctorNotes}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>

      </div>
    </div>
  )
}
