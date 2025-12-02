import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/rmApi';
import type { Character } from '../types';

export const useCharacter = (id?: number) => {
  return useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id!),
    enabled: !!id,
  });
};
