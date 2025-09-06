"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { appointments as initialAppointments, type Appointment } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleScheduleAppointment = () => {
    if (!selectedDoctor || !date || !selectedTime) {
      toast({
        title: "Incomplete Information",
        description: "Please select a doctor, date, and time.",
        variant: "destructive",
      })
      return
    }

    const doctorInfo = selectedDoctor.split("(")
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      doctor: doctorInfo[0].trim(),
      specialty: doctorInfo[1].replace(")", "").trim(),
      date: date.toISOString().split("T")[0],
      time: selectedTime,
      status: "Upcoming",
    }

    setAppointments((prev) => [...prev, newAppointment].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    
    toast({
      title: "Appointment Scheduled!",
      description: "A confirmation email has been sent to your registered address.",
      className: "bg-accent text-accent-foreground border-accent",
    })

    // Reset form and close dialog
    setSelectedDoctor("")
    setSelectedTime("")
    setIsDialogOpen(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>My Appointments</CardTitle>
            <CardDescription>View and manage your scheduled appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">{appt.doctor}</TableCell>
                    <TableCell>{appt.specialty}</TableCell>
                    <TableCell>{new Date(appt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})} at {appt.time}</TableCell>
                    <TableCell>
                      <Badge variant={appt.status === 'Upcoming' ? 'default' : appt.status === 'Completed' ? 'secondary' : 'destructive'}>
                        {appt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Schedule an Appointment</CardTitle>
            <CardDescription>Select a date to see availability.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
          </CardContent>
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg" onClick={() => setIsDialogOpen(true)}>Schedule New Appointment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
              <DialogDescription>Fill in the details to book your appointment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">Doctor</Label>
                <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Dr. Evelyn Reed (Cardiology)">Dr. Evelyn Reed (Cardiology)</SelectItem>
                        <SelectItem value="Dr. Marcus Holloway (Neurology)">Dr. Marcus Holloway (Neurology)</SelectItem>
                        <SelectItem value="Dr. Lena Petrova (Dermatology)">Dr. Lena Petrova (Dermatology)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <p className="col-span-3 text-sm">{date?.toLocaleDateString() || 'Please select a date'}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Select onValueChange={setSelectedTime} value={selectedTime}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                        <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleScheduleAppointment}>Confirm Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
