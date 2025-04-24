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

// Marker component
const CustomMarker: React.FC<{ 
  position: [number, number]; 
  city: any; 
  weather: HoennWeather;
  onWeatherChange: (weather: HoennWeather) => void;
  searchedPokemon: any;
}> = React.memo(({ position, city, weather, onWeatherChange, searchedPokemon }) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const markerIcon = L.divIcon({
    className: `custom-marker ${city.color}`,
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
        click: () => onWeatherChange(weather),
        popupopen: handlePopupOpen
      }}
    >
      <Popup>
        <div className="popup-content">
          <h3>{city.name}</h3>
          <p>Weather: {weather}</p>
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

  // Initialize location weathers
  useEffect(() => {
    const weathers = locationConfig.reduce((acc, location) => {
      acc[location.name] = getCityWeather(location.name);
      return acc;
    }, {} as Record<string, HoennWeather>);
    setLocationWeathers(weathers);
  }, []);

  const handleWeatherChange = (newWeather: HoennWeather) => {
    setWeather(newWeather);
  };

  const handlePokemonFound = (pokemon: any, location: string) => {
    setSearchedPokemon({ pokemon, location });
    setFoundPokemon({ pokemon, location });
    setError(null);
    setTimeout(() => setFoundPokemon(null), 2000);
  };

  const handleSearchError = (message: string) => {
    setError(message);
    setFoundPokemon(null);
    setTimeout(() => setError(null), 2000);
  };

  return (
    <div className="map-container">
      <PokemonSearch 
        onPokemonFound={handlePokemonFound}
        onError={handleSearchError}
      />
      
      {error && (
        <div className="error-popup">
          {error}
        </div>
      )}

      {foundPokemon && (
        <div className="found-pokemon-popup">
          <h3>¡Pokémon Encontrado!</h3>
          <p>Se ha encontrado {foundPokemon.pokemon.name} en {foundPokemon.location}</p>
          <img 
            src={foundPokemon.pokemon.sprite} 
            alt={foundPokemon.pokemon.name}
            className="found-pokemon-sprite"
          />
        </div>
      )}

      <MapContainer
        center={centerPosition}
        zoom={-2}
        minZoom={-1}
        maxZoom={1}
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
            onWeatherChange={handleWeatherChange}
            searchedPokemon={searchedPokemon?.location === location.name ? searchedPokemon.pokemon : null}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
