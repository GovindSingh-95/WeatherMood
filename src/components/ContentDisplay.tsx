
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentResponse } from "@/services/contentApi";
import { WeatherCondition } from "@/services/weatherApi";
import { RefreshCw, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ContentDisplayProps {
  content: ContentResponse;
  weatherCondition: WeatherCondition;
  onRefresh: () => void;
  isLoading: boolean;
}

const ContentDisplay = ({ content, weatherCondition, onRefresh, isLoading }: ContentDisplayProps) => {
  const handleShare = () => {
    const shareText = content.author
      ? `"${content.text}" - ${content.author}`
      : `${content.text}`;
      
    if (navigator.share) {
      navigator.share({
        title: "Weather Mood",
        text: shareText,
      }).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText);
      toast.success("Copied to clipboard!");
    }
  };

  // Get emoji based on weather condition
  const getEmoji = () => {
    switch (weatherCondition) {
      case "sunny": return "☀️";
      case "cloudy": return "☁️";
      case "rainy": return "🌧️";
      case "stormy": return "⛈️";
      case "snowy": return "❄️";
      case "foggy": return "🌫️";
      default: return "🌤️";
    }
  };

  return (
    <Card className={`overflow-hidden border-none shadow-lg weather-card-gradient`}>
      <CardContent className="p-6 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl mb-4">{getEmoji()}</span>
          <p className="text-lg mb-2 italic">{content.text}</p>
          {content.author && (
            <p className="text-sm text-gray-600">- {content.author}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh} 
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          New {content.type}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentDisplay;
