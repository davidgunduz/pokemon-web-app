import React from 'react';

type LoadMoreProps = {
  onLoadMore: (limit: number) => void;
  isLoading: boolean;
  remainingPokemon: number;
};

const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore, isLoading, remainingPokemon }) => {
  let options = [10, 50, 100];

  // Filter options based on the remaining Pokémon
  options = options.filter(option => option <= remainingPokemon);

  // Always include the option to load all remaining Pokémon
  if (remainingPokemon > 0 && !options.includes(remainingPokemon)) {
    options.push(remainingPokemon);
  }

  return (
    <div className="flex gap-4">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onLoadMore(option)}
          disabled={isLoading}
          className="px-4 py-2 bg-sky-200 rounded hover:bg-sky-300"
        >
          {isLoading ? 'Loading...' : `Load ${option === remainingPokemon ? 'All' : option}`}
        </button>
      ))}
    </div>
  );
};

export default LoadMore;
