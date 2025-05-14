
import { WeatherCondition } from './weatherApi';

export interface MoodOption {
  value: string;
  label: string;
  emoji: string;
}

export interface SpiritAnimal {
  name: string;
  description: string;
  emoji: string;
}

export const moodOptions: MoodOption[] = [
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'excited', label: 'Excited', emoji: '🤩' },
  { value: 'thoughtful', label: 'Thoughtful', emoji: '🤔' },
  { value: 'playful', label: 'Playful', emoji: '😋' },
  { value: 'sleepy', label: 'Sleepy', emoji: '😴' },
];

// Spirit animal definitions based on weather and mood combinations
const spiritAnimals: Record<WeatherCondition, Record<string, SpiritAnimal>> = {
  sunny: {
    calm: {
      name: 'Sunbathing Cat',
      description: 'You\'re a content cat lounging in a sunny window, peaceful and warm.',
      emoji: '😸',
    },
    excited: {
      name: 'Caffeinated Golden Retriever',
      description: 'You\'re bursting with energy like a golden retriever with zoomies!',
      emoji: '🐕',
    },
    thoughtful: {
      name: 'Wise Owl',
      description: 'You\'re contemplating life from a sunny branch, absorbing wisdom from the world.',
      emoji: '🦉',
    },
    playful: {
      name: 'Bouncy Squirrel',
      description: 'You\'re darting around with endless curiosity, collecting shiny moments.',
      emoji: '🐿️',
    },
    sleepy: {
      name: 'Lazy Lion',
      description: 'You\'re a majestic lion taking a well-deserved nap in the warm savanna.',
      emoji: '🦁',
    },
  },
  cloudy: {
    calm: {
      name: 'Daydreaming Koala',
      description: 'You\'re a relaxed koala, peaceful and unbothered by the changing sky.',
      emoji: '🐨',
    },
    excited: {
      name: 'Jumping Dolphin',
      description: 'You\'re leaping through waves of emotions, finding joy in the changing tides!',
      emoji: '🐬',
    },
    thoughtful: {
      name: 'Philosopher Fox',
      description: 'You\'re a clever fox pondering the meaning of clouds and other life mysteries.',
      emoji: '🦊',
    },
    playful: {
      name: 'Mischievous Monkey',
      description: 'You\'re swinging from thought to thought, finding fun in the gray areas.',
      emoji: '🐒',
    },
    sleepy: {
      name: 'Cozy Sloth',
      description: 'You\'re taking it slow and steady, perfectly content to hang around.',
      emoji: '🦥',
    },
  },
  rainy: {
    calm: {
      name: 'Sleepy Panda',
      description: 'You\'re a cozy panda with a book, enjoying the pitter-patter of raindrops.',
      emoji: '🐼',
    },
    excited: {
      name: 'Splashing Duck',
      description: 'You\'re enthusiastically puddle-jumping through life, embracing the wet and wild!',
      emoji: '🦆',
    },
    thoughtful: {
      name: 'Rainy Day Poet',
      description: 'You\'re a contemplative soul writing mental poems inspired by the falling rain.',
      emoji: '🐢',
    },
    playful: {
      name: 'Dancing Frog',
      description: 'You\'re hopping from lily pad to lily pad, finding joy in the raindrops.',
      emoji: '🐸',
    },
    sleepy: {
      name: 'Hibernating Bear',
      description: 'You\'re snuggled up in a cozy cave, letting the rain lull you to dreamland.',
      emoji: '🐻',
    },
  },
  stormy: {
    calm: {
      name: 'Zen Tortoise',
      description: 'You\'re unshakable in your calm, like a tortoise weathering any storm.',
      emoji: '🐢',
    },
    excited: {
      name: 'Electric Rabbit',
      description: 'You\'re buzzing with energy, hopping from excitement to excitement!',
      emoji: '🐇',
    },
    thoughtful: {
      name: 'Storm-Watching Raven',
      description: 'You\'re a deep thinker perched on the edge of revelation, watching lightning strike.',
      emoji: '🪽',
    },
    playful: {
      name: 'Thunder Tiger',
      description: 'You\'re pouncing on opportunities, with a roar as mighty as thunder!',
      emoji: '🐯',
    },
    sleepy: {
      name: 'Dreaming Dormouse',
      description: 'You\'re curled up tight, finding peace in dreams while storms rage outside.',
      emoji: '🐁',
    },
  },
  snowy: {
    calm: {
      name: 'Peaceful Polar Bear',
      description: 'You\'re a serene spirit floating through life\'s snowdrifts with grace.',
      emoji: '❄️',
    },
    excited: {
      name: 'Arctic Fox Kit',
      description: 'You\'re bounding through snowdrifts with boundless enthusiasm and wonder!',
      emoji: '🦊',
    },
    thoughtful: {
      name: 'Snowy Owl',
      description: 'You\'re silently observing the world from your perch, wise and watchful.',
      emoji: '🦉',
    },
    playful: {
      name: 'Sledding Penguin',
      description: 'You\'re belly-sliding through life, finding fun in the frozen moments.',
      emoji: '🐧',
    },
    sleepy: {
      name: 'Hibernating Hedgehog',
      description: 'You\'re curled into a perfect ball, dreaming of spring while snow falls softly.',
      emoji: '🦔',
    },
  },
  foggy: {
    calm: {
      name: 'Mystical Wolf',
      description: 'You\'re a silent presence moving gracefully through life\'s uncertainties.',
      emoji: '🐺',
    },
    excited: {
      name: 'Curious Ferret',
      description: 'You\'re darting excitedly through the mist, finding hidden treasures!',
      emoji: '🦡',
    },
    thoughtful: {
      name: 'Foggy Mountain Goat',
      description: 'You\'re contemplatively navigating life\'s cliffs, sure-footed despite limited visibility.',
      emoji: '🐐',
    },
    playful: {
      name: 'Hide-and-Seek Mouse',
      description: 'You\'re playfully darting in and out of view, making games from life\'s uncertainties.',
      emoji: '🐭',
    },
    sleepy: {
      name: 'Drowsy Deer',
      description: 'You\'re peacefully resting in a misty meadow, letting worries fade into the fog.',
      emoji: '🦌',
    },
  },
};

export const getSpiritAnimal = (weather: WeatherCondition, mood: string): SpiritAnimal => {
  // Default to a random mood if the specified one doesn't exist
  const availableMoods = Object.keys(spiritAnimals[weather]);
  const selectedMood = availableMoods.includes(mood) ? mood : availableMoods[Math.floor(Math.random() * availableMoods.length)];
  
  return spiritAnimals[weather][selectedMood];
};
