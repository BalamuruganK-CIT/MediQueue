import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { appointments } from "@/lib/mock-data"
import { ArrowUpRight, UserPlus, FilePlus } from "lucide-react"
import Link from "next/link"

export default function DoctorDashboard() {
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Accepted"
  ).slice(0, 3);
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Doctor!</h1>
        <p className="text-muted-foreground">Here's what's on your schedule for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Appointments</CardTitle>
            <CardDescription>New requests need your review.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{pendingAppointmentsCount}</div>
            <p className="text-sm text-muted-foreground">requests waiting for approval.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/doctor/appointments?role=doctor">
                Review Requests <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Appointments</CardTitle>
            <CardDescription>All scheduled appointments for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{appointments.length}</div>
            <p className="text-sm text-muted-foreground">{upcomingAppointments.length} upcoming today.</p>
          </CardContent>
           <CardFooter>
             <Button className="w-full" variant="outline" asChild>
               <Link href="/dashboard/doctor/appointments?role=doctor">
                View All Appointments
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
             <CardDescription>Shortcuts for common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/doctor/prescriptions?role=doctor">
                <FilePlus className="mr-2 h-4 w-4" />
                Add New Prescription
              </Link>
            </Button>
             <Button className="w-full justify-start" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Register New Patient
            </Button>
          </CardContent>
        </Card>
      </div>

       <div>
        <h2 className="text-2xl font-bold tracking-tight">Upcoming Appointments</h2>
        <Card className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {upcomingAppointments.length > 0 ? upcomingAppointments.map(appt => (
              <TableRow key={appt.id}>
                <TableCell className="font-medium">{appt.patientName}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell><Badge>Accepted</Badge></TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">No upcoming appointments.</TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </Card>
      </div>

    </div>
  )
}
