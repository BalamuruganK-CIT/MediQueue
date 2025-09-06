
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { billingHistory } from "@/lib/mock-data"
import { Download } from "lucide-react"

export default function PatientBillingPage() {
    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'Paid':
                return 'secondary';
            case 'Pending':
                return 'outline';
            case 'Overdue':
                return 'destructive';
            default:
                return 'default';
        }
    }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
        <p className="text-muted-foreground">
          View your billing history and make payments.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              A complete record of your medical bills.
            </CardDescription>
          </div>
           <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All Invoices
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Date</TableHead>
                <TableHead>Service Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.length > 0 ? (
                billingHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{item.service}</TableCell>
                    <TableCell>${item.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                    </TableCell>
                     <TableCell>
                      {item.status === 'Pending' || item.status === 'Overdue' ? (
                        <Button size="sm">Pay Now</Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>Paid</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No billing history found.
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
