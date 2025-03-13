    "use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ProfileButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Profile</TooltipContent>
    </Tooltip>
  )
}