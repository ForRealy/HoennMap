// MyMap.tsx
import React, { useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import myMapImage from '../map.jpg';

// Configuración de íconos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface GameIndex {
  game_index: number;
  generation: {
    name: string;
    url: string;
  };
}

interface LocationData {
  name: string;
  areas: Array<{
    name: string;
  }>;
  game_indices: GameIndex[];
}

// Utilidad para formatear nombres
const formatName = (str: string) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// SVG Pokéball spinner
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

// Custom Marker
const CustomMarker: React.FC<{ position: [number, number]; name: string }> = React.memo(({ position, name }) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLocationData = async () => {
    if (locationData) return;

    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/location/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('Ubicación no encontrada');
      const data: LocationData = await response.json();
      setLocationData(data);
    } catch (err) {
      setError('Error al cargar datos de la ubicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Marker position={position}>
      <Popup
        eventHandlers={{ add: fetchLocationData }}
        className="custom-popup"
        aria-label={`Información de ${formatName(name)}`}
      >
        <div className="p-4 min-w-[250px] space-y-3">
          <h3 className="font-bold text-xl text-gray-800 border-b-2 border-gray-200 pb-2">
            {formatName(name)}
          </h3>

          {loading && (
            <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
              <PokeballSpinner />
              <span>Cargando información...</span>
            </div>
          )}

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {locationData && (
            <div className="space-y-4">
              {locationData.areas.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Áreas disponibles:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {locationData.areas.map((area, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        {formatName(area.name)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
});

const MyMap: React.FC = () => {
  const bounds: [[number, number], [number, number]] = [[0, 0], [1960, 2940]];
  const centerPosition: [number, number] = [
    bounds[1][0] / 2,
    bounds[1][1] / 2
  ];

  const markers: { position: [number, number]; name: string }[] = [
    { position: [825, 325], name: 'petalburg-city' },
    { position: [1180, 240], name: 'rustboro-city' },
    { position: [703, 1031], name: 'slateport-city' },
    { position: [1073, 995], name: 'mauville-city' },
    { position: [1629, 1570], name: 'southern-island' },
    { position: [1301, 1853], name: 'lilycove-city' },
    { position: [983, 2160], name: 'sootopolis-city' },
    { position: [1134, 2374], name: 'mossdeep-city' },
    { position: [970, 2554], name: 'pacifidlog-town' },
    { position: [692, 2662], name: 'ever-grande-city' }
  ];
  

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
        <CustomMarker
          key={`marker-${index}`}
          position={marker.position}
          name={marker.name}
        />
      ))}
    </MapContainer>
  );
};

export default MyMap;
