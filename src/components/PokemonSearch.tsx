import React, { useState } from 'react';
import { searchPokemon } from '../services/pokemonService';
import { locationConfig } from '../config/locationConfig';

interface PokemonSearchProps {
  onPokemonFound: (pokemon: { name: string; sprite: string; id: number }, location: string) => void;
  onError: (message: string) => void;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ onPokemonFound, onError }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const pokemon = await searchPokemon(searchQuery);
    if (pokemon) {
      // Select a random location from the config
      const randomLocation = locationConfig[Math.floor(Math.random() * locationConfig.length)];
      onPokemonFound(pokemon, randomLocation.name);
    } else {
      onError(`No se encontró el Pokémon: ${searchQuery}`);
    }
  };

  return (
    <div className="pokemon-search">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default PokemonSearch; 