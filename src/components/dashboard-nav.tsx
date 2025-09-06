"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Building,
  Settings,
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Suspense } from "react"

const doctorNavItems = [
  { href: "/dashboard?role=doctor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/doctor/appointments?role=doctor", label: "Appointments", icon: Calendar },
  { href: "/dashboard/doctor/prescriptions?role=doctor", label: "Prescriptions", icon: FileText },
]

const adminNavItems = [
  { href: "/dashboard?role=admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/crowd-monitoring?role=admin", label: "Crowd Monitoring", icon: Users },
  { href: "/dashboard/admin/patients?role=admin", label: "Patients", icon: Users },
  { href: "/dashboard/admin/settings?role=admin", label: "Settings", icon: Settings },
]

function NavContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const role = searchParams.get("role")

  const navItems = role === 'doctor' ? doctorNavItems : adminNavItems;

  const checkActive = (href: string) => {
    const [basePath] = href.split('?');
    return pathname === basePath;
  }

  return (
     <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={checkActive(item.href)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}


export function DashboardNav() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavContent />
    </Suspense>
  )
}
