"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Clock, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrentTime } from "@/hooks/use-current-time"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { DarkModeToggle } from "../darkmode/darkmode"

export function DashboardHeader() {
  const currentTime = useCurrentTime()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger className="-ml-1 h-9 w-9 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40" />
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium">{currentTime}</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <TooltipProvider >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5"/>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-blue-600">Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DarkModeToggle />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="">
                <User className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-blue-600">Profile</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}