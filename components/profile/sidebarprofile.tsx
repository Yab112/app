"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, User, Settings, LogOut } from "lucide-react"

export function SidebarUserProfile() {
  return (
    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
        <AvatarImage src="/placeholder-user.jpg" alt="Driver" />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">JD</AvatarFallback>
      </Avatar>
      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
        <span className="text-sm font-medium">John Doe</span>
        <span className="text-xs text-muted-foreground">70-Hour Cycle</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 group-data-[collapsible=icon]:ml-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-blue-100 dark:border-blue-900">
          <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/40">
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/40">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/40">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}