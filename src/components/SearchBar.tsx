import { useEffect, useState } from 'react';
import { useSearchStore } from '../store/searchStore';

export const SearchBar = () => {
  const { query, setQuery } = useSearchStore();
  const [local, setLocal] = useState(query);
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Sync local state when global query changes externally (e.g., from clear button)
  useEffect(() => {
    setLocal(query);
  }, [query]);

  // Debounce local changes and update global query
  useEffect(() => {
    // Show debouncing indicator if local value differs from current query
    if (local !== query) {
      setIsDebouncing(true);
    }

    const timeout = setTimeout(() => {
      setQuery(local);
      setIsDebouncing(false);
    }, 400);

    return () => {
      clearTimeout(timeout);
      setIsDebouncing(false);
    };
    // Only depend on local - query changes are handled by the sync effect above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local, setQuery]);

  return (
    <div className='mb-6'>
      <div className='relative max-w-md'>
        <input
          type='text'
          placeholder='Search characters by name...'
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className='w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        {isDebouncing && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
          </div>
        )}
        {local && !isDebouncing && (
          <button
            onClick={() => setLocal('')}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            aria-label='Clear search'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
