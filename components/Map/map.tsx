"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useRouteStore } from "@/store/useRouteStore";
import L from "leaflet";

// Dynamically import Map components (disable SSR)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface MapProps {
  coordinates: [number, number][]; 
  mandatoryStops?: [number, number][]; 
}

export default function Map({ coordinates, mandatoryStops = [] }: MapProps) {
  const { routeData, fetchRoute } = useRouteStore();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (coordinates.length > 1) {
      fetchRoute(coordinates);
    }
  }, [coordinates, fetchRoute]);

  // Get the user's current position
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching user position:", error);
        }
      );
    }
  }, []);

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

      {/* User's Current Position */}
      {userPosition && (
        <Marker position={userPosition} icon={currentIcon}>
          <Popup>Your Current Position</Popup>
        </Marker>
      )}

      {/* Start Marker */}
      {coordinates.length > 0 && (
        <Marker position={coordinates[0]} icon={startIcon}>
          <Popup>Start Position</Popup>
        </Marker>
      )}

      {/* Mandatory Stops */}
      {mandatoryStops.map((stop, index) => (
        <Marker key={`mandatory-${index}`} position={stop} icon={mandatoryStopIcon}>
          <Popup>Mandatory Stop {index + 1}</Popup>
        </Marker>
      ))}

      {/* End Marker */}
      {coordinates.length > 1 && (
        <Marker position={coordinates[coordinates.length - 1]} icon={endIcon}>
          <Popup>End Position</Popup>
        </Marker>
      )}
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

// Define custom icons for different markers
const startIcon = new L.Icon({
  iconUrl: "mapred.svg", // Path to your start icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const endIcon = new L.Icon({
  iconUrl: "mapgreen.svg", // Path to your end icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const mandatoryStopIcon = new L.Icon({
  iconUrl: "gas-station-svgrepo-com.svg", // Path to your mandatory stop icon
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const currentIcon = new L.Icon({
  iconUrl: "truck.svg", 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});