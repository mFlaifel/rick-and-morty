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

  const { data } = await rmApi.get('/character', { params });
  return data;
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
