import React, { useEffect, useCallback, useRef } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import myMapImage from '../map.jpg';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;
  }
}

// Configuración de los íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface CustomMarkerProps {
  position: [number, number];
  name: string;
  trackUri: string;
  onPlay: (trackUri: string) => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, name, trackUri, onPlay }) => (
  <Marker position={position} eventHandlers={{ click: () => onPlay(trackUri) }}>
    <Popup>
      <b>{name}</b><br/>
      Click para reproducir
    </Popup>
  </Marker>
);

const MyMap: React.FC = () => {
  const bounds: [[number, number], [number, number]] = [[0, 0], [1960, 2940]];
  const playerRef = useRef<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = React.useState<string | null>(null);

  // Lista completa de marcadores con sus canciones
  const markers = [
    { position: [825, 325], name: 'Petalburg', trackUri: 'spotify:track:4jK3MCI7eGzzQmZtR3e3dc' },
    { position: [1180, 240], name: 'Rustboro', trackUri: 'spotify:track:6V8eKpLPw56CX9xN8Zgr0c' },
    { position: [703, 1031], name: 'Slateport', trackUri: 'spotify:track:5Xg62JOw5D1WV2gQGxrz5d' },
    { position: [1073, 995], name: 'Mauville', trackUri: 'spotify:track:3R83aSVkmS569nBxl0Wq3Z' },
    { position: [1629, 1570], name: 'South', trackUri: 'spotify:track:4DMAjYb300X3ewkkS0117f' },
    { position: [1498, 1730], name: 'LaRousse', trackUri: 'spotify:track:5hR4sFG6T5aETXTN5HXz0j' },
    { position: [1301, 1853], name: 'Lilycove', trackUri: 'spotify:track:6D8QyuZ0kvq9ZvDYnFwSE1' },
    { position: [983, 2160], name: 'Sootopolis', trackUri: 'spotify:track:6J9JB3h6sRwXDxE4YVVXRo' },
    { position: [1134, 2374], name: 'Mossdeep', trackUri: 'spotify:track:7vSNR4w34ZfXfpZJQdRZBh' },
    { position: [970, 2554], name: 'Purika', trackUri: 'spotify:track:5UqOw7QUg9QHd2x4Vrnj3V' },
    { position: [692, 2662], name: 'Evergrande', trackUri: 'spotify:track:5S2dqKoU2R8vSc5zn5Kq7k' }
  ];

  const centerPosition: [number, number] = [
    bounds[1][0] / 2,
    bounds[1][1] / 2
  ];

  const handlePlayTrack = useCallback(async (trackUri: string) => {
    if (!deviceId) {
      console.error('Reproductor no listo');
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer TU_TOKEN_AQUI`, // Reemplazar con token válido
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [trackUri] })
      });

      if (!response.ok) throw new Error('Error al reproducir');
    } catch (error) {
      console.error('Error:', error);
    }
  }, [deviceId]);

  useEffect(() => {
    const initializePlayer = () => {
      const token = 'TU_TOKEN_AQUI'; // Reemplazar con token válido
      
      playerRef.current = new window.Spotify.Player({
        name: 'Mapa Musical',
        getOAuthToken: (cb: (token: string) => void) => cb(token),
        volume: 0.5
      });

      playerRef.current.addListener('ready', ({ device_id }) => {
        console.log('Dispositivo listo:', device_id);
        setDeviceId(device_id);
      });

      playerRef.current.connect();
    };

    if (!window.Spotify) {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      initializePlayer();
    }

    return () => {
      playerRef.current?.disconnect();
    };
  }, []);

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
          position={marker.position as [number, number]}
          name={marker.name}
          trackUri={marker.trackUri}
          onPlay={handlePlayTrack}
        />
      ))}
    </MapContainer>
  );
};

export default MyMap;