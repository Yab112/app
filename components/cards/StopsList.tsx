"use client";
import { Badge } from "@/components/ui/badge";
import { TripSummaryProps } from "@/types/type";
import { StopCircle } from "lucide-react";

export function StopsList({ stops }: Partial<TripSummaryProps>) {
  

  return (
    <div className="pt-2 border-slate-300 border p-4 rounded-lg">
      <div className="text-xl font-medium mb-2 flex gap-2 justify-center items-center border w-full rounded-lg p-4 text-slate-600">
        <StopCircle className="text-red-500"/>
        Stops
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {stops && stops.map((stop, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-blue-50/50 dark:hover:bg-blue-950/20 ${
              stop.status === "current"
                ? "bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900"
                : "border border-blue-50 dark:border-blue-950/10"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                stop.status === "completed"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : stop.status === "current"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 animate-pulse"
                    : "bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400"
              }`}
            >
              {index + 1}
            </div>
            <div className="flex-1 text-sm">
              <div className="font-medium">{stop.location}</div>
              <div className="text-xs text-muted-foreground">{stop.time}</div>
            </div>
            <Badge
              variant={stop.status === "completed" ? "outline" : stop.status === "current" ? "default" : "secondary"}
              className={`text-xs ${
                stop.status === "completed"
                  ? "border-green-200 dark:border-green-800 bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : stop.status === "current"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-muted/50"
              }`}
            >
              {stop.status === "completed" ? "Completed" : stop.status === "current" ? "Current" : "Upcoming"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
