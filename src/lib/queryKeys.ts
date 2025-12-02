/**
 * Centralized query key factory for TanStack Query
 * This ensures type-safe and consistent query keys across the application
 */
export const queryKeys = {
  characters: {
    all: ['characters'] as const,
    lists: () => [...queryKeys.characters.all, 'list'] as const,
    list: (page: number, name?: string) =>
      [...queryKeys.characters.lists(), page, name] as const,
    details: () => [...queryKeys.characters.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.characters.details(), id] as const,
  },
  episodes: {
    all: ['episodes'] as const,
    lists: () => [...queryKeys.episodes.all, 'list'] as const,
    list: (ids: string) => [...queryKeys.episodes.lists(), ids] as const,
  },
} as const;

