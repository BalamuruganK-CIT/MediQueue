"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

function getUserDetails(role: string | null) {
    switch (role) {
        case 'doctor':
            return { name: 'Dr. Smith', email: 'doctor@example.com', avatar: 'D' };
        case 'admin':
            return { name: 'Admin User', email: 'admin@example.com', avatar: 'A' };
        case 'patient':
        default:
            return { name: 'John Doe', email: 'patient@example.com', avatar: 'P' };
    }
}

function UserNavContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { name, email, avatar } = getUserDetails(role);
  
  const settingsPath = role === 'doctor' || role === 'admin' 
    ? `/dashboard/${role}/settings?role=${role}` 
    : `/dashboard/patient/settings?role=patient`;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/100" alt="@user" data-ai-hint="person portrait" />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={settingsPath}>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/')}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserNav() {
    return (
        <Suspense fallback={<div className="h-8 w-8 rounded-full bg-muted" />}>
            <UserNavContent />
        </Suspense>
    )
}
