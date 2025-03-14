"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Truck } from "lucide-react"
import { SidebarNavigation } from "./sidebar-navigation"
import { SidebarUserProfile } from "../profile/sidebarprofile"

export function DashboardSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-blue-100 dark:border-blue-900 overflow-hidden">
      <SidebarHeader className="h-20 border-b border-blue-100 dark:border-blue-900 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
        <div className="flex items-center gap-3 font-semibold">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <Truck className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-lg">TruckTracker</span>
            <span className="text-xs text-muted-foreground">Fleet Management</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 overflow-y-auto">
        <SidebarNavigation />
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-100 dark:border-blue-900 p-4">
        <SidebarUserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}