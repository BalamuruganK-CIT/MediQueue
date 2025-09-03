import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"

export default function TelemedicinePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Telemedicine</h1>
        <p className="text-muted-foreground">Connect with your doctors remotely through secure video calls.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Virtual Consultation</CardTitle>
            <CardDescription>with Dr. Evelyn Reed (Cardiology)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Image
                src="https://picsum.photos/100/100"
                alt="Dr. Evelyn Reed"
                width={80}
                height={80}
                className="rounded-full"
                data-ai-hint="doctor portrait"
              />
              <div>
                <p className="font-semibold">Today at 3:00 PM</p>
                <p className="text-sm text-muted-foreground">Topic: Follow-up on recent tests</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Video className="mr-2 h-4 w-4" />
              Join Video Call
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="flex flex-col justify-between">
           <CardHeader>
            <CardTitle>How Telemedicine Works</CardTitle>
          </CardHeader>
          <CardContent>
            <Image 
                src="https://picsum.photos/600/400"
                alt="Telemedicine illustration"
                width={600}
                height={400}
                className="rounded-md"
                data-ai-hint="telemedicine online"
            />
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Schedule a virtual appointment.</li>
              <li>Receive a confirmation email with a link to your secure video call.</li>
              <li>At the time of your appointment, click the link to join the call.</li>
              <li>You will need a device with a camera, microphone, and internet connection.</li>
            </ul>
          </CardContent>
           <CardFooter>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
