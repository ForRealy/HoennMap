import axios from 'axios';
import { cityWeatherConfig } from '../config/weatherConfig';

// Hoenn weather types based on game mechanics
export type HoennWeather = 
  | 'clear'
  | 'rain'
  | 'sandstorm'
  | 'harsh-sunlight'
  | 'fog'
  | 'heavy-rain';

interface WeatherData {
  main: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

// Get the current day's date as a string (YYYY-MM-DD)
const getCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Get or set the daily weather for a city
export const getCityWeather = (cityName: string): HoennWeather => {
  const dateKey = `weather_${getCurrentDate()}_${cityName}`;
  const storedWeather = localStorage.getItem(dateKey);
  
  if (storedWeather) {
    return storedWeather as HoennWeather;
  }

  // If no weather for today, generate new weather
  const cityConfig = cityWeatherConfig.find(city => city.name === cityName);
  if (!cityConfig) {
    return 'clear';
  }

  // Randomly select from possible weathers
  const randomIndex = Math.floor(Math.random() * cityConfig.possibleWeathers.length);
  const newWeather = cityConfig.possibleWeathers[randomIndex];
  
  // Store the new weather
  localStorage.setItem(dateKey, newWeather);
  
  return newWeather;
};

// Get weather for all cities
export const getAllCitiesWeather = (): Record<string, HoennWeather> => {
  return cityWeatherConfig.reduce((acc, city) => {
    acc[city.name] = getCityWeather(city.name);
    return acc;
  }, {} as Record<string, HoennWeather>);
};

// For future use with real weather API
export const getRealWeather = async (lat: number, lon: number): Promise<HoennWeather> => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const weatherData: WeatherData = {
      main: response.data.weather[0].main,
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };

    return mapToHoennWeather(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'clear';
  }
};

// Helper function to map real weather to Hoenn weather
const mapToHoennWeather = (weather: WeatherData): HoennWeather => {
  const { main, humidity, windSpeed, temperature } = weather;
  
  console.log('Mapping weather data:', {
    main,
    humidity,
    windSpeed,
    temperature
  });
  
  // Heavy rain conditions
  if (main === 'Rain' && humidity > 80 && windSpeed > 5) {
    console.log('Mapped to heavy-rain');
    return 'heavy-rain';
  }
  
  // Regular rain
  if (main === 'Rain' || main === 'Drizzle' || humidity > 70) {
    console.log('Mapped to rain');
    return 'rain';
  }
  
  // Sandstorm (high wind and dry conditions)
  if ((windSpeed > 8 && humidity < 30) || (main === 'Dust' || main === 'Sand')) {
    console.log('Mapped to sandstorm');
    return 'sandstorm';
  }
  
  // Harsh sunlight (clear and hot)
  if ((main === 'Clear' && temperature > 30) || (main === 'Clear' && humidity < 40)) {
    console.log('Mapped to harsh-sunlight');
    return 'harsh-sunlight';
  }
  
  // Fog
  if (main === 'Fog' || main === 'Mist' || main === 'Haze' || (humidity > 90 && windSpeed < 3)) {
    console.log('Mapped to fog');
    return 'fog';
  }
  
  // Clear weather with some variation based on conditions
  if (main === 'Clear' || main === 'Clouds') {
    // Add some randomness to clear weather based on conditions
    const random = Math.random();
    if (humidity > 80 && random < 0.3) {
      return 'fog';
    } else if (temperature > 25 && random < 0.4) {
      return 'harsh-sunlight';
    } else if (windSpeed > 5 && random < 0.2) {
      return 'sandstorm';
    }
  }
  
  console.log('Mapped to clear (default)');
  return 'clear';
}; 