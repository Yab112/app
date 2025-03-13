"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Fuel } from "lucide-react"

export function TripDetailsCard({
  currentLocation,
  destination,
  remainingDistance,
  totalDistance,
  eta
}: {
  currentLocation: string
  destination: string
  remainingDistance: number
  totalDistance: number
  eta: string
}) {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Location</p>
              <p className="font-medium">{currentLocation}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
              <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-medium">{destination}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Remaining Distance</p>
              <p className="font-medium">{remainingDistance} miles</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Distance</p>
              <p className="font-medium">{totalDistance} miles</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Arrival</p>
              <p className="font-medium">{eta}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}