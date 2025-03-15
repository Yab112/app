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
    <div className="space-y-4  p-2 rounded-l-xl rounded-r-lg space-between bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900">
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
