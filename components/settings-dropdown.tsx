"use client";

import { useState } from "react";
import {
  Clock,
  CloudRain,
  Compass,
  Droplets,
  MapPin,
  Moon,
  Settings,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

export function SettingsDropdown() {
  // State for dropdown open status
  const [open, setOpen] = useState(false);

  // State for various settings
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h");
  const [windUnit, setWindUnit] = useState<"mph" | "kph" | "ms">("kph");
  const [precipUnit, setPrecipUnit] = useState<"mm" | "in">("mm");
  const [showHumidity, setShowHumidity] = useState(true);
  const [showWindDirection, setShowWindDirection] = useState(true);
  const [showPrecipitation, setShowPrecipitation] = useState(true);
  const [showFeelsLike, setShowFeelsLike] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);

  // Toggle theme function (in a real app, this would update the actual theme)
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // In a real app, you would apply the theme change to the document
    // document.documentElement.classList.toggle("dark")
  };

  return (
    <DropdownMenu modal open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="!bg-background"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-sm:w-52 w-64">
        <DropdownMenuLabel>Weather Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Appearance Settings */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Appearance
          </DropdownMenuLabel>

          <DropdownMenuItem className="flex cursor-default items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span>Dark Theme</span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              onClick={(e) => e.stopPropagation()}
              aria-label="Toggle dark theme"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Units Settings */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Units
          </DropdownMenuLabel>

          {/* Temperature Unit */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                <span>Temperature</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={tempUnit}
                  onValueChange={(value) =>
                    setTempUnit(value as "celsius" | "fahrenheit")
                  }
                >
                  <DropdownMenuRadioItem
                    value="celsius"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Celsius (°C)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="fahrenheit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Fahrenheit (°F)
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {/* Time Format */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Time Format</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={timeFormat}
                  onValueChange={(value) =>
                    setTimeFormat(value as "12h" | "24h")
                  }
                >
                  <DropdownMenuRadioItem
                    value="12h"
                    onClick={(e) => e.stopPropagation()}
                  >
                    12-hour
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="24h"
                    onClick={(e) => e.stopPropagation()}
                  >
                    24-hour
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {/* Wind Speed Unit */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                <span>Wind Speed</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={windUnit}
                  onValueChange={(value) =>
                    setWindUnit(value as "mph" | "kph" | "ms")
                  }
                >
                  <DropdownMenuRadioItem
                    value="kph"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="max-sm:hidden">Kilometers per hour</span>{" "}
                    (km/h)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="mph"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="max-sm:hidden">Miles per hour</span> (mph)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="ms"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="max-sm:hidden">Meters per second </span>{" "}
                    (m/s)
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {/* Precipitation Unit */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4" />
                <span>Precipitation</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={precipUnit}
                  onValueChange={(value) => setPrecipUnit(value as "mm" | "in")}
                >
                  <DropdownMenuRadioItem
                    value="mm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Millimeters (mm)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Inches (in)
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Display Options */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Display Options
          </DropdownMenuLabel>

          <DropdownMenuItem className="flex cursor-default items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span>Humidity</span>
            </div>
            <Switch
              checked={showHumidity}
              onCheckedChange={setShowHumidity}
              onClick={(e) => e.stopPropagation()}
              aria-label="Show humidity"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex cursor-default items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>Wind Direction</span>
            </div>
            <Switch
              checked={showWindDirection}
              onCheckedChange={setShowWindDirection}
              onClick={(e) => e.stopPropagation()}
              aria-label="Show wind direction"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex cursor-default items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4" />
              <span>Precipitation</span>
            </div>
            <Switch
              checked={showPrecipitation}
              onCheckedChange={setShowPrecipitation}
              onClick={(e) => e.stopPropagation()}
              aria-label="Show precipitation"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex cursor-default items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              <span>Feels Like</span>
            </div>
            <Switch
              checked={showFeelsLike}
              onCheckedChange={setShowFeelsLike}
              onClick={(e) => e.stopPropagation()}
              aria-label="Show feels like temperature"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Location Settings */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Location
          </DropdownMenuLabel>

          <DropdownMenuItem className="flex cursor-default items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Location Tracking</span>
            </div>
            <Switch
              checked={locationTracking}
              onCheckedChange={setLocationTracking}
              onClick={(e) => e.stopPropagation()}
              aria-label="Enable location tracking"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
