"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DriverStatsCard({
  drivingHours,
  totalHours
}: {
  drivingHours: number
  totalHours: number
}) {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader>
        <CardTitle>Driver Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Driving Hours</span>
              <span className="text-sm font-medium">{drivingHours}/{totalHours} hrs</span>
            </div>
            <Progress
              value={(drivingHours / totalHours) * 100}
              className="h-2 bg-blue-100 dark:bg-blue-900/50"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Daily Driving</span>
              <p className="text-lg font-bold">3.5h</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Weekly Driving</span>
              <p className="text-lg font-bold">32h</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Cycle Hours</span>
              <p className="text-lg font-bold">42/70h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}