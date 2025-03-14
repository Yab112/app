import { Clock } from "lucide-react";

export function TripDistanceInfo({
  completedDistance,
  animateDistance,
  totalDistance,
  eta,
}: {
  completedDistance: number;
  animateDistance: number;
  totalDistance: number;
  eta: string;
}) {
  return (
    <div className="space-y-3 pt-2 rounded-xl border border-blue-100 dark:border-blue-900 p-6 bg-blue-50/50 dark:bg-blue-950/20">
      <div className="flex justify-between">
        <span className="text-sm">Distance Traveled</span>
        <span className="text-sm font-medium">{completedDistance} miles</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">Distance Remaining</span>
        <span className="text-sm font-medium transition-all duration-1000">{animateDistance} miles</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">Total Distance</span>
        <span className="text-sm font-medium">{totalDistance} miles</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">Estimated Arrival</span>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-indigo-500" />
          <span className="text-sm font-medium">{eta}</span>
        </div>
      </div>
    </div>
  );
}
