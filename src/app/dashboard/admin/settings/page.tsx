"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettingsPage() {
    const { toast } = useToast()
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Manage global application settings and configurations.</p>
      </div>

       <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">System Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
              <CardDescription>Update the basic information for the hospital.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospital-name">Hospital Name</Label>
                <Input id="hospital-name" defaultValue="MediTrack General Hospital" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-address">Address</Label>
                <Input id="hospital-address" defaultValue="123 Health St, Wellness City" />
              </div>
              <Button onClick={() => toast({title: "Settings Saved"})}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
            <Card>
                 <CardHeader>
                    <CardTitle>User Role Management</CardTitle>
                    <CardDescription>Assign or change roles for users in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center bg-muted/50 rounded-md h-64">
                         <p className="text-muted-foreground">[User management interface would be here]</p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <CardTitle>System-Wide Notifications</CardTitle>
                    <CardDescription>Send announcements or alerts to all users.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">Put the app into maintenance mode for updates.</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>Broadcast Message</Label>
                            <p className="text-sm text-muted-foreground">Send a one-time message to all active users.</p>
                        </div>
                        <Button variant="outline">Send Message</Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
