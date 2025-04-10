// MyMap.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import myMapImage from '../map.jpg';

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

// Pokéball loading spinner
const PokeballSpinner = () => (
  <svg
    className="h-6 w-6 animate-spin mx-auto text-red-500"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="10" fill="white" />
    <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="10" />
    <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="6" />
    <circle cx="50" cy="50" r="7" fill="black" />
  </svg>
);

// Global fetch cache
const locationCache: Record<string, LocationData> = {};

// Marker component
const CustomMarker: React.FC<{ position: [number, number]; name: string }> = React.memo(({ position, name }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load from sessionStorage if available
  useEffect(() => {
    const stored = sessionStorage.getItem(name);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        locationCache[name] = parsed;
        setLocationData(parsed);
      } catch {
        // ignore bad cache
      }
    }
  }, [name]);

  // Fetch on popup open
  useEffect(() => {
    if (!popupOpen || locationData) return;

    const fetchLocationData = async () => {
      if (locationCache[name]) {
        setLocationData(locationCache[name]);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/location/${name.toLowerCase()}`);
        if (!res.ok) throw new Error('Ubicación no encontrada');
        const data: LocationData = await res.json();
        locationCache[name] = data;
        sessionStorage.setItem(name, JSON.stringify(data));
        setLocationData(data);
      } catch (err) {
        setError('Error al cargar datos de la ubicación');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [popupOpen, locationData, name]);

  return (
    <Marker position={position}>
      <Popup
        eventHandlers={{
          add: () => setPopupOpen(true),
          remove: () => setPopupOpen(false),
        }}
        className="custom-popup"
        aria-label={`Información de ${formatName(name)}`}
      >
        <div className="p-4 min-w-[250px] space-y-3 text-sm text-gray-800">
          <h3 className="font-bold text-xl border-b border-gray-300 pb-1">
            {formatName(name)}
          </h3>

          {loading && (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <PokeballSpinner />
              <span>Cargando información...</span>
            </div>
          )}

          {error && (
            <div className="text-red-500 font-medium">{error}</div>
          )}

          {locationData && locationData.areas.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1 text-gray-700">Áreas disponibles:</h4>
              <ul className="list-disc pl-4 space-y-1">
                {locationData.areas.map((area, i) => (
                  <li key={i}>{formatName(area.name)}</li>
                ))}
              </ul>
            </div>
          )}

          {locationData && locationData.areas.length === 0 && (
            <div className="text-gray-500 italic">No hay áreas disponibles</div>
          )}
        </div>
      </Popup>
    </Marker>
  );
});

const MyMap: React.FC = () => {
  const bounds: [[number, number], [number, number]] = [[0, 0], [1960, 2940]];
  const centerPosition: [number, number] = [bounds[1][0] / 2, bounds[1][1] / 2];

  // Memoize the markers array to prevent re-renders of CustomMarker components
  const markers = React.useMemo(() => [
    { position: [825, 325] as [number, number], name: 'petalburg-city' },
    { position: [1180, 240] as [number, number], name: 'rustboro-city' },
    { position: [703, 1031] as [number, number], name: 'slateport-city' },
    { position: [1073, 995] as [number, number], name: 'mauville-city' },
    { position: [1629, 1570] as [number, number], name: 'southern-island' },
    { position: [1301, 1853] as [number, number], name: 'lilycove-city' },
    { position: [983, 2160] as [number, number], name: 'sootopolis-city' },
    { position: [1134, 2374] as [number, number], name: 'mossdeep-city' },
    { position: [970, 2554] as [number, number], name: 'pacifidlog-town' },
    { position: [692, 2662] as [number, number], name: 'ever-grande-city' }
  ], []); // Empty dependency array ensures this is only computed once

  return (
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
      {markers.map((marker, index) => (
        <CustomMarker key={`marker-${index}`} {...marker} />
      ))}
    </MapContainer>
  );
};

export default MyMap;
