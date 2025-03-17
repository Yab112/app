"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Layers } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TripProgress } from "@/components/trip/TripProgress";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map/map"), { ssr: false });

export default function MapView() {
  const [mapStyle, setMapStyle] = useState("streets");
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const progressPercent = 34;

  useEffect(() => {
    setIsPanelOpen(isDesktop);
  }, [isDesktop]);

  const toggleMapStyle = () => {
    setMapStyle(mapStyle === "streets" ? "satellite" : "streets");
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background no-scrollbar">
      {/* Map Component */}
      <div className="absolute inset-0 z-0">
        <Map
          coordinates={[
            [37.7749, -122.4194], // Start
            [34.0522, -118.2437], // End
          ]}
          mandatoryStops={[
            [36.1699, -115.1398], // Mandatory stop 1
            [35.6895, -139.6917], // Mandatory stop 2
          ]}
        />
      </div>

      {/* Trip Details Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute top-0 right-0 h-full w-80 bg-background/90 backdrop-blur-sm border-l border-border p-4 overflow-y-auto z-20 no-scrollbar"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Trip Details</h2>
                <TripProgress progressPercent={progressPercent} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="font-medium">09 miles</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">988</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duty Hours</p>
                  <p className="font-medium">9807</p>
                </div>
              </div>

              <Separator />

              {/* Toggle Map Style */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="h-5 w-5" />
                  <Label htmlFor="map-style">Satellite View</Label>
                </div>
                <Switch
                  id="map-style"
                  checked={mapStyle === "satellite"}
                  onCheckedChange={toggleMapStyle}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel Toggle Button */}
      <button
        onClick={togglePanel}
        className="absolute top-1/2 z-10 -translate-y-1/2 bg-blue-600 text-primary-foreground p-2 rounded-l-md"
        style={{ right: isPanelOpen ? "320px" : "0" }}
      >
        {isPanelOpen ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
