type ErrorDisplayProps = {
  error: Error | null;
  retry?: () => void;
  message?: string;
};

export const ErrorDisplay = ({ error, retry, message }: ErrorDisplayProps) => {
  const errorMessage = message || error?.message || 'Something went wrong. Please try again.';

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-600 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
      <p className="text-gray-600 mb-4">{errorMessage}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

