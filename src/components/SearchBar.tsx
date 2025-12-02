import { useEffect, useState } from 'react';
import { useSearchStore } from '../store/searchStore';

export const SearchBar = () => {
  const { query, setQuery } = useSearchStore();
  const [local, setLocal] = useState(query);

  // Sync local state when global query changes externally (e.g., from clear button)
  useEffect(() => {
    setLocal(query);
  }, [query]);

  // Debounce local changes and update global query
  useEffect(() => {
    const timeout = setTimeout(() => setQuery(local), 400);
    return () => clearTimeout(timeout);
  }, [local, setQuery]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search characters by name..."
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {local && (
        <button
          onClick={() => setLocal('')}
          className="ml-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
};
