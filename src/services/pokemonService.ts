import axios from 'axios';

export const getRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    return {
      name: response.data.name,
      sprite: response.data.sprites.other['official-artwork'].front_default,
      id: randomId
    };
  } catch (error) {
    console.error('Error fetching random Pokémon:', error);
    return null;
  }
};

export const searchPokemon = async (query: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    return {
      name: response.data.name,
      sprite: response.data.sprites.other['official-artwork'].front_default,
      id: response.data.id
    };
  } catch (error) {
    console.error('Error searching Pokémon:', error);
    return null;
  }
}; 