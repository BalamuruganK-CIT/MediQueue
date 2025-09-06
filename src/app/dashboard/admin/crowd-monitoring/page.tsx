import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"

const crowdData = [
    { department: 'Emergency Room', level: 90, status: 'High' },
    { department: 'Outpatient Department (OPD)', level: 75, status: 'High' },
    { department: 'Pharmacy', level: 60, status: 'Medium' },
    { department: 'Radiology', level: 40, status: 'Low' },
    { department: 'Pathology Lab', level: 25, status: 'Low' },
]

export default function CrowdMonitoringPage() {
  const getProgressColor = (level: number) => {
    if (level > 80) return 'bg-destructive';
    if (level > 60) return 'bg-orange-500';
    return 'bg-primary';
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crowd Monitoring</h1>
        <p className="text-muted-foreground">Real-time crowd levels across different hospital departments.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {crowdData.map((data) => (
           <Card key={data.department}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{data.department}</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{data.level}% Full</div>
                <p className="text-xs text-muted-foreground">Status: {data.status}</p>
                <Progress value={data.level} className="mt-4 h-3" indicatorClassName={getProgressColor(data.level)} />
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
