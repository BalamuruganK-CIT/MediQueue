"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Stethoscope,
  Calendar,
  History,
  Bell,
  Video,
  BookOpen,
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/symptom-analysis", label: "Symptom Analysis", icon: Stethoscope },
  { href: "/dashboard/appointments", label: "Appointments", icon: Calendar },
  { href: "/dashboard/health-records", label: "Health Records", icon: History },
  { href: "/dashboard/medication-reminders", label: "Medication Reminders", icon: Bell },
  { href: "/dashboard/telemedicine", label: "Telemedicine", icon: Video },
  { href: "/dashboard/resource-library", label: "Resource Library", icon: BookOpen },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <>
                <item.icon />
                <span>{item.label}</span>
              </>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
