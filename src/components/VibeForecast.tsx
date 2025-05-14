
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherCondition } from "@/services/weatherApi";
import { ContentResponse } from "@/services/contentApi";
import { Sparkles } from "lucide-react";

interface VibeForecastProps {
  weatherCondition: WeatherCondition;
  contentType: 'joke' | 'quote';
  mood: string;
  temperature: number;
}

const VibeForecast = ({ weatherCondition, contentType, mood, temperature }: VibeForecastProps) => {
  const getVibePrediction = (): string => {
    // Weather-based vibes
    const weatherVibes: Record<WeatherCondition, string[]> = {
      sunny: [
        "golden opportunity rays",
        "vitamin D enthusiasm",
        "sunshine productivity",
        "radiant possibilities"
      ],
      cloudy: [
        "thoughtful reflection",
        "cozy introspection",
        "daydreaming potential",
        "creative cloud bursts"
      ],
      rainy: [
        "cozy productivity",
        "refreshing perspective",
        "rhythmic focus",
        "cleansing clarity"
      ],
      stormy: [
        "dramatic inspiration",
        "electric creativity",
        "passionate breakthroughs",
        "turbulent genius"
      ],
      snowy: [
        "peaceful contemplation",
        "crisp mental clarity",
        "transformative stillness",
        "fresh beginnings"
      ],
      foggy: [
        "mysterious discovery",
        "subtle revelation",
        "hidden opportunity",
        "dreamy intuition"
      ]
    };

    // Mood-based energy
    const moodEnergy: Record<string, string> = {
      calm: "steady and grounded energy",
      excited: "sparkling enthusiasm",
      thoughtful: "deep contemplative waves",
      playful: "spontaneous joy bursts",
      sleepy: "gentle, dreamy flow"
    };

    // Content type influences
    const contentInfluence = contentType === 'joke' 
      ? "with a side of unexpected laughter" 
      : "accompanied by meaningful insights";

    // Temperature factors
    let tempFactor = "";
    if (temperature > 30) {
      tempFactor = "Keep cool drinks handy for peak performance!";
    } else if (temperature > 20) {
      tempFactor = "Perfect temperature for outdoor adventures.";
    } else if (temperature > 10) {
      tempFactor = "Ideal for balanced productivity and relaxation.";
    } else {
      tempFactor = "Wrap up warm for maximum coziness and focus.";
    }

    // Randomly select weather vibe
    const weatherVibe = weatherVibes[weatherCondition][Math.floor(Math.random() * weatherVibes[weatherCondition].length)];
    const moodVibe = moodEnergy[mood] || "mysterious energy";

    // Create fun combinations based on contrasting or complementary elements
    let vibeCombination = "";
    if ((weatherCondition === 'sunny' && mood === 'calm') || (weatherCondition === 'cloudy' && mood === 'excited')) {
      vibeCombination = "creating a perfect balance of energy and focus.";
    } else if ((weatherCondition === 'rainy' && mood === 'sleepy') || (weatherCondition === 'foggy' && mood === 'thoughtful')) {
      vibeCombination = "ideal for deep contemplation and creative work.";
    } else if ((weatherCondition === 'stormy' && mood === 'playful') || (weatherCondition === 'sunny' && mood === 'excited')) {
      vibeCombination = "expect unexpected bursts of brilliance and joy!";
    } else {
      vibeCombination = "bringing unique opportunities your way today.";
    }

    // Construct the vibe forecast
    return `${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)} ${weatherVibe} meets your ${moodVibe} ${contentInfluence}, ${vibeCombination} ${tempFactor}`;
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Your Vibe Forecast
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="text-center">
          <p className="italic text-lg text-gray-700 leading-relaxed">
            {getVibePrediction()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VibeForecast;
