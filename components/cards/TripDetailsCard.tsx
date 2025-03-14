"use client"

import { useEffect, useState } from "react"
import { Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Stop {
  location: string
  time: string
  status: string
  type: string
}

interface TripSummaryProps {
  currentLocation: string
  destination: string
  remainingDistance: number
  totalDistance: number
  eta: string
  stops: Stop[]
}

export function TripSummary({
  currentLocation,
  destination,
  remainingDistance,
  totalDistance,
  eta,
  stops,
}: TripSummaryProps) {
  const [animateDistance, setAnimateDistance] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateDistance(remainingDistance)
    }, 500)

    return () => clearTimeout(timer)
  }, [remainingDistance])

  const completedDistance = totalDistance - remainingDistance
  const progressPercent = (completedDistance / totalDistance) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-300 shadow-sm">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Origin</div>
            <div className="font-medium">{currentLocation}</div>
          </div>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-green-300 via-blue-300 to-indigo-400 dark:from-green-700 dark:via-blue-700 dark:to-indigo-600 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <div className="text-xs text-muted-foreground text-right">Destination</div>
            <div className="font-medium">{destination}</div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shadow-sm">
            <MapPin className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex justify-between mb-1 text-sm">
          <span>Trip Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3 pt-2 rounded-xl border border-blue-100 dark:border-blue-900 p-4 bg-blue-50/50 dark:bg-blue-950/20">
        <div className="flex justify-between">
          <span className="text-sm">Distance Traveled</span>
          <span className="text-sm font-medium">{completedDistance} miles</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Distance Remaining</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium transition-all duration-1000">{animateDistance} miles</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Total Distance</span>
          <span className="text-sm font-medium">{totalDistance} miles</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Estimated Arrival</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-indigo-500" />
            <span className="text-sm font-medium">{eta}</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="text-sm font-medium mb-2">Stops</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {stops.map((stop, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-blue-50/50 dark:hover:bg-blue-950/20 ${
                stop.status === "current"
                  ? "bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900"
                  : "border border-blue-50 dark:border-blue-950/10"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  stop.status === "completed"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : stop.status === "current"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 animate-pulse"
                      : "bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1 text-sm">
                <div className="font-medium">{stop.location}</div>
                <div className="text-xs text-muted-foreground">{stop.time}</div>
              </div>
              <Badge
                variant={stop.status === "completed" ? "outline" : stop.status === "current" ? "default" : "secondary"}
                className={`text-xs ${
                  stop.status === "completed"
                    ? "border-green-200 dark:border-green-800 bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : stop.status === "current"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-muted/50"
                }`}
              >
                {stop.status === "completed" ? "Completed" : stop.status === "current" ? "Current" : "Upcoming"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

