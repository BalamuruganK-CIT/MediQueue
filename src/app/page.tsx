"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle authentication here.
    // For this prototype, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  function Logo() {
    return (
      <div className="flex items-center gap-2.5 p-2 font-semibold tracking-tighter text-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-primary"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="text-xl">MediTrack</span>
      </div>
    );
  }

  const LoginForm = ({ role }: { role: string }) => (
    <form onSubmit={handleLogin}>
      <CardHeader>
        <CardTitle>{role} Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <div className="p-6 pt-0">
         <Button className="w-full" type="submit">Login</Button>
      </div>
    </form>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
       <div className="mb-8">
        <Logo />
       </div>
      <Tabs defaultValue="patient" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="doctor">Doctor</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <Card className="mt-4">
            <TabsContent value="patient">
                <LoginForm role="Patient" />
            </TabsContent>
            <TabsContent value="doctor">
                <LoginForm role="Doctor" />
            </TabsContent>
            <TabsContent value="admin">
                <LoginForm role="Admin" />
            </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
