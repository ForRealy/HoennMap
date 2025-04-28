# Hoenn Map

An interactive map of the Hoenn region from Pokémon, featuring real-time weather effects and Pokémon encounters.

## Features

- Interactive map of the Hoenn region
- Real-time weather effects with animations:
  - Rain and Heavy Rain
  - Sandstorm
  - Harsh Sunlight
  - Fog
  - Clear weather
- Pokémon encounters at each location
- Weather changes when clicking on locations
- Pokémon search functionality
- Thematic weather restrictions based on Pokémon lore

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key
- Internet connection (for PokeAPI access)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ForRealy/HoennMap.git
cd HoennMap
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will open in your default browser at `http://localhost:3000`.

## How to Use

### Map Navigation
- Use the mouse wheel to zoom in/out
- Click and drag to pan around the map
- Click on markers to change the weather

### Weather System
- Each location has specific possible weather conditions based on Pokémon lore
- Clicking a marker will randomly change the weather to one of the possible conditions
- Weather effects are animated and visible across the map

### Pokémon Features
- Each location has a chance to spawn a random Pokémon
- Use the search function to find specific Pokémon
- When a Pokémon is found, it will be displayed in a popup
- Pokémon data is fetched from the PokeAPI

## Weather Types

- **Clear**: Default weather condition
- **Rain**: Light rain with animated raindrops
- **Heavy Rain**: Intense rain with more raindrops
- **Sandstorm**: Animated sand particles moving across the screen
- **Harsh Sunlight**: Intense sunlight with impact lines and heat distortion
- **Fog**: Misty atmosphere with moving fog particles

## Location Types

- **Major Cities**: Red markers
- **Towns and Villages**: Yellow-green markers
- **Landmarks and Locations**: Blue markers

## Technical Details

- Built with React and TypeScript
- Uses Leaflet for map functionality
- OpenWeatherMap API for real weather data
- PokeAPI for Pokémon data and sprites
- Custom weather animations using CSS
- Responsive design for different screen sizes

## APIs Used

### PokeAPI
- Used for fetching Pokémon data
- Provides Pokémon sprites, names, and other information
- No API key required
- Rate limited to 100 requests per minute

### OpenWeatherMap API
- Used for real weather data
- Requires API key
- Provides temperature, humidity, and wind data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pokémon and Hoenn region are properties of Nintendo/Game Freak
- Map data and locations based on Pokémon Ruby/Sapphire/Emerald
- Weather effects inspired by in-game weather mechanics
- PokeAPI for providing Pokémon data
- OpenWeatherMap for weather data
