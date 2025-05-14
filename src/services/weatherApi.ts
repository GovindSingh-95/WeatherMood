
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  conditionCode: string;
  icon: string;
}

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy';

// This is a free weather API key - normally we'd use environment variables
// but for demonstration purposes it's included here
const API_KEY = "4aa1e152408e608d4845d79f6b91551d";

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Weather data not available");
    }
    
    const data = await response.json();
    
    // Map OpenWeatherMap condition codes to our simplified conditions
    const weatherCode = data.weather[0].id;
    let condition: WeatherCondition;
    
    // Map weather codes to our conditions
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
      location: data.name,
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

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
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
      location: data.name,
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
