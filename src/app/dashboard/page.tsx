import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { appointments } from "@/lib/mock-data"
import { ArrowUpRight, FileText, Video } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Upcoming"
  ).slice(0, 1);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Patient!</h1>
        <p className="text-muted-foreground">Here's a quick overview of your health dashboard.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
            <CardDescription>Your next scheduled visit.</CardDescription>
          </CardHeader>
          {upcomingAppointments.length > 0 ? (
            <>
              <CardContent className="flex-grow">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Video className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {upcomingAppointments[0].doctor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {upcomingAppointments[0].specialty}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(upcomingAppointments[0].date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {upcomingAppointments[0].time}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/dashboard/appointments">
                    View All Appointments <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </>
          ) : (
            <CardContent>
              <p className="text-muted-foreground">No upcoming appointments.</p>
            </CardContent>
          )}
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Symptom Analysis</CardTitle>
            <CardDescription>Get an AI-powered analysis of your symptoms.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Feeling unwell? Describe your symptoms to get instant insights and recommendations.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/symptom-analysis">
                Start Analysis <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Recent Lab Result</CardTitle>
            <CardDescription>Your latest test results are in.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium leading-none">Cholesterol Panel</p>
                 <p className="text-sm text-muted-foreground">Results are within normal range.</p>
                 <Badge variant="secondary" className="mt-1">View Details</Badge>
              </div>
            </div>
          </CardContent>
           <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/dashboard/health-records">
                View All Health Records
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Your Medication Schedule</h2>
        <Card className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Lisinopril</TableCell>
                <TableCell>10mg</TableCell>
                <TableCell>08:00 AM</TableCell>
                <TableCell><Badge className="border-transparent bg-accent text-accent-foreground hover:bg-accent/90">Taken</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Metformin</TableCell>
                <TableCell>500mg</TableCell>
                <TableCell>09:00 AM</TableCell>
                <TableCell><Badge variant="outline">Upcoming</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Metformin</TableCell>
                <TableCell>500mg</TableCell>
                <TableCell>09:00 PM</TableCell>
                <TableCell><Badge variant="outline">Upcoming</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
