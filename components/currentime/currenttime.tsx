"use client"

import { Clock } from "lucide-react"
import { useCurrentTime } from "@/hooks/use-current-time"

export function CurrentTime() {
  const currentTime = useCurrentTime()
  
  return (
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">{currentTime}</span>
    </div>
  )
}