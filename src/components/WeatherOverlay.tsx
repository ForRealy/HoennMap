import React from 'react';
import { useMap } from 'react-leaflet';
import { HoennWeather } from '../services/weatherService';

interface WeatherOverlayProps {
  weather: HoennWeather;
}

const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ weather }) => {
  const map = useMap();

  React.useEffect(() => {
    // Remove any existing weather overlay
    const existingOverlay = document.querySelector('.weather-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Create new weather overlay
    const overlay = document.createElement('div');
    overlay.className = `weather-overlay weather-${weather}`;
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1000';

    // Add weather-specific styles
    switch (weather) {
      case 'rain':
        overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 255, 0.1))';
        overlay.style.animation = 'rain 0.5s linear infinite';
        break;
      case 'heavy-rain':
        overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 255, 0.2))';
        overlay.style.animation = 'rain 0.3s linear infinite';
        break;
      case 'sandstorm':
        overlay.style.background = 'linear-gradient(transparent, rgba(194, 178, 128, 0.2))';
        overlay.style.animation = 'sandstorm 1s linear infinite';
        break;
      case 'harsh-sunlight':
        overlay.style.background = 'radial-gradient(circle, rgba(255, 255, 0, 0.1), transparent)';
        break;
      case 'fog':
        overlay.style.background = 'linear-gradient(transparent, rgba(255, 255, 255, 0.3))';
        break;
      default:
        // Clear weather - no overlay needed
        break;
    }

    // Add the overlay to the map container
    const mapContainer = map.getContainer();
    mapContainer.appendChild(overlay);

    // Create weather status indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'weather-status';
    statusIndicator.style.position = 'absolute';
    statusIndicator.style.top = '10px';
    statusIndicator.style.right = '10px';
    statusIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    statusIndicator.style.color = 'white';
    statusIndicator.style.padding = '5px 10px';
    statusIndicator.style.borderRadius = '5px';
    statusIndicator.style.zIndex = '1001';
    statusIndicator.style.fontSize = '14px';
    statusIndicator.style.fontFamily = 'Arial, sans-serif';
    statusIndicator.textContent = `Weather: ${weather.replace('-', ' ').toUpperCase()}`;
    mapContainer.appendChild(statusIndicator);

    // Cleanup
    return () => {
      overlay.remove();
      statusIndicator.remove();
    };
  }, [weather, map]);

  return null;
};

export default WeatherOverlay; 