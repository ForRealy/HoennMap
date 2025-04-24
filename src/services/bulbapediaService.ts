import axios from 'axios';

interface BulbapediaData {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
}

export const fetchBulbapediaData = async (locationName: string): Promise<BulbapediaData | null> => {
  try {
    // Format the location name for Bulbapedia
    const formattedName = locationName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('_');

    // Use Wikipedia API to fetch Bulbapedia data
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        prop: 'extracts|pageimages',
        exintro: true,
        explaintext: true,
        piprop: 'thumbnail',
        pithumbsize: 200,
        titles: `${formattedName}_(Pokémon)`,
        format: 'json',
        origin: '*'
      }
    });

    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId === '-1') {
      return null;
    }

    return {
      title: pages[pageId].title,
      extract: pages[pageId].extract,
      thumbnail: pages[pageId].thumbnail
    };
  } catch (error) {
    console.error('Error fetching Bulbapedia data:', error);
    return null;
  }
}; 