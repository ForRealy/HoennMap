import { HoennWeather } from '../services/weatherService';

interface LocationConfig {
  name: string;
  position: [number, number];
  defaultWeather: HoennWeather;
  possibleWeathers: HoennWeather[];
  type: 'Major City' | 'Tawns and Villages' | 'Landmarks and Locations';
}

export const locationConfig: LocationConfig[] = [
  // Cities
  {
    name: 'petalburg-city',
    position: [825, 325],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Major City'
  },
  {
    name: 'rustboro-city',
    position: [1180, 240],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'sandstorm'],
    type: 'Major City'
  },
  {
    name: 'slateport-city',
    position: [703, 1031],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'clear'],
    type: 'Major City'
  },
  {
    name: 'mauville-city',
    position: [1073, 995],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'rain'],
    type: 'Major City'
  },
  {
    name: 'lilycove-city',
    position: [1301, 1853],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Major City'
  },
  {
    name: 'sootopolis-city',
    position: [983, 2160],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'clear'],
    type: 'Major City'
  },
  {
    name: 'mossdeep-city',
    position: [1134, 2374],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Major City'
  },
  {
    name: 'ever-grande-city',
    position: [692, 2662],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'harsh-sunlight', 'rain'],
    type: 'Major City'
  },
  

  // Towns
  {
    name: 'fortree-city',
    position: [1450, 1505],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Tawns and Villages'
  },
  {
    name: 'littleroot-town',
    position: [518, 632],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Tawns and Villages'
  },
  {
    name: 'oldale-town',
    position: [819, 667],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Tawns and Villages'
  },
  {
    name: 'dewford-town',
    position: [398, 447],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Tawns and Villages'
  },
  {
    name: 'lavaridge-town',
    position: [1386, 843],
    defaultWeather: 'harsh-sunlight',
    possibleWeathers: ['harsh-sunlight', 'clear'],
    type: 'Tawns and Villages'
  },
  {
    name: 'fallarbor-town',
    position: [1550, 653],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'sandstorm'],
    type: 'Tawns and Villages'
  },
  {
    name: 'verdanturf-town',
    position: [1135, 715],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Tawns and Villages'
  },
  {
    name: 'pacifidlog-town',
    position: [1300, 2200],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'clear', 'fog'],
    type: 'Tawns and Villages'
  },

  // Special Locations
  {
    name: 'petalburg-woods',
    position: [932, 238],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'rain', 'clear'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'meteor-falls',
    position: [1360, 414],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'fog'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'mt-chimney',
    position: [1449, 847],
    defaultWeather: 'harsh-sunlight',
    possibleWeathers: ['harsh-sunlight', 'clear'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'desert-ruins',
    position: [1447, 1064],
    defaultWeather: 'sandstorm',
    possibleWeathers: ['sandstorm', 'harsh-sunlight'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'granite-cave',
    position: [384, 415],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'clear'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'island-cave',
    position: [537, 214],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'fog'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'sea-mauville',
    position: [390, 839],
    defaultWeather: 'rain',
    possibleWeathers: ['rain', 'heavy-rain', 'fog'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'mt-pyre',
    position: [1190, 1691],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'rain', 'clear'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'ancient-tomb',
    position: [1385, 1596],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'fog'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'safari-zone',
    position: [1327, 1676],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'shoal-cave',
    position: [1263, 2359],
    defaultWeather: 'fog',
    possibleWeathers: ['fog', 'rain', 'clear'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'sky-pillar',
    position: [750, 1974],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'fog'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'southern-island',
    position: [364, 1346],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain'],
    type: 'Landmarks and Locations'
  },
  {
    name: 'battle-frontier',
    position: [574, 2213],
    defaultWeather: 'clear',
    possibleWeathers: ['clear', 'rain', 'harsh-sunlight'],
    type: 'Landmarks and Locations'
  }
]; 