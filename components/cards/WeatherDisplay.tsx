// WeatherDisplay.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  Thermometer,
  Droplet,
  ArrowBigRight,
} from "lucide-react";
import { fetchWeatherData, WeatherData } from "../../service/api";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData>({
    city: "Addis Ababa",
    condition: "sunny",
    temperature: 9,
    feelsLike: 22,
    humidity: 65,
    windSpeed: 12,
    description: "clear sky",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getBackgroundGradient = (temp: number) => {
    if (temp < 10) return "bg-gradient-to-br from-blue-500 to-blue-700";
    if (temp < 25) return "bg-gradient-to-br from-slate-100 to-blue-500";
    return "bg-gradient-to-br from-blue-500 to-blue-300";
  };

  const WeatherIcon = ({ condition }: { condition: string }) => {
    const iconSize = 48;
    switch (condition) {
      case "sunny":
        return (
          <Sun size={iconSize} className="text-yellow-300 animate-pulse" />
        );
      case "cloudy":
        return <Cloud size={iconSize} className="text-gray-200" />;
      case "rainy":
        return (
          <CloudRain size={iconSize} className="text-blue-300 animate-bounce" />
        );
      case "snowy":
        return (
          <CloudSnow size={iconSize} className="text-white animate-bounce" />
        );
      case "stormy":
        return (
          <CloudLightning
            size={iconSize}
            className="text-yellow-300 animate-pulse"
          />
        );
      case "drizzle":
        return (
          <CloudDrizzle
            size={iconSize}
            className="text-blue-200 animate-bounce"
          />
        );
      default:
        return <Sun size={iconSize} className="text-yellow-300" />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData("addis ababa");
        setWeather(weatherData);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
    <div className="w-full max-w-md p-6 text-center items-center justify-center">
      <p className="text-xl">
        <button type="button" className="bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center" disabled>
        <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.415, 31.415" />
        </svg>
         Loading Weather data...
        </button>
      </p>
    </div>
    );
  if (error)
    return (
      <div className="w-full max-w-md p-6 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );

  return (
    <Card
      className={`w-full max-w-xl overflow-hidden ${getBackgroundGradient(
        weather.temperature
      )} text-white transition-all duration-500 ease-in-out`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center justify-center">Destination<ArrowBigRight/>{weather.city}</h2>
            <p className="text-sm opacity-90">Current Weather</p>
          </div>
          <div className="flex items-center justify-center p-4 bg-white/10 rounded-full">
            <WeatherIcon condition={weather.condition} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 p-3 rounded-lg flex flex-col items-center">
            <Thermometer className="mb-1 h-6 w-6" />
            <span className="text-2xl font-bold">{weather.temperature}°C</span>
            <span className="text-sm opacity-80">Temperature</span>
          </div>

          <div className="bg-white/20 p-3 rounded-lg flex flex-col items-center">
            <Wind className="mb-1 h-6 w-6" />
            <span className="text-2xl font-bold">{weather.windSpeed} km/h</span>
            <span className="text-sm opacity-80">Wind</span>
          </div>

          <div className="bg-white/20 p-3 rounded-lg flex flex-col items-center">
            <Thermometer className="mb-1 h-6 w-6" />
            <span className="text-2xl font-bold">{weather.feelsLike}°C</span>
            <span className="text-sm opacity-80">Feels Like</span>
          </div>

          <div className="bg-white/20 p-3 rounded-lg flex flex-col items-center">
            <Droplet className="mb-1 h-6 w-6" />
            <span className="text-2xl font-bold">{weather.humidity}%</span>
            <span className="text-sm opacity-80">Humidity</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold capitalize">
            {weather.description}
          </p>
          <p className="text-sm mt-2 opacity-90">
            {weather.condition === "sunny" &&
              "Perfect weather for outdoor activities!"}
            {(weather.condition === "rainy" ||
              weather.condition === "drizzle") &&
              "Don't forget your umbrella!"}
            {weather.condition === "snowy" && "Dress warmly and watch for ice!"}
            {weather.condition === "stormy" && "Seek shelter and stay safe!"}
            {weather.condition === "cloudy" && "Partly cloudy skies expected."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
