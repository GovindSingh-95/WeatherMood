
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  conditionCode: string;
  icon: string;
}

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy';

// This is a working API key for demonstration purposes
const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // First, get coordinates from city name using geocoding API
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`
    );
    
    if (!geoResponse.ok) {
      throw new Error("Location not found");
    }
    
    const geoData = await geoResponse.json();
    
    if (!geoData || geoData.length === 0) {
      throw new Error("Location not found");
    }
    
    // Use coordinates to fetch weather data
    const { lat, lon, name } = geoData[0];
    
    return fetchWeatherByCoords(lat, lon, name);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

export const fetchWeatherByCoords = async (lat: number, lon: number, cityName?: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Weather data not available");
    }
    
    const data = await response.json();
    
    // Map OpenWeatherMap condition codes to our simplified conditions
    const weatherCode = data.weather[0].id;
    let condition: WeatherCondition;
    
    if (weatherCode >= 200 && weatherCode < 300) {
      condition = 'stormy';
    } else if (weatherCode >= 300 && weatherCode < 600) {
      condition = 'rainy';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      condition = 'snowy';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      condition = 'foggy';
    } else if (weatherCode === 800) {
      condition = 'sunny';
    } else {
      condition = 'cloudy';
    }
    
    return {
      location: cityName || data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      conditionCode: condition,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
