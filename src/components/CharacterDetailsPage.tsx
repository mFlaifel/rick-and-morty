import { useParams, Link } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import { useEpisodesForCharacter } from '../hooks/useEpisodes';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorDisplay } from './common/ErrorDisplay';

export const CharacterDetailsPage = () => {
  const { id } = useParams();
  const characterId = Number(id);
  const {
    data: character,
    isLoading: isLoadingCharacter,
    isError: isCharacterError,
    error: characterError,
    refetch: refetchCharacter,
  } = useCharacter(characterId);
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    isError: isEpisodesError,
    error: episodesError,
    refetch: refetchEpisodes,
  } = useEpisodesForCharacter(character?.episode || []);

  if (isLoadingCharacter) {
    return (
      <div className="min-h-screen p-6">
        <LoadingSpinner message="Loading character details..." />
      </div>
    );
  }

  if (isCharacterError) {
    return (
      <div className="min-h-screen p-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Characters
        </Link>
        <ErrorDisplay
          error={characterError as Error}
          retry={() => refetchCharacter()}
          message="Failed to load character details. Please try again."
        />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen p-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Characters
        </Link>
        <ErrorDisplay
          error={null}
          message="Character not found."
        />
      </div>
    );
  }

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
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block font-medium"
      >
        ← Back to Characters
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">{character.name}</h1>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(
                  character.status
                )}`}
              >
                {character.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <span className="font-semibold text-gray-700">Species:</span>{' '}
                <span className="text-gray-600">{character.species}</span>
              </div>
              {character.type && (
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>{' '}
                  <span className="text-gray-600">{character.type}</span>
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-700">Gender:</span>{' '}
                <span className="text-gray-600">{character.gender}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Origin:</span>{' '}
                <span className="text-gray-600">{character.origin.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Location:</span>{' '}
                <span className="text-gray-600">{character.location.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Episodes</h3>
          {isLoadingEpisodes ? (
            <LoadingSpinner message="Loading episodes..." />
          ) : isEpisodesError ? (
            <ErrorDisplay
              error={episodesError as Error}
              retry={() => refetchEpisodes()}
              message="Failed to load episodes."
            />
          ) : episodes && episodes.length > 0 ? (
            <ul className="space-y-2">
              {episodes.map((ep) => (
                <li
                  key={ep.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-blue-600">{ep.episode}</span> —{' '}
                  <span className="text-gray-700">{ep.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({ep.air_date})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No episodes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
