import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/rmApi';
import type { Character } from '../types';

type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export const useCharacters = (page = 1, name?: string) => {
  return useQuery<CharactersResponse>({
    queryKey: ['characters', page, name],
    queryFn: () => fetchCharacters(page, name),
  });
};
