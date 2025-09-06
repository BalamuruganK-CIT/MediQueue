
"use client"

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { appointments as initialAppointments, type Appointment } from "@/lib/mock-data"
import { Check, X, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const { toast } = useToast()

  const handleStatusChange = (id: string, status: 'Accepted' | 'Rejected') => {
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status } : appt))
    toast({
      title: `Appointment ${status}`,
      description: `The appointment has been successfully ${status.toLowerCase()}.`
    })
  }

  const getBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'Accepted':
        return 'default';
      case 'Completed':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      case 'Pending':
      default:
        return 'outline';
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Appointments</h1>
        <p className="text-muted-foreground">Review and manage upcoming appointments.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="font-medium">{appt.patientName}</TableCell>
                  <TableCell>{appt.age}</TableCell>
                  <TableCell>{appt.gender}</TableCell>
                  <TableCell>{new Date(appt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric'})} at {appt.time}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(appt.status)}>
                      {appt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {appt.status === 'Pending' ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(appt.id, 'Accepted')}>
                          <Check className="mr-2 h-4 w-4" /> Accept
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleStatusChange(appt.id, 'Rejected')}>
                          <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Patient History</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
