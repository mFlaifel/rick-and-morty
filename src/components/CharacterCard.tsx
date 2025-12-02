import { Link } from 'react-router-dom';
import type { Character } from '../types';

export const CharacterCard = ({ character }: { character: Character }) => (
  <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
    <img src={character.image} width={160} />
    <h3>{character.name}</h3>
    <p>{character.species}</p>
    <Link to={`/character/${character.id}`}>View Details</Link>
  </div>
);
