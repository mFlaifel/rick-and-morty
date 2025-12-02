import { Link } from 'react-router-dom';
import type { Character } from '../types';

export const CharacterCard = ({ character }: { character: Character }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {character.name}
          </h3>
          <span
            className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}
            title={character.status}
          />
        </div>
        <p className="text-sm text-gray-600 mb-3">{character.species}</p>
        <Link
          to={`/character/${character.id}`}
          className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
