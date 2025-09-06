import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CalendarPlus, PhoneOutgoing, BellRing, FileText, Stethoscope } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Here's your health summary.</p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Find a doctor and schedule your visit.</CardDescription>
            </CardHeader>
            <CardContent>
                <Stethoscope className="h-16 w-16 text-primary" />
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href="/dashboard/patient/appointments?role=patient">
                        Find a Doctor <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Emergency Call</CardTitle>
                <CardDescription>Instantly connect with our emergency services.</CardDescription>
            </CardHeader>
            <CardContent>
                 <PhoneOutgoing className="h-16 w-16 text-destructive" />
            </CardContent>
             <CardFooter>
                <Button className="w-full" variant="destructive">
                    Call Emergency Line <PhoneOutgoing className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>View Prescriptions</CardTitle>
                <CardDescription>Access your complete prescription history.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center">
                <FileText className="h-16 w-16 text-primary" />
            </CardContent>
            <CardFooter>
                 <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/patient/prescriptions?role=patient">
                        View History
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>

       <div className="grid gap-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
                <CardDescription>Stay on track with your prescribed medications.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center">
                 <BellRing className="h-20 w-20 text-primary mb-4" />
                <p className="text-muted-foreground">You have 3 active reminders for today.</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/patient/medication-reminders?role=patient">
                        Manage Reminders
                    </Link>
                </Button>
            </CardFooter>
        </Card>
       </div>

    </div>
  )
}
