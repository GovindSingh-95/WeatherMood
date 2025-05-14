
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Smile, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { getSpiritAnimal, MoodOption, moodOptions, SpiritAnimal } from "@/services/spiritAnimalApi";
import { WeatherCondition } from "@/services/weatherApi";

interface SpiritAnimalDisplayProps {
  weatherCondition: WeatherCondition;
}

const SpiritAnimalDisplay = ({ weatherCondition }: SpiritAnimalDisplayProps) => {
  const [mood, setMood] = React.useState<string>("calm");
  const [spiritAnimal, setSpiritAnimal] = React.useState<SpiritAnimal | null>(null);

  React.useEffect(() => {
    if (weatherCondition) {
      updateSpiritAnimal(mood);
    }
  }, [weatherCondition, mood]);

  const updateSpiritAnimal = (selectedMood: string) => {
    const animal = getSpiritAnimal(weatherCondition, selectedMood);
    setSpiritAnimal(animal);
  };

  const handleMoodChange = (value: string) => {
    setMood(value);
    toast.success(`Mood updated to ${value}!`);
  };

  const handleRandomize = () => {
    const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)].value;
    setMood(randomMood);
    toast.success("Finding your new spirit animal!");
  };

  if (!spiritAnimal) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg weather-card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-center gap-2">
          <Smile className="h-5 w-5" />
          Your Weather Spirit Animal
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-col items-center text-center mb-4">
          <span className="text-5xl mb-3">{spiritAnimal.emoji}</span>
          <h3 className="text-xl font-semibold mb-1">{spiritAnimal.name}</h3>
          <p className="text-gray-600">{spiritAnimal.description}</p>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-center mb-2">
            <p className="text-sm text-gray-500">How are you feeling today?</p>
          </div>
          
          <RadioGroup
            value={mood}
            onValueChange={handleMoodChange}
            className="grid grid-cols-5 gap-2"
          >
            {moodOptions.map((option) => (
              <div key={option.value} className="flex flex-col items-center">
                <RadioGroupItem
                  value={option.value}
                  id={`mood-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`mood-${option.value}`}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-xl mb-1">{option.emoji}</span>
                  <span className="text-xs">{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRandomize}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Surprise Me
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpiritAnimalDisplay;
