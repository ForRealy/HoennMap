import { HoennWeather } from '../services/weatherService';

interface LocationConfig {
  name: string;
  position: [number, number];
  defaultWeather: HoennWeather;
  possibleWeathers: HoennWeather[];
  type: 'Major City' | 'Towns and Villages' | 'Landmarks and Locations';
  realCoordinates: {
    lat: number;
    lon: number;
  };
}

export const locationConfig: LocationConfig[] = [
  // Cities
  {
    name: 'petalburg-city',
    position: [830, 323],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'rustboro-city',
    position: [1186, 239],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'sandstorm'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'slateport-city',
    position: [708, 1029],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'clear'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'mauville-city',
    position: [1077, 994],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'rain'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'lilycove-city',
    position: [1305, 1851],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'sootopolis-city',
    position: [988, 2158],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'clear'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'mossdeep-city',
    position: [1138, 2373],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'ever-grande-city',
    position: [697, 2660],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'rain'],
    type: 'Major City',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  

  // Towns
  {
    name: 'fortree-city',
    position: [1450, 1505],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'littleroot-town',
    position: [518, 632],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'oldale-town',
    position: [819, 667],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'dewford-town',
    position: [398, 447],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'lavaridge-town',
    position: [1386, 843],
    defaultWeather: 'harsh-sunlight',
    possibleWeathers: ['harsh-sunlight', 'clear'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'fallarbor-town',
    position: [1550, 653],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'sandstorm'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'verdanturf-town',
    position: [1135, 715],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'pacifidlog-town',
    position: [745, 1815],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'clear', 'fog'],
    type: 'Towns and Villages',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },

  // Special Locations
  {
    name: 'petalburg-woods',
    position: [932, 238],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'rain', 'clear'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'meteor-falls',
    position: [1360, 414],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'fog'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'mt-chimney',
    position: [1449, 847],
    defaultWeather: 'harsh-sunlight',
    possibleWeathers: ['harsh-sunlight', 'clear'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'desert-ruins',
    position: [1447, 1064],
    defaultWeather: 'sandstorm',
    possibleWeathers: ['sandstorm', 'harsh-sunlight'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'granite-cave',
    position: [384, 415],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'clear'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'island-cave',
    position: [537, 214],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'fog'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'sea-mauville',
    position: [390, 839],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'fog'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'mt-pyre',
    position: [1190, 1691],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'rain', 'clear'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'ancient-tomb',
    position: [1385, 1596],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'fog'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'safari-zone',
    position: [1327, 1676],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'shoal-cave',
    position: [1263, 2359],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'rain', 'clear'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'sky-pillar',
    position: [750, 1974],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'southern-island',
    position: [364, 1346],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  },
  {
    name: 'battle-frontier',
    position: [574, 2213],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'harsh-sunlight'],
    type: 'Landmarks and Locations',
    realCoordinates: { lat: 34.3853, lon: 132.4553 } // Hiroshima, Japan
  }
]; 