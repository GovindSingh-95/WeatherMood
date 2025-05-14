
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationInput from "@/components/LocationInput";
import WeatherDisplay from "@/components/WeatherDisplay";
import ContentDisplay from "@/components/ContentDisplay";
import { 
  fetchWeatherData, 
  fetchWeatherByCoords, 
  getUserLocation, 
  WeatherData,
  WeatherCondition
} from "@/services/weatherApi";
import { fetchContent, ContentResponse } from "@/services/contentApi";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [content, setContent] = useState<ContentResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch content based on weather condition
  const fetchContentForWeather = async (condition: WeatherCondition) => {
    try {
      const contentData = await fetchContent(condition);
      setContent(contentData);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to fetch content. Using fallback content.");
      
      // We still want to show some content, even if API fails
      const fallbackContent: ContentResponse = {
        text: `Weather-themed ${condition === 'sunny' ? 'joke' : 'quote'} not available right now.`,
        type: condition === 'sunny' ? 'joke' : 'quote'
      };
      setContent(fallbackContent);
    }
  };

  // Handle location search
  const handleLocationSubmit = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      await fetchContentForWeather(data.conditionCode as WeatherCondition);
      toast.success(`Weather found for ${data.location}`);
    } catch (error) {
      console.error("Error:", error);
      setError("Location not found. Please try another city.");
      toast.error("Location not found. Please try another city.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle current location
  const handleUseCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { lat, lon } = await getUserLocation();
      const data = await fetchWeatherByCoords(lat, lon);
      setWeatherData(data);
      await fetchContentForWeather(data.conditionCode as WeatherCondition);
      toast.success(`Weather found for ${data.location}`);
    } catch (error) {
      console.error("Error:", error);
      setError("Could not determine your location. Please enable location services or enter a city manually.");
      toast.error("Could not determine your location. Please enable location services or enter a city manually.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle content refresh
  const handleRefreshContent = async () => {
    if (!weatherData) return;
    
    setIsLoading(true);
    try {
      await fetchContentForWeather(weatherData.conditionCode as WeatherCondition);
      toast.success("Content refreshed");
    } catch (error) {
      console.error("Error refreshing content:", error);
      toast.error("Failed to refresh content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Try to get user location on first load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const { lat, lon } = await getUserLocation();
        const data = await fetchWeatherByCoords(lat, lon);
        setWeatherData(data);
        await fetchContentForWeather(data.conditionCode as WeatherCondition);
      } catch (error) {
        console.log("Auto-location not available. Please enter a location manually.");
        // Don't show an error toast here since this is just the initial attempt
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="flex justify-center mb-8">
          <LocationInput 
            onLocationSubmit={handleLocationSubmit} 
            onUseCurrentLocation={handleUseCurrentLocation} 
            isLoading={isLoading}
          />
        </div>
        
        {isLoading && (
          <div className="flex justify-center mb-4">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center mb-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        
        {weatherData && (
          <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
            <WeatherDisplay weatherData={weatherData} />
            
            {content && (
              <ContentDisplay 
                content={content}
                weatherCondition={weatherData.conditionCode as WeatherCondition}
                onRefresh={handleRefreshContent}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
        
        {!weatherData && !isLoading && !error && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              Enter a location or use your current location to get started!
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
