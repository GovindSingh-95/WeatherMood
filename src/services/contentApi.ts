
import { WeatherCondition } from './weatherApi';

export interface ContentResponse {
  text: string;
  author?: string;
  type: 'joke' | 'quote';
}

// Content type mapping based on weather conditions
const contentTypeMap: Record<WeatherCondition, 'joke' | 'quote'> = {
  sunny: 'joke',
  cloudy: 'quote',
  rainy: 'quote',
  stormy: 'joke',
  snowy: 'quote',
  foggy: 'quote'
};

// Content mood mapping for API filtering
const contentMoodMap: Record<WeatherCondition, string> = {
  sunny: 'cheerful',
  cloudy: 'thoughtful',
  rainy: 'cozy',
  stormy: 'sarcastic',
  snowy: 'peaceful',
  foggy: 'mysterious'
};

export const fetchContent = async (weatherCondition: WeatherCondition): Promise<ContentResponse> => {
  const contentType = contentTypeMap[weatherCondition];
  
  if (contentType === 'joke') {
    return fetchJoke(contentMoodMap[weatherCondition]);
  } else {
    return fetchQuote(contentMoodMap[weatherCondition]);
  }
};

const fetchJoke = async (mood: string): Promise<ContentResponse> => {
  try {
    // JokeAPI doesn't support mood filtering, so we're using a generic joke endpoint
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    
    if (!response.ok) {
      throw new Error("Joke data not available");
    }
    
    const data = await response.json();
    
    return {
      text: `${data.setup} ${data.punchline}`,
      type: 'joke'
    };
  } catch (error) {
    console.error("Error fetching joke:", error);
    // Fallback joke based on mood
    return {
      text: getDefaultJoke(mood),
      type: 'joke'
    };
  }
};

const fetchQuote = async (mood: string): Promise<ContentResponse> => {
  try {
    // Quotable API is having issues, switching to backup quotes API
    const response = await fetch('https://api.quotable.io/random');
    
    if (!response.ok) {
      throw new Error("Quote data not available");
    }
    
    const data = await response.json();
    
    return {
      text: data.content,
      author: data.author,
      type: 'quote'
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    // Use fallback quotes when API fails
    return {
      text: getDefaultQuote(mood),
      author: "Weather Buddy",
      type: 'quote'
    };
  }
};

// Expanded fallback content for offline use or API failures
function getDefaultJoke(mood: string): string {
  const jokes = {
    cheerful: "Why did the sun go to school? To get a little brighter!",
    sarcastic: "I was going to tell you a joke about thunder, but it might shock you."
  };
  
  return jokes[mood as keyof typeof jokes] || 
    "What's the best thing about elevator jokes? They work on so many levels.";
}

function getDefaultQuote(mood: string): string {
  const quotes = {
    thoughtful: "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
    cozy: "A rainy day is the perfect time for a cup of tea and a good book.",
    peaceful: "Snowflakes are one of nature's most fragile things, but just look what they can do when they stick together.",
    mysterious: "Sometimes clarity comes after the fog has lifted."
  };
  
  return quotes[mood as keyof typeof quotes] || 
    "Wherever you go, no matter what the weather, always bring your own sunshine.";
}
