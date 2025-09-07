"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Save } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const initialCrowdData = [
    { department: 'Emergency Room', level: 90, status: 'High' },
    { department: 'Outpatient Department (OPD)', level: 75, status: 'High' },
    { department: 'Pharmacy', level: 60, status: 'Medium' },
    { department: 'Radiology', level: 40, status: 'Low' },
    { department: 'Pathology Lab', level: 25, status: 'Low' },
]

export default function CrowdMonitoringPage() {
  const [crowdData, setCrowdData] = useState(initialCrowdData);
  const { toast } = useToast();

  const getIndicatorColor = (level: number) => {
    if (level > 80) return 'bg-destructive';
    if (level > 60) return 'bg-orange-500';
    return 'bg-primary';
  }

  const getStatus = (level: number) => {
    if (level > 80) return 'High';
    if (level > 60) return 'Medium';
    return 'Low';
  }

  const handleLevelChange = (department: string, newLevel: number[]) => {
    setCrowdData(prevData =>
      prevData.map(data =>
        data.department === department
          ? { ...data, level: newLevel[0], status: getStatus(newLevel[0]) }
          : data
      )
    );
  };

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend.
    // For this prototype, we'll just show a confirmation.
    toast({
      title: "Changes Saved!",
      description: "The crowd levels have been successfully updated.",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crowd Management</h1>
          <p className="text-muted-foreground">Adjust real-time crowd levels across different hospital departments.</p>
        </div>
        <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {crowdData.map((data) => (
           <Card key={data.department}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{data.department}</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground"/>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="text-2xl font-bold">{data.level}% Full</div>
                    <p className="text-xs text-muted-foreground">Status: {data.status}</p>
                </div>
                <Progress value={data.level} className="h-3" indicatorClassName={getIndicatorColor(data.level)} />
                 <div className="space-y-2">
                    <Label htmlFor={`slider-${data.department}`}>Adjust Level</Label>
                    <Slider
                        id={`slider-${data.department}`}
                        value={[data.level]}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleLevelChange(data.department, value)}
                    />
                </div>
            </CardContent>
           </Card>
        ))}
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Floor Plan Heatmap</CardTitle>
          <CardDescription>Visual representation of crowd density.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center bg-muted/50 rounded-md h-96">
            <p className="text-muted-foreground">[Heatmap visualization would be displayed here]</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
