import { useQuery } from '@tanstack/react-query';
import { fetchEpisodesByIds } from '../api/rmApi';
import type { Episode } from '../types';

export const useEpisodesForCharacter = (episodeUrls: string[] = []) => {
  const ids = episodeUrls.map((url) => Number(url.split('/').pop()));

  return useQuery<Episode[]>({
    queryKey: ['episodes', ids.join(',')],
    queryFn: async () => {
      const result = await fetchEpisodesByIds(ids);
      // API returns array if multiple IDs, single object if one ID
      return Array.isArray(result) ? result : [result];
    },
    enabled: ids.length > 0,
  });
};
