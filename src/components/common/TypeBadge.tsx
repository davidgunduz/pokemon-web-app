/* components/common/TypeBadge.tsx */
import React from 'react';

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-600',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-blue-200',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-gray-600',
  ghost: 'bg-indigo-800',
  dark: 'bg-gray-800',
  dragon: 'bg-indigo-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

type TypeBadgeProps = {
  type: string;
};

export default function TypeBadge({ type }: TypeBadgeProps) {
  const colorClass = typeColors[type] || 'bg-gray-500';

  return (
    <span
      className={`text-white px-2 py-1 rounded ${colorClass} capitalize text-sm font-semibold`}
    >
      {type}
    </span>
  );
}
