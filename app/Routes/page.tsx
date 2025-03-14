"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ChevronRight,
  ChevronLeft,
  Layers,
  RotateCcw,
  ClipboardList,
  MapPin,
  Target,
  CircleOff,
  Fuel,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useMediaQuery } from "@/hooks/use-media-query"

// This would come from your API or state management
const tripData = {
  totalDistance: 456.7, // miles
  estimatedDuration: "8h 45m",
  remainingDutyHours: "6h 30m",
  progress: 35, // percentage
  pickup: {
    name: "New York, NY",
    eta: "Departed 08:15 AM",
  },
  dropoff: {
    name: "Chicago, IL",
    eta: "ETA 05:00 PM",
  },
  stops: [
    {
      type: "rest",
      name: "Youngstown Rest Area",
      eta: "ETA 12:30 PM",
      duration: "30m",
    },
    {
      type: "fuel",
      name: "Cleveland Fuel Station",
      eta: "ETA 01:45 PM",
      fuelNeeded: "35 gal",
    },
    {
      type: "rest",
      name: "South Bend Rest Stop",
      eta: "ETA 03:30 PM",
      duration: "15m",
    },
  ],
}

export default function MapView() {
  const [mapStyle, setMapStyle] = useState("streets")
  const [isPanelOpen, setIsPanelOpen] = useState(true)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (!isDesktop) {
      setIsPanelOpen(false)
    } else {
      setIsPanelOpen(true)
    }
  }, [isDesktop])

  const toggleMapStyle = () => {
    setMapStyle(mapStyle === "streets" ? "satellite" : "streets")
  }

  const recalculateRoute = () => {
    // This would trigger a route recalculation
    console.log("Recalculating route...")
  }

  const viewLogs = () => {
    // This would navigate to the ELD Logger page
    console.log("Viewing logs...")
  }

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Simple Map Placeholder - Replace with Google Maps API integration */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Map Placeholder"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Panel Toggle Button */}
      <button
        onClick={togglePanel}
        className="absolute top-1/2 z-1 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-l-md"
        style={{ right: isPanelOpen ? "320px" : "0" }}
      >
        {isPanelOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      {/* Trip Details Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute top-0 right-0 h-full w-80 bg-background/90 backdrop-blur-sm border-l border-border p-4 overflow-y-auto z-1"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Trip Details</h2>
                <Progress value={tripData.progress} className="h-2 mt-2" />
                <p className="text-sm text-muted-foreground mt-1">{tripData.progress}% complete</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="font-medium">{tripData.totalDistance} miles</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{tripData.estimatedDuration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duty Hours</p>
                  <p className="font-medium">{tripData.remainingDutyHours}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Locations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{tripData.pickup.name}</p>
                      <p className="text-sm text-muted-foreground">{tripData.pickup.eta}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{tripData.dropoff.name}</p>
                      <p className="text-sm text-muted-foreground">{tripData.dropoff.eta}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Upcoming Stops</h3>
                <div className="space-y-3">
                  {tripData.stops.map((stop, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {stop.type === "rest" ? (
                        <CircleOff className="h-5 w-5 text-amber-500 mt-0.5" />
                      ) : (
                        <Fuel className="h-5 w-5 text-blue-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{stop.name}</p>
                        <p className="text-sm text-muted-foreground">{stop.eta}</p>
                        {stop.duration && <p className="text-sm text-muted-foreground">Duration: {stop.duration}</p>}
                        {stop.fuelNeeded && <p className="text-sm text-muted-foreground">Fuel: {stop.fuelNeeded}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Layers className="h-5 w-5" />
                    <Label htmlFor="map-style">Satellite View</Label>
                  </div>
                  <Switch id="map-style" checked={mapStyle === "satellite"} onCheckedChange={toggleMapStyle} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={recalculateRoute} variant="outline" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Recalculate
                  </Button>
                  <Button onClick={viewLogs} variant="outline" className="w-full">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    View Logs
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

