
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface LocationInputProps {
  onLocationSubmit: (location: string) => void;
  onUseCurrentLocation: () => void;
  isLoading: boolean;
}

const LocationInput = ({ onLocationSubmit, onUseCurrentLocation, isLoading }: LocationInputProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }
    onLocationSubmit(location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-grow"
        disabled={isLoading}
      />
      <div className="flex gap-2">
        <Button type="submit" variant="default" disabled={isLoading}>
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onUseCurrentLocation}
          disabled={isLoading}
        >
          Use My Location
        </Button>
      </div>
    </form>
  );
};

export default LocationInput;
