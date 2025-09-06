import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { billingHistory, paymentMethods } from "@/lib/mock-data"
import { PlusCircle, Download, CreditCard } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
        <p className="text-muted-foreground">Manage your billing information and view your payment history.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>A record of all your invoices and payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                       <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
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
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                     <CreditCard className="h-8 w-8 text-muted-foreground" />
                     <div>
                       <p className="font-medium">{method.cardType} ending in {method.last4}</p>
                       <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                     </div>
                  </div>
                   <Button variant="outline" size="sm">Remove</Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4"/>
                  Add New Card
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
