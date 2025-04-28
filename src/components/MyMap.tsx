// MyMap.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import myMapImage from '../map.jpg';
import { HoennWeather, getCityWeather } from '../services/weatherService';
import WeatherOverlay from './WeatherOverlay';
import { locationConfig } from '../config/locationConfig';
import '../styles/markers.css';
import { getRandomPokemon } from '../services/pokemonService';
import PokemonSearch from './PokemonSearch';
import { getRealWeather } from '../services/weatherService';

// Fix Leaflet icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Types
interface GameIndex {
  game_index: number;
  generation: { name: string; url: string };
}

interface Area {
  name: string;
}

interface LocationData {
  name: string;
  areas: Area[];
  game_indices: GameIndex[];
}

// Format name
const formatName = (str: string) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// Format weather
const formatWeather = (weather: string) =>
  weather.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// Marker component
const CustomMarker: React.FC<{ 
  position: [number, number]; 
  city: any; 
  weather: HoennWeather;
  onWeatherChange: (weather: HoennWeather, location: any) => void;
  searchedPokemon: any;
}> = React.memo(({ position, city, weather, onWeatherChange, searchedPokemon }) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMarkerColor = () => {
    console.log('City type:', city.type);
    switch (city.type) {
      case 'Major City':
        return 'red';
      case 'Towns and Villages':
        return 'yellowgreen';
      case 'Landmarks and Locations':
        return 'blue';
      default:
        return 'blue';
    }
  };

  const markerIcon = L.divIcon({
    className: `custom-marker ${getMarkerColor()}`,
    html: '',
    iconSize: [20, 20],
  });

  const handlePopupOpen = async () => {
    setIsLoading(true);
    if (searchedPokemon) {
      setPokemon(searchedPokemon);
    } else {
      const randomPokemon = await getRandomPokemon();
      setPokemon(randomPokemon);
    }
    setIsLoading(false);
  };

  return (
    <Marker
      position={position}
      icon={markerIcon}
      eventHandlers={{
        click: () => onWeatherChange(weather, city),
        popupopen: handlePopupOpen
      }}
    >
      <Popup>
        <div className="popup-content">
          <h3>{formatName(city.name)}</h3>
          <p>Weather: {formatWeather(weather)}</p>
          <div className="pokemon-raid">
            <h4>Active Raid</h4>
            {isLoading ? (
              <div className="loading">Loading Pokémon...</div>
            ) : pokemon ? (
              <div className="pokemon-display">
                <img 
                  src={pokemon.sprite} 
                  alt={pokemon.name} 
                  className="pokemon-sprite"
                />
                <p className="pokemon-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </p>
              </div>
            ) : (
              <div className="error">Failed to load Pokémon</div>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

const MyMap: React.FC = () => {
  const bounds: [[number, number], [number, number]] = [[0, 0], [1960, 2940]];
  const centerPosition: [number, number] = [bounds[1][0] / 2, bounds[1][1] / 2];
  const [weather, setWeather] = useState<HoennWeather>('clear');
  const [locationWeathers, setLocationWeathers] = useState<Record<string, HoennWeather>>({});
  const [foundPokemon, setFoundPokemon] = useState<{ pokemon: any; location: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchedPokemon, setSearchedPokemon] = useState<{ pokemon: any; location: string } | null>(null);

  // Initialize location weathers with real weather data
  useEffect(() => {
    const fetchWeathers = async () => {
      const weathers: Record<string, HoennWeather> = {};
      for (const location of locationConfig) {
        try {
          const realWeather = await getRealWeather(
            location.realCoordinates.lat,
            location.realCoordinates.lon
          );
          // Only use the real weather if it's in the possible weathers for that location
          if (location.possibleWeathers.includes(realWeather)) {
            weathers[location.name] = realWeather;
          } else {
            // If real weather isn't possible for this location, use default
            weathers[location.name] = location.defaultWeather;
          }
        } catch (error) {
          console.error(`Error fetching weather for ${location.name}:`, error);
          weathers[location.name] = location.defaultWeather;
        }
      }
      setLocationWeathers(weathers);
    };

    fetchWeathers();
  }, []);

  const handleWeatherChange = (newWeather: HoennWeather, location: any) => {
    // Get a random weather from the location's possible weathers
    const randomIndex = Math.floor(Math.random() * location.possibleWeathers.length);
    const randomWeather = location.possibleWeathers[randomIndex];
    
    // Update the weather for this specific location
    setLocationWeathers(prev => ({
      ...prev,
      [location.name]: randomWeather
    }));
    
    // Update the global weather state
    setWeather(randomWeather);
  };

  const handlePokemonFound = (pokemon: any, location: string) => {
    setSearchedPokemon({ pokemon, location });
    setFoundPokemon({ pokemon, location });
    setError(null);
    setTimeout(() => setFoundPokemon(null), 3000);
  };

  const handleSearchError = (message: string) => {
    setError(message);
    setFoundPokemon(null);
    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="map-container">
      <PokemonSearch 
        onPokemonFound={handlePokemonFound}
        onError={handleSearchError}
      />
      
      {error && (
        <div className="error-popup fade-in">
          {error}
        </div>
      )}

      {foundPokemon && (
        <div className="found-pokemon-popup fade-in">
          <h3>¡Pokémon Encontrado!</h3>
          <p>Se ha encontrado {foundPokemon.pokemon.name} en {formatName(foundPokemon.location)}</p>
          <img 
            src={foundPokemon.pokemon.sprite} 
            alt={foundPokemon.pokemon.name}
            className="found-pokemon-sprite"
          />
        </div>
      )}

      <style>
        {`
          .error-popup, .found-pokemon-popup {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(255, 255, 255, 0.95);
            color: #333;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1000;
            text-align: center;
            animation: fadeInOut 3s ease-in-out;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }

          .found-pokemon-popup {
            background-color: rgba(255, 255, 255, 0.98);
            padding: 20px 30px;
          }

          .found-pokemon-sprite {
            width: 100px;
            height: 100px;
            margin-top: 10px;
          }

          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -20px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            80% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
          }
        `}
      </style>

      <MapContainer
        center={centerPosition}
        zoom={-1}
        minZoom={0}
        maxZoom={0}
        crs={L.CRS.Simple}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100vh', width: '100%' }}
      >
        <ImageOverlay url={myMapImage} bounds={bounds} />
        <WeatherOverlay weather={weather} />
        {locationConfig.map((location) => (
          <CustomMarker
            key={location.name}
            position={location.position}
            city={location}
            weather={locationWeathers[location.name] || location.defaultWeather}
            onWeatherChange={(weather) => handleWeatherChange(weather, location)}
            searchedPokemon={searchedPokemon?.location === location.name ? searchedPokemon.pokemon : null}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
