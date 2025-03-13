"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
export function WelcomeBanner({ progress, destination, remainingDistance }: { 
    progress: number
    destination: string
    remainingDistance: number
  }) {
    return (
      <div className="col-span-full bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border">
        {/* Banner content */}
      </div>
    )
  }
  
  // components/cards/route-map.tsx
  export function RouteMapCard({ currentLocation, destination }: {
    currentLocation: string
    destination: string
  }) {
    return (
      <Card className="overflow-hidden border-blue-100">
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
          <CardDescription>From {currentLocation} to {destination}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <MapComponent currentLocation={currentLocation} destination={destination} /> */}
          <h4>Here we start</h4>
        </CardContent>
      </Card>
    )
  }
  
  // components/cards/eld-status.tsx
  export function EldStatusCard({ drivingHours, totalHours }: {
    drivingHours: number
    totalHours: number
  }) {
    return (
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle>ELD Status</CardTitle>
          <CardDescription>Hours of Service Summary</CardDescription>
        </CardHeader>
        <CardContent>
         <h1>Here we end</h1>
        </CardContent>
      </Card>
    )
  }