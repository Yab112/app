"use client"


import {DriverStats} from "@/components/cards/DriverStatsCard"
import {TripSummary} from "@/components/cards/TripDetailsCard"
import {UpcomingEventsCard} from "@/components/cards/UpcomingEventsCard"
import EldLogSheetCard from "@/components/Log/log"
import { WelcomeBanner } from "@/components/wellcomeview/wellcomeviewbanner"
import { useState } from "react"
import {stops} from "./constants"
export default function Dashboard() {
  const [progress] = useState(0)
  const [drivingHours] = useState(3.5)
  const [totalHours] = useState(11)
  const [currentLocation] = useState("Denver, CO")
  const [destination] = useState("Salt Lake City, UT")
  const [remainingDistance] = useState(371)

  return (
    <div className="p-4 w-full ">
      <WelcomeBanner 
        progress={progress}
        destination={destination}
        remainingDistance={remainingDistance}
      />

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2 space-y-4">
          {/* <RouteMapCard
            currentLocation={currentLocation}
            destination={destination}
          /> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TripSummary
              currentLocation={currentLocation}
              destination={destination}
              remainingDistance={remainingDistance}
              totalDistance={525}
              eta="5:30 PM" stops={stops}/>
            
            <DriverStats
              drivingHours={drivingHours}
              totalHours={totalHours}
            />
          </div>
        </div>

        <div className="space-y-4">
          <UpcomingEventsCard />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <EldLogSheetCard logData={[]} />
        </div>
      </div>
    </div>
  )
}