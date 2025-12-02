import { useEffect, useState } from 'react';
import { useSearchStore } from '../store/searchStore';

export const SearchBar = () => {
  const { query, setQuery } = useSearchStore();
  const [local, setLocal] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => setQuery(local), 400);
    return () => clearTimeout(timeout);
  }, [local, setQuery]);

  return (
    <input
      placeholder='Search characters...'
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      style={{ padding: '8px', width: '300px' }}
    />
  );
};
