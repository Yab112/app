import axios from "axios";

interface WeatherApiResponse {
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

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `https://weather-api99.p.rapidapi.com/weather`,
      {
        params: { city },
        headers: {
          "X-Rapidapi-Key": "20da3ca5c9msh904e91bdd47e22fp10fb6cjsn38733084cec5",
          "X-Rapidapi-Host": "weather-api99.p.rapidapi.com",
        },
      }
    );

    const weatherData = response.data;

    // Map API weather conditions to more user-friendly labels
    const conditionMap: { [key: string]: string } = {
      Clear: "sunny",
      Clouds: "cloudy",
      Rain: "rainy",
      Snow: "snowy",
      Thunderstorm: "stormy",
      Drizzle: "drizzle",
    };

    return {
      city: weatherData.name,
      condition: conditionMap[weatherData.weather[0].main] || "sunny",
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      description: weatherData.weather[0].description,
    };
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
    throw new Error("Failed to fetch weather data.");
  }
};
