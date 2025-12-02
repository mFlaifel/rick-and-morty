import { useState, useEffect, useRef, startTransition } from 'react';
import { useSearchStore } from '../store/searchStore';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorDisplay } from './common/ErrorDisplay';
import { EmptyState } from './common/EmptyState';

export const CharactersPage = () => {
  const { query, setQuery } = useSearchStore();
  const [page, setPage] = useState(1);
  const prevQueryRef = useRef(query);

  const { data, isLoading, isError, error, refetch } = useCharacters(
    page,
    query
  );

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (prevQueryRef.current !== query) {
      prevQueryRef.current = query;
      if (page !== 1) {
        startTransition(() => {
          setPage(1);
        });
      }
    }
  }, [query, page]);

  if (isLoading) {
    return (
      <div className='min-h-screen p-6'>
        <h1 className='text-3xl font-bold mb-6'>Characters</h1>
        <SearchBar />
        <LoadingSpinner message='Loading characters...' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen p-6'>
        <h1 className='text-3xl font-bold mb-6'>Characters</h1>
        <SearchBar />
        <ErrorDisplay error={error as Error} retry={() => refetch()} />
      </div>
    );
  }

  const hasResults = data?.results && data.results.length > 0;

  return (
    <div className='min-h-screen p-6 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Characters</h1>
      <SearchBar />

      {hasResults ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6'>
            {data.results.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>

          <div className='flex items-center justify-between mt-8'>
            <button
              disabled={!data?.info.prev}
              onClick={() => setPage((p) => p - 1)}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
            >
              Previous
            </button>
            <span className='text-gray-600'>
              Page {page} of {data?.info.pages || 0}
            </span>
            <button
              disabled={!data?.info.next}
              onClick={() => setPage((p) => p + 1)}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <EmptyState
          title='No characters found'
          message={
            query
              ? `No characters match "${query}". Try a different search term.`
              : 'No characters available.'
          }
          action={
            query
              ? { label: 'Clear Search', onClick: () => setQuery('') }
              : undefined
          }
        />
      )}
    </div>
  );
};
