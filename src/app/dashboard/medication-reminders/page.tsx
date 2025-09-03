"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { medicationReminders } from "@/lib/mock-data"
import { Bell, PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MedicationRemindersPage() {
  const { toast } = useToast()

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set!",
      description: "We will notify you when it's time to take your medication.",
      className: "bg-accent text-accent-foreground border-accent",
    })
  }

  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Medication Reminders</h1>
        <p className="text-muted-foreground">Stay on top of your medication schedule with custom reminders.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {medicationReminders.map((reminder) => (
          <Card key={reminder.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{reminder.medication}</CardTitle>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{reminder.dosage}</p>
              <p className="text-2xl font-bold">{reminder.time}</p>
            </CardContent>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-muted/50 transition-colors hover:border-primary hover:bg-muted">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <PlusCircle className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="font-semibold">Add New Reminder</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Medication Reminder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="medication-name">Medication Name</Label>
                <Input id="medication-name" placeholder="e.g., Atorvastatin" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" placeholder="e.g., 20mg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSetReminder}>Set Reminder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
