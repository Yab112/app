"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Clock, Fuel, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UpcomingEventsCard() {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
              <Fuel className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <div className="font-medium">Fuel Stop</div>
              <div className="text-sm text-muted-foreground">Green River, UT - 3:00 PM</div>
            </div>
            <Badge variant="outline" className="ml-auto bg-amber-100/50 dark:bg-amber-900/30">
              In 2.5h
            </Badge>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <div className="font-medium">Required Break</div>
              <div className="text-sm text-muted-foreground">After 4.5 hours of driving</div>
            </div>
            <Badge variant="outline" className="ml-auto bg-blue-100/50 dark:bg-blue-900/30">
              In 4.5h
            </Badge>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
              <MapPin className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <div className="font-medium">Arrival</div>
              <div className="text-sm text-muted-foreground">Salt Lake City, UT - 5:30 PM</div>
            </div>
            <Badge variant="outline" className="ml-auto bg-green-100/50 dark:bg-green-900/30">
              In 5h
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}