import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCharacters } from '../api/rmApi';
import { queryKeys } from '../lib/queryKeys';
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
    queryKey: queryKeys.characters.list(page, name),
    queryFn: () => fetchCharacters(page, name),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
