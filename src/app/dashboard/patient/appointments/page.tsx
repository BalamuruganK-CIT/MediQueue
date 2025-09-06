
"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { appointments } from "@/lib/mock-data"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function PatientAppointmentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const patientName = "John Doe" // In a real app, this would come from user session
    const patientAppointments = appointments.filter(a => a.patientName === patientName);
    const { toast } = useToast()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
                <p className="text-muted-foreground">View your upcoming appointments and schedule new ones.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule a New Appointment</CardTitle>
                        <CardDescription>Select a date and time that works for you.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                        <Button className="w-full" onClick={() => toast({title: "Appointment Booked!", description: "Your appointment has been successfully scheduled."})}>Book Appointment</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                        <CardDescription>Here are your scheduled appointments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patientAppointments.map(appt => (
                                    <TableRow key={appt.id}>
                                        <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{appt.time}</TableCell>
                                        <TableCell><Badge variant={appt.status === 'Accepted' ? 'default' : 'outline'}>{appt.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
