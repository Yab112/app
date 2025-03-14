"use client"

import { navigationItems, reportItems, settingItems } from "@/app/constants"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar"
import Link from "next/link"

export function SidebarNavigation() {

  return (
    <>
      {/* Main Navigation */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 group-data-[collapsible=icon]:hidden overflow-hidden">
          Navigation
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={item.active}
                  tooltip={item.label}
                  className="group transition-all hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  <Link href={item.href} className="flex items-center gap-3 py-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator className="my-2" />

      {/* Reports Section */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 group-data-[collapsible=icon]:hidden">
          Reports
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {reportItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className="group transition-all hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  <a href={item.href} className="flex items-center gap-3 py-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator className="my-2" />

      {/* Settings Section */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 group-data-[collapsible=icon]:hidden">
          Settings
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {settingItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className="group transition-all hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  <a href={item.href} className="flex items-center gap-3 py-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}