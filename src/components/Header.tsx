
import React from "react";
import { Cloud, Sun } from "lucide-react";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center py-6">
      <div className="flex items-center gap-2 mb-2">
        <Cloud className="h-6 w-6 text-blue-500" />
        <h1 className="text-3xl font-bold">WeatherMood</h1>
        <Sun className="h-6 w-6 text-yellow-500" />
      </div>
      <p className="text-center text-gray-600 max-w-md">
        Your daily dose of weather with a splash of mood-matching content
      </p>
    </header>
  );
};

export default Header;
