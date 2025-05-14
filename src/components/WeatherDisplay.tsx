
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/services/weatherApi";
import { Cloud, CloudDrizzle, CloudLightning, CloudSnow, Sun, Wind } from "lucide-react";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  className?: string;
}

const WeatherDisplay = ({ weatherData, className }: WeatherDisplayProps) => {
  const { location, temperature, condition, conditionCode, icon } = weatherData;
  
  const getWeatherIcon = () => {
    switch (conditionCode) {
      case 'sunny':
        return <Sun className="h-10 w-10 text-yellow-500 animate-bounce-light" />;
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-500 animate-float" />;
      case 'rainy':
        return <CloudDrizzle className="h-10 w-10 text-blue-500 animate-float" />;
      case 'stormy':
        return <CloudLightning className="h-10 w-10 text-purple-500 animate-float" />;
      case 'snowy':
        return <CloudSnow className="h-10 w-10 text-blue-300 animate-float" />;
      case 'foggy':
        return <Wind className="h-10 w-10 text-gray-400 animate-float" />;
      default:
        return <Cloud className="h-10 w-10 text-gray-500 animate-float" />;
    }
  };
  
  return (
    <Card className={`overflow-hidden border-none shadow-lg ${className || ""}`} 
          style={{ backgroundColor: `var(--tw-colors-weather-${conditionCode})` }}>
      <CardContent className="p-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            {getWeatherIcon()}
          </div>
          
          <h2 className="text-2xl font-bold mb-1">{location}</h2>
          
          <div className="flex items-center justify-center mb-2">
            <span className="text-4xl font-bold">{temperature}°C</span>
          </div>
          
          <p className="text-lg capitalize">{condition}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
