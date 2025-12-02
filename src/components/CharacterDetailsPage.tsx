import { useParams, Link } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import { useEpisodesForCharacter } from '../hooks/useEpisodes';

export const CharacterDetailsPage = () => {
  const { id } = useParams();
  const { data: character, isLoading } = useCharacter(Number(id));
  const episodesQuery = useEpisodesForCharacter(character?.episode || []);

  if (isLoading || episodesQuery.isLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <Link to='/'>← Back</Link>
      <h1>{character?.name}</h1>

      <img src={character?.image} width={300} />

      <h3>Episodes:</h3>
      <ul>
        {episodesQuery.data?.map((ep) => (
          <li key={ep.id}>
            {ep.episode} — {ep.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
