import React, { createContext, useContext, useState, ReactNode } from "react";
import { useTheme } from "next-themes";
type SettingsContextType = {
  theme: string | undefined; // Adjusted to match the type provided by next-themes
  setTheme: (value: string) => void;
  tempUnit: "c" | "f";
  setTempUnit: (value: "c" | "f") => void;
  timeFormat: "12h" | "24h";
  setTimeFormat: (value: "12h" | "24h") => void;
  windUnit: "mph" | "kph" | "ms";
  setWindUnit: (value: "mph" | "kph" | "ms") => void;
  precipUnit: "mm" | "in";
  setPrecipUnit: (value: "mm" | "in") => void;
  showHumidity: boolean;
  setShowHumidity: (value: boolean) => void;
  showWindDirection: boolean;
  setShowWindDirection: (value: boolean) => void;
  showPrecipitation: boolean;
  setShowPrecipitation: (value: boolean) => void;
  showFeelsLike: boolean;
  setShowFeelsLike: (value: boolean) => void;
  locationTracking: boolean;
  setLocationTracking: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [tempUnit, setTempUnit] = useState<"c" | "f">("c");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h");
  const [windUnit, setWindUnit] = useState<"mph" | "kph" | "ms">("kph");
  const [precipUnit, setPrecipUnit] = useState<"mm" | "in">("mm");
  const [showHumidity, setShowHumidity] = useState(true);
  const [showWindDirection, setShowWindDirection] = useState(true);
  const [showPrecipitation, setShowPrecipitation] = useState(true);
  const [showFeelsLike, setShowFeelsLike] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        tempUnit,
        setTempUnit,
        timeFormat,
        setTimeFormat,
        windUnit,
        setWindUnit,
        precipUnit,
        setPrecipUnit,
        showHumidity,
        setShowHumidity,
        showWindDirection,
        setShowWindDirection,
        showPrecipitation,
        setShowPrecipitation,
        showFeelsLike,
        setShowFeelsLike,
        locationTracking,
        setLocationTracking,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
