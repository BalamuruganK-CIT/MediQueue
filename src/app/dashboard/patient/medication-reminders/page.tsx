"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, BellRing } from "lucide-react"

export default function MedicationRemindersPage() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Medication Reminders</h1>
            <p className="text-muted-foreground">Manage your medication schedules and reminders.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Reminder
        </Button>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Active Reminders</CardTitle>
            <CardDescription>Your current list of medication reminders.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center text-center bg-muted/50 rounded-lg p-12">
                <BellRing className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">You have no active reminders set.</p>
                <p className="text-sm text-muted-foreground mt-2">Click "Add New Reminder" to get started.</p>
            </div>
        </CardContent>
      </Card>

    </div>
  )
}
