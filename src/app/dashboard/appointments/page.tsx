"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { appointments } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { toast } = useToast()

  const handleScheduleAppointment = () => {
    toast({
      title: "Appointment Scheduled!",
      description: "Your appointment has been successfully booked.",
      className: "bg-accent text-accent-foreground border-accent",
    })
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
                    <TableCell>{appt.date} at {appt.time}</TableCell>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">Schedule New Appointment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
              <DialogDescription>Fill in the details to book your appointment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">Doctor</Label>
                <Select>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="evelyn_reed">Dr. Evelyn Reed (Cardiology)</SelectItem>
                        <SelectItem value="marcus_holloway">Dr. Marcus Holloway (Neurology)</SelectItem>
                        <SelectItem value="lena_petrova">Dr. Lena Petrova (Dermatology)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <p className="col-span-3 text-sm">{date?.toLocaleDateString() || 'Please select a date'}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Select>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1000">10:00 AM</SelectItem>
                        <SelectItem value="1100">11:00 AM</SelectItem>
                        <SelectItem value="1400">02:00 PM</SelectItem>
                        <SelectItem value="1500">03:00 PM</SelectItem>
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
