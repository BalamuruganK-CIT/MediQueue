"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prescriptions as initialPrescriptions, type Prescription } from "@/lib/mock-data"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleAddPrescription = (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newPrescription: Prescription = {
        id: `p${prescriptions.length + 1}`,
        patientName: formData.get('patientName') as string,
        medication: formData.get('medication') as string,
        dosage: formData.get('dosage') as string,
        frequency: formData.get('frequency') as string,
        dateIssued: new Date().toISOString().split('T')[0]
    };
    
    setPrescriptions(prev => [newPrescription, ...prev]);
    setIsDialogOpen(false)
    toast({
        title: "Prescription Added",
        description: `Successfully added prescription for ${newPrescription.patientName}.`
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prescription Management</h1>
          <p className="text-muted-foreground">Create and manage patient prescriptions.</p>
        </div>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddPrescription}>
                <DialogHeader>
                <DialogTitle>New Prescription</DialogTitle>
                <DialogDescription>Fill in the details to issue a new prescription.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input id="patientName" name="patientName" placeholder="e.g., John Doe" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" name="medication" placeholder="e.g., Atorvastatin" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" name="dosage" placeholder="e.g., 20mg" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input id="frequency" name="frequency" placeholder="e.g., Once a day" />
                    </div>
                </div>
                </div>
                <DialogFooter>
                <Button type="submit">Issue Prescription</Button>
                </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.patientName}</TableCell>
                  <TableCell>{p.medication}</TableCell>
                  <TableCell>{p.dosage}</TableCell>
                  <TableCell>{p.frequency}</TableCell>
                  <TableCell>{new Date(p.dateIssued).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Print</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
