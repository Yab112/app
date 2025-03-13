"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="dark-mode" className="sr-only">
        Dark Mode
      </Label>
      <Switch
        id="dark-mode"
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        className="data-[state=checked]:bg-blue-600"
      />
      <span className="text-sm hidden md:inline">Dark Mode</span>
    </div>
  )
}
