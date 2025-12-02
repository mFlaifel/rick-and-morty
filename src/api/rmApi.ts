import axios from 'axios';

const API_BASE = 'https://rickandmortyapi.com/api';

export const rmApi = axios.create({
  baseURL: API_BASE,
});

type FetchCharactersParams = {
  page?: number;
  name?: string;
};

export const fetchCharacters = async (page = 1, name?: string) => {
  const params: FetchCharactersParams = { page };
  if (name) params.name = name;

  try {
    const { data } = await rmApi.get('/character', { params });
    return data;
  } catch (error: any) {
    // Handle API errors - Rick and Morty API returns 404 when no results found
    if (error.response?.status === 404) {
      // Return empty results structure instead of throwing
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    // Re-throw other errors
    throw error;
  }
};

export const fetchCharacterById = async (id: number) => {
  const { data } = await rmApi.get(`/character/${id}`);
  return data;
};

export const fetchEpisodesByIds = async (ids: number[] | number) => {
  const idsPath = Array.isArray(ids) ? ids.join(',') : ids;
  const { data } = await rmApi.get(`/episode/${idsPath}`);
  return data;
};
