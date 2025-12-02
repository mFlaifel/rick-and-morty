import { useState } from 'react';
import { useSearchStore } from '../store/searchStore';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';

export const CharactersPage = () => {
  const { query } = useSearchStore();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useCharacters(page, query);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Characters</h1>
      <SearchBar />

      <div style={{ display: 'grid', gap: 12 }}>
        {data?.results.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          disabled={!data?.info.prev}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <button
          disabled={!data?.info.next}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
