
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prescriptions } from "@/lib/mock-data"

export default function PatientPrescriptionsPage() {
  const patientName = "John Doe" // In a real app, this would come from user session
  const patientPrescriptions = prescriptions.filter(
    (p) => p.patientName === patientName
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Prescriptions</h1>
        <p className="text-muted-foreground">
          Here is a list of all your prescriptions on record.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prescription History</CardTitle>
          <CardDescription>
            A complete record of your prescribed medications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Date Issued</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientPrescriptions.length > 0 ? (
                patientPrescriptions.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.medication}</TableCell>
                    <TableCell>{p.dosage}</TableCell>
                    <TableCell>{p.frequency}</TableCell>
                    <TableCell>
                      {new Date(p.dateIssued).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No prescriptions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
