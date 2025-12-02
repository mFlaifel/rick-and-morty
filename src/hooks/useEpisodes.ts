import { useQuery } from '@tanstack/react-query';
import { fetchEpisodesByIds } from '../api/rmApi';
import { queryKeys } from '../lib/queryKeys';
import type { Episode } from '../types';

export const useEpisodesForCharacter = (episodeUrls: string[] = []) => {
  const ids = episodeUrls.map((url) => Number(url.split('/').pop()));

  return useQuery<Episode[]>({
    queryKey: queryKeys.episodes.list(ids.join(',')),
    queryFn: async () => {
      const result = await fetchEpisodesByIds(ids);
      // API returns array if multiple IDs, single object if one ID
      return Array.isArray(result) ? result : [result];
    },
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes (episodes don't change often)
  });
};
