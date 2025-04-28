import React from 'react';
import { useMap } from 'react-leaflet';
import { HoennWeather } from '../services/weatherService';

interface WeatherOverlayProps {
  weather: HoennWeather;
}

const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ weather }) => {
  const map = useMap();

  const getWeatherIcon = (weather: HoennWeather) => {
    switch (weather) {
      case 'rain':
        return '🌧️';
      case 'heavy-rain':
        return '⛈️';
      case 'sandstorm':
        return '🏜️';
      case 'harsh-sunlight':
        return '☀️';
      case 'fog':
        return '🌫️';
      default:
        return '☀️'; // Clear weather
    }
  };

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
        // Add raindrop elements
        for (let i = 0; i < 50; i++) {
          const raindrop = document.createElement('div');
          raindrop.className = 'raindrop';
          raindrop.style.position = 'absolute';
          raindrop.style.width = '2px';
          raindrop.style.height = '20px';
          raindrop.style.background = 'rgba(0, 0, 255, 0.3)';
          raindrop.style.left = `${Math.random() * 100}%`;
          raindrop.style.top = `${Math.random() * 100}%`;
          raindrop.style.animation = `raindrop ${0.5 + Math.random() * 0.5}s linear infinite`;
          overlay.appendChild(raindrop);
        }
        break;

      case 'heavy-rain':
        overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 255, 0.2))';
        overlay.style.animation = 'rain 0.3s linear infinite';
        // Add more intense raindrops
        for (let i = 0; i < 100; i++) {
          const raindrop = document.createElement('div');
          raindrop.className = 'raindrop';
          raindrop.style.position = 'absolute';
          raindrop.style.width = '3px';
          raindrop.style.height = '25px';
          raindrop.style.background = 'rgba(0, 0, 255, 0.4)';
          raindrop.style.left = `${Math.random() * 100}%`;
          raindrop.style.top = `${Math.random() * 100}%`;
          raindrop.style.animation = `raindrop ${0.3 + Math.random() * 0.3}s linear infinite`;
          overlay.appendChild(raindrop);
        }
        break;

      case 'sandstorm':
        overlay.style.background = 'linear-gradient(transparent, rgba(194, 178, 128, 0.2))';
        // Add sand particles
        for (let i = 0; i < 200; i++) {
          const sand = document.createElement('div');
          sand.className = 'sand-particle';
          sand.style.position = 'absolute';
          sand.style.width = '3px';
          sand.style.height = '3px';
          sand.style.background = 'rgba(194, 178, 128, 0.6)';
          sand.style.borderRadius = '50%';
          sand.style.left = `${Math.random() * 100}%`;
          sand.style.top = `${Math.random() * 100}%`;
          sand.style.animation = `sandstorm ${1 + Math.random() * 2}s linear infinite`;
          overlay.appendChild(sand);
        }
        break;

      case 'harsh-sunlight':
        // Create sun rays effect
        const sunRays = document.createElement('div');
        sunRays.style.position = 'absolute';
        sunRays.style.top = '0';
        sunRays.style.left = '0';
        sunRays.style.width = '100%';
        sunRays.style.height = '100%';
        sunRays.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.2), transparent 70%)';
        sunRays.style.animation = 'pulse 2s ease-in-out infinite';
        overlay.appendChild(sunRays);

        // Add impact lines
        for (let i = 0; i < 8; i++) {
          const impactLine = document.createElement('div');
          impactLine.className = 'impact-line';
          impactLine.style.position = 'absolute';
          impactLine.style.top = '0';
          impactLine.style.left = '0';
          impactLine.style.width = '100%';
          impactLine.style.height = '100%';
          impactLine.style.background = 'linear-gradient(45deg, transparent 45%, rgba(255, 255, 0, 0.3) 50%, transparent 55%)';
          impactLine.style.transform = `rotate(${i * 45}deg)`;
          impactLine.style.animation = `impactLine ${3 + i * 0.5}s linear infinite`;
          overlay.appendChild(impactLine);
        }

        // Add heat distortion effect
        const heatDistortion = document.createElement('div');
        heatDistortion.style.position = 'absolute';
        heatDistortion.style.top = '0';
        heatDistortion.style.left = '0';
        heatDistortion.style.width = '100%';
        heatDistortion.style.height = '100%';
        heatDistortion.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.1), transparent 70%)';
        heatDistortion.style.animation = 'heatDistortion 2s ease-in-out infinite';
        overlay.appendChild(heatDistortion);
        break;

      case 'fog':
        // Create fog particles
        for (let i = 0; i < 100; i++) {
          const fogParticle = document.createElement('div');
          fogParticle.className = 'fog-particle';
          fogParticle.style.position = 'absolute';
          fogParticle.style.width = `${20 + Math.random() * 30}px`;
          fogParticle.style.height = `${20 + Math.random() * 30}px`;
          fogParticle.style.background = 'rgba(128, 128, 128, 0.2)';
          fogParticle.style.borderRadius = '50%';
          fogParticle.style.left = `${Math.random() * 100}%`;
          fogParticle.style.top = `${Math.random() * 100}%`;
          fogParticle.style.animation = `fog ${3 + Math.random() * 5}s linear infinite`;
          overlay.appendChild(fogParticle);
        }
        break;

      default:
        // Clear weather - no overlay needed
        break;
    }

    // Add the overlay to the map container
    const mapContainer = map.getContainer();
    mapContainer.appendChild(overlay);

    // Create weather status indicator with icon
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
    statusIndicator.style.fontSize = '20px';
    statusIndicator.style.fontFamily = 'Arial, sans-serif';
    statusIndicator.style.display = 'flex';
    statusIndicator.style.alignItems = 'center';
    statusIndicator.style.gap = '5px';
    statusIndicator.innerHTML = `${getWeatherIcon(weather)}`;
    mapContainer.appendChild(statusIndicator);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes raindrop {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      @keyframes sandstorm {
        0% { transform: translateX(-100%) translateY(-100%); }
        100% { transform: translateX(100vw) translateY(100vh); }
      }
      @keyframes pulse {
        0% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0.5; transform: scale(1); }
      }
      @keyframes fog {
        0% { transform: translateX(-100%); opacity: 0.2; }
        50% { opacity: 0.4; }
        100% { transform: translateX(100vw); opacity: 0.2; }
      }
      @keyframes impactLine {
        0% { transform: rotate(var(--rotation)) translateX(-100%); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: rotate(var(--rotation)) translateX(100vw); opacity: 0; }
      }
      @keyframes heatDistortion {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      overlay.remove();
      statusIndicator.remove();
      style.remove();
    };
  }, [weather, map]);

  return null;
};

export default WeatherOverlay; 