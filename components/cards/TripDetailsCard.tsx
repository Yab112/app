"use client";

import { useEffect, useState } from "react";
import { TripSummaryProps } from "@/types/type";
import { TripProgress } from "../trip/TripProgress";
import { TripRoute } from "../trip/TripRoute";
import { TripDistanceInfo } from "../trip/TripDistanceInfo";

export function TripSummary({
  currentLocation,
  destination,
  remainingDistance,
  totalDistance,
  eta,
  stops:[],
}: TripSummaryProps) {
  const [animateDistance, setAnimateDistance] = useState(remainingDistance);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateDistance(remainingDistance);
    }, 500);

    return () => clearTimeout(timer);
  }, [remainingDistance]);

  const completedDistance = totalDistance - remainingDistance;
  const progressPercent =
    totalDistance > 0 ? (completedDistance / totalDistance) * 100 : 0;

  return (
    <div className="space-y-4 border p-2 rounded-l-xl rounded-r-lg">
      <TripProgress progressPercent={progressPercent} />
      <TripRoute currentLocation={currentLocation} destination={destination} />
      <TripDistanceInfo
        completedDistance={completedDistance}
        animateDistance={animateDistance}
        totalDistance={totalDistance}
        eta={eta}
      />
    </div>
  );
}
