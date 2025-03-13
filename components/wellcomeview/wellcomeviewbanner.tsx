"use client"

import { Badge } from "@/components/ui/badge"
import { Truck } from "lucide-react"

export function WelcomeBanner({ progress, destination, remainingDistance }: {
  progress: number
  destination: string
  remainingDistance: number
}) {
  return (
    <div className="col-span-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl border-4 border-primary/80 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/40 animate-pulse" />
          <img
            src="/placeholder.svg"
            alt="Truck"
            className="h-full w-full object-cover relative z-10"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            You're on your way to {destination}. {remainingDistance} miles to go.
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="font-medium mr-2">Trip Progress:</span>
            <div className="w-32 h-3 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ml-2 text-muted-foreground">{progress}%</span>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <div className="text-sm text-muted-foreground mb-1">Current Status</div>
          <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">On Route</Badge>
        </div>
      </div>
    </div>
  )
}