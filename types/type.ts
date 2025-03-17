

import { LatLngExpression } from "leaflet";
type status = "Off Duty" | "Sleeper Berth" | "Driving" | "On Duty";
type LogEntry = {
    hour: number;
    status: status;
}


export interface MapProps {
  routeCoordinates: LatLngExpression[];
}


export interface WeatherApiResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  name: string;
}

export interface WeatherData {
  city: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface RouteRequest {
  coordinates: [number, number][];
}

export interface RouteResponse {
  routes: {
    summary: {
      distance: number;
      duration: number;
    };
    geometry: string;
  }[];
}

interface Stop {
    location: string
    time: string
    status: string
    type: string
  }
  
export interface TripSummaryProps {
    currentLocation: string
    destination: string
    remainingDistance: number
    totalDistance: number
    eta: string
    stops: Stop[]
  }

type LogData = LogEntry[];

export default LogData;