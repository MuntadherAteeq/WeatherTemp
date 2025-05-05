"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Loader2,
  RefreshCcw,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import Image from "next/image";
import { useTheme } from "next-themes";
import { CityCombobox } from "@/components/city-combobox";
import { SettingsDropdown } from "@/components/settings-dropdown";
import { SettingsProvider } from "@/hooks/use-settings";

// Weather fetcher function
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch weather data");
    return res.json();
  });

// Weather condition to background mapping
const getBackgroundColor = (condition: string, isDay: boolean) => {
  if (isDay) {
    switch (condition) {
      case "Clear":
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case "Clouds":
        return "bg-gradient-to-br from-gray-300 to-gray-400";
      case "Rain":
      case "Drizzle":
        return "bg-gradient-to-br from-gray-400 to-gray-600";
      case "Thunderstorm":
        return "bg-gradient-to-br from-gray-600 to-gray-800";
      case "Snow":
        return "bg-gradient-to-br from-gray-100 to-gray-300";
      case "Mist":
      case "Fog":
        return "bg-gradient-to-br from-gray-300 to-gray-500";
      default:
        return "bg-gradient-to-br from-blue-500 to-blue-700";
    }
  } else {
    switch (condition) {
      case "Clear":
        return "bg-gradient-to-br from-slate-700 to-slate-900";
      case "Clouds":
        return "bg-gradient-to-br from-slate-600 to-slate-800";
      case "Rain":
      case "Drizzle":
        return "bg-gradient-to-br from-slate-700 to-slate-900";
      case "Thunderstorm":
        return "bg-gradient-to-br from-slate-800 to-slate-950";
      case "Snow":
        return "bg-gradient-to-br from-slate-500 to-slate-700";
      case "Mist":
      case "Fog":
        return "bg-gradient-to-br from-slate-600 to-slate-800";
      default:
        return "bg-gradient-to-br from-slate-700 to-slate-900";
    }
  }
};

// Weather condition to icon mapping
const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "Clear":
      return "/weather-icons/clear.svg";
    case "Clouds":
      return "/weather-icons/cloudy.svg";
    case "Rain":
      return "/weather-icons/rainy.svg";
    case "Drizzle":
      return "/weather-icons/drizzle.svg";
    case "Thunderstorm":
      return "/weather-icons/thunder.svg";
    case "Snow":
      return "/weather-icons/snowy.svg";
    case "Mist":
    case "Fog":
      return "/weather-icons/foggy.svg";
    default:
      return "/weather-icons/cloudy.svg";
  }
};

export default function WeatherApp() {
  const [city, setCity] = useState("London");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    handleSearch(null);
  }, [searchQuery]);

  // Fetch current weather data
  const {
    data: weather,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/weather?city=${encodeURIComponent(city)}`, fetcher, {
    revalidateOnFocus: false,
  });

  // Fetch forecast data
  const { data: forecast } = useSWR(
    weather
      ? `/api/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  // Check if it's day or night based on current time and sunrise/sunset
  useEffect(() => {
    if (weather) {
      const now = Math.floor(Date.now() / 1000);
      setIsDay(now > weather.sys.sunrise && now < weather.sys.sunset);
    }
  }, [weather]);

  // Handle search
  const handleSearch = (e: React.FormEvent | null) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      setSearchQuery("");
    }
  };

  // Format time from unix timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format date for forecast
  const formatDay = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString([], {
      weekday: "short",
    });
  };

  // Get temperature color based on value
  const getTempColor = (temp: number) => {
    if (temp < 5) return "text-blue-500";
    if (temp < 15) return "text-blue-400";
    if (temp < 25) return "text-yellow-500";
    return "text-orange-500";
  };

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-destructive">
                Error loading weather data
              </h2>
              <p className="mt-2 text-muted-foreground">
                Please try again with a different city name
              </p>
              <form onSubmit={handleSearch} className="mt-4 flex gap-2">
                <CityCombobox
                  placeholder="Search for a city..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="!bg-background border-0 flex-1"
                />
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <SettingsProvider>
      <div
        className={cn(
          "min-h-screen transition-colors duration-700 ease-in-out p-4 flex flex-col items-center",
          weather
            ? getBackgroundColor(weather.weather[0].main, isDay)
            : "bg-background"
        )}
      >
        <div className="w-full max-w-3xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <CityCombobox
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="!bg-background flex-1"
              />
              {/* Refresh Button */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    mutate();
                    const icon = document.getElementById("refresh-icon");
                    if (icon) {
                      icon.style.transition = "transform 0.5s ease";
                      icon.style.transform = "rotate(360deg)";
                      setTimeout(() => {
                        icon.style.transform = "rotate(0deg)";
                      }, 500);
                    }
                  }}
                  className="!bg-background hover:!bg-muted"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : null}
                  <RefreshCcw id="refresh-icon" className="size-5" />
                </Button>
              </motion.div>
              <SettingsDropdown />
            </form>
          </motion.div>

          {/* Main Weather Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={city}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                // className=" !bg-gray-900 !bg-clip-padding !backdrop-filter !backdrop-blur-md !bg-opacity-10 !border border-gray-100"
                className="bg-background backdrop-blur-sm border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-10 w-20" />
                      </div>
                      <div className="flex justify-center">
                        <Skeleton className="h-32 w-32 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ) : weather ? (
                    <>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h1 className="text-2xl font-bold flex items-center">
                            <MapPin className="h-5 w-5 mr-1 text-muted-foreground" />
                            {weather.name}, {weather.sys.country}
                          </h1>
                          <p className="text-muted-foreground mt-1">
                            {new Date().toLocaleDateString([], {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={cn(
                              "text-4xl font-bold",
                              getTempColor(weather.main.temp)
                            )}
                          >
                            {Math.round(weather.main.temp)}°C
                          </div>
                          <div className="text-muted-foreground text-sm">
                            Feels like {Math.round(weather.main.feels_like)}°C
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                        <motion.div
                          className="flex flex-col items-center"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <motion.img
                            src={getWeatherIcon(weather.weather[0].main)}
                            alt={weather.weather[0].description}
                            className="h-32 w-32"
                            animate={{
                              y: [0, -10, 0],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 5,
                              ease: "easeInOut",
                            }}
                          />
                          <h2 className="text-xl font-medium capitalize mt-2">
                            {weather.weather[0].description}
                          </h2>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Humidity
                              </div>
                              <div className="font-medium">
                                {weather.main.humidity}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wind className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Wind
                              </div>
                              <div className="font-medium">
                                {Math.round(weather.wind.speed * 3.6)} km/h
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Sunrise className="h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Sunrise
                              </div>
                              <div className="font-medium">
                                {formatTime(weather.sys.sunrise)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Sunset className="h-5 w-5 text-secondary" />
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Sunset
                              </div>
                              <div className="font-medium">
                                {formatTime(weather.sys.sunset)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Forecast */}
                      {forecast && (
                        <div className="mt-6">
                          <h3 className="font-medium mb-3">5-Day Forecast</h3>
                          <div className="grid grid-cols-5 gap-2">
                            {forecast.list
                              .filter(
                                (
                                  _: {
                                    dt: number;
                                    main: { temp: number };
                                    weather: {
                                      main: string;
                                      description: string;
                                    }[];
                                  },
                                  index: number
                                ) => index % 8 === 0
                              )
                              .slice(0, 5)
                              .map(
                                (
                                  item: {
                                    dt: number;
                                    main: { temp: number };
                                    weather: {
                                      main: string;
                                      description: string;
                                    }[];
                                  },
                                  index: number
                                ) => (
                                  <motion.div
                                    key={index}
                                    className={cn(
                                      "flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-colors",
                                      index === 0 ? "bg-muted" : "bg-background"
                                    )}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: index * 0.1,
                                      duration: 0.5,
                                    }}
                                  >
                                    <div className="text-sm font-medium">
                                      {formatDay(item.dt)}
                                    </div>
                                    <Image
                                      src={
                                        getWeatherIcon(item.weather[0].main) ||
                                        "/placeholder.svg"
                                      }
                                      alt={item.weather[0].description}
                                      className="h-10 w-10 my-1"
                                      width={40}
                                      height={40}
                                    />
                                    <div
                                      className={cn(
                                        "text-sm font-medium",
                                        getTempColor(item.main.temp)
                                      )}
                                    >
                                      {Math.round(item.main.temp)}°C
                                    </div>
                                  </motion.div>
                                )
                              )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SettingsProvider>
  );
}
