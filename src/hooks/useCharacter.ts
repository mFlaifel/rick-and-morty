import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/rmApi';
import { queryKeys } from '../lib/queryKeys';
import type { Character } from '../types';

export const useCharacter = (id?: number) => {
  return useQuery<Character>({
    queryKey: queryKeys.characters.detail(id!),
    queryFn: () => {
      if (!id) throw new Error('Character ID is required');
      return fetchCharacterById(id);
    },
    enabled: !!id,
  });
};
