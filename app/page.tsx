"use client";
import { DriverStats } from "@/components/cards/DriverStatsCard";
import { TripSummary } from "@/components/cards/TripDetailsCard";
import { UpcomingEventsCard } from "@/components/cards/UpcomingEventsCard";
import { WelcomeBanner } from "@/components/wellcomeview/wellcomeviewbanner";
import { StopsList } from "@/components/cards/StopsList";
import { stops } from "./constants";
import WeatherDisplay from "@/components/cards/WeatherDisplay";

export default function Dashboard() {
  const progress = 0;
  const drivingHours = 3.5;
  const totalHours = 11;
  const currentLocation = "Denver, CO";
  const destination = "Salt Lake City, UT";
  const remainingDistance = 371;

  return (
    <div className="p-4 w-full">
      <WelcomeBanner
        progress={progress}
        destination={destination}
        remainingDistance={remainingDistance}
      />

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TripSummary
              currentLocation={currentLocation}
              destination={destination}
              remainingDistance={remainingDistance}
              totalDistance={525}
              eta="5:30 PM"
              stops={stops}
            />
            
            <DriverStats drivingHours={drivingHours} totalHours={totalHours} />
          </div>
        </div>

        <div className="space-y-4">
          <UpcomingEventsCard />
        </div>
      </div>
      <div className="p-4 flex gap-4">
        <div>
          <StopsList stops={stops} />
        </div>
        <WeatherDisplay/>
      </div>
    </div>
  );
}
