"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { labResults, medicalHistory, prescriptions } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function HealthRecordsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Records</h1>
        <p className="text-muted-foreground">Access your complete medical history, prescriptions, and lab results.</p>
      </div>
      <Tabs defaultValue="history">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="lab_results">Lab Results</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>A log of your past diagnoses and treatments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalHistory.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.date}</TableCell>
                      <TableCell className="font-medium">{event.event}</TableCell>
                      <TableCell>{event.doctor}</TableCell>
                      <TableCell>{event.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prescriptions">
           <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>All medications prescribed by your doctors.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Issued</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Prescribed by</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.dateIssued}</TableCell>
                      <TableCell className="font-medium">{p.medication}</TableCell>
                      <TableCell>{p.dosage}</TableCell>
                      <TableCell>{p.frequency}</TableCell>
                      <TableCell>{p.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lab_results">
           <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
              <CardDescription>Your history of lab test results.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.date}</TableCell>
                      <TableCell className="font-medium">{result.testName}</TableCell>
                      <TableCell>{result.result}</TableCell>
                      <TableCell><Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download PDF</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
