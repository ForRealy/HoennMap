import { HoennWeather } from '../services/weatherService';

interface CityWeather {
  name: string;
  position: [number, number];
  defaultWeather: HoennWeather;
  possibleWeathers: HoennWeather[];
}

export const cityWeatherConfig: CityWeather[] = [
  {
    name: 'petalburg-city',
    position: [825, 325],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog']
  },
  {
    name: 'rustboro-city',
    position: [1180, 240],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'sandstorm']
  },
  {
    name: 'slateport-city',
    position: [703, 1031],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'clear']
  },
  {
    name: 'mauville-city',
    position: [1073, 995],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'rain']
  },
  {
    name: 'lilycove-city',
    position: [1301, 1853],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog']
  },
  {
    name: 'sootopolis-city',
    position: [983, 2160],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'clear']
  },
  {
    name: 'mossdeep-city',
    position: [1134, 2374],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog']
  },
  {
    name: 'ever-grande-city',
    position: [692, 2662],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'rain']
  }
]; 