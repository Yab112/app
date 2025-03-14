import { MapPin } from "lucide-react";

export function TripRoute({ currentLocation, destination }: { currentLocation: string; destination: string }) {

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900">
      {/* Origin */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-300 shadow-sm">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Origin</div>
          <div className="font-medium">{currentLocation}</div>
        </div>
      </div>

      <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-green-300 via-blue-300 to-indigo-400 dark:from-green-700 dark:via-blue-700 dark:to-indigo-600 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      </div>

      {/* Destination */}
      <div className="flex items-center gap-2">
        <div>
          <div className="text-xs text-muted-foreground text-right">Destination</div>
          <div className="font-medium">{destination}</div>
        </div>
        <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shadow-sm">
          <MapPin className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
