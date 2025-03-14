"use client"

import { useEffect, useState } from "react"
import { Timer } from "lucide-react"

interface DriverStatsProps {
  drivingHours: number
  totalHours: number
}

export function DriverStats({ drivingHours, totalHours }: DriverStatsProps) {
  const [animatedHours, setAnimatedHours] = useState(0)
  const [animatedCycle, setAnimatedCycle] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHours(drivingHours)
      setAnimatedCycle(42)
    }, 500)

    return () => clearTimeout(timer)
  }, [drivingHours])

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900">
        <div className="flex items-center gap-2 mb-3">
          <Timer className="h-5 w-5 text-indigo-500" />
          <span className="font-medium">Hours of Service</span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Driving Hours</span>
              <span className="transition-all duration-1000">
                {animatedHours}/{totalHours} hrs
              </span>
            </div>
            <div className="h-3 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${(animatedHours / totalHours) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>70-Hour Cycle</span>
              <span className="transition-all duration-1000">{animatedCycle}/70 hrs</span>
            </div>
            <div className="h-3 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-1000 ease-out"
                style={{ width: `${(animatedCycle / 70) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900 shadow-sm">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 px-3 py-2">
            <div className="text-xs text-muted-foreground">Avg. Speed</div>
          </div>
          <div className="p-3">
            <div className="text-xl font-bold">62 mph</div>
            <div className="text-xs text-muted-foreground mt-2">Last 30 min</div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900 shadow-sm">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 px-3 py-2">
            <div className="text-xs text-muted-foreground">Distance Today</div>
          </div>
          <div className="p-3">
            <div className="text-xl font-bold">154 mi</div>
            <div className="text-xs text-muted-foreground mt-2">Since 8:00 AM</div>
          </div>
        </div>
      </div>

      <div className="pt-2 rounded-xl border border-blue-100 dark:border-blue-900 p-4 bg-blue-50/50 dark:bg-blue-950/20">
        <div className="text-sm font-medium mb-3">Today`&apos;`s Activity</div>
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2 rounded-lg bg-white dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-center">
            <div className="text-xs text-muted-foreground">Driving</div>
            <div className="text-lg font-bold transition-all duration-1000 text-blue-600 dark:text-blue-400">
              {animatedHours}h
            </div>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-center">
            <div className="text-xs text-muted-foreground">On Duty</div>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">1.5h</div>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-center">
            <div className="text-xs text-muted-foreground">Off Duty</div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">2h</div>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-center">
            <div className="text-xs text-muted-foreground">Remaining</div>
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{totalHours - animatedHours}h</div>
          </div>
        </div>
      </div>
    </div>
  )
}

