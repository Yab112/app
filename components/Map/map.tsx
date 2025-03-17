"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useRouteStore } from "@/store/useRouteStore";

// Dynamically import Map components (disable SSR)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });

interface MapProps {
  coordinates: [number, number][];
}

export default function Map({ coordinates }: MapProps) {
  const { routeData, fetchRoute } = useRouteStore();

  useEffect(() => {
    if (coordinates.length > 1) {
      fetchRoute(coordinates);
    }
  }, [coordinates, fetchRoute]);

  if (typeof window === "undefined") return null; // Ensure this runs only in the browser

  return (
    <MapContainer
      center={coordinates[0] || [37.7749, -122.4194]} // Default to SF
      zoom={6}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Route Path */}
      {routeData?.routes?.[0]?.geometry && (
        <Polyline
          positions={decodePolyline(routeData.routes[0].geometry)}
          color="blue"
          weight={5}
        />
      )}

      {/* Start and End Markers */}
      {coordinates.length > 0 && <Marker position={coordinates[0]} />} {/* Start */}
      {coordinates.length > 1 && <Marker position={coordinates[coordinates.length - 1]} />} {/* End */}
    </MapContainer>
  );
}

// Function to decode polyline (since OpenRouteService returns encoded geometry)
function decodePolyline(encoded: string) {
  const points: [number, number][] = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let shift = 0, result = 0, byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : (result >> 1);

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : (result >> 1);

    points.push([lat * 1e-5, lng * 1e-5]);
  }
  return points;
}
