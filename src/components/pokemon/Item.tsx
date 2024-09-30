'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Ripple from '../common/Ripple';

type PokemonWithBlur = {
  name: string;
  url: string;
  id: string;
  blurDataURL: string;
};

interface PokemonItemProps {
  pokemon: PokemonWithBlur;
}

function PokemonItem({ pokemon }: PokemonItemProps) {
  const { id, name } = pokemon;

  if (!id) {
    console.error(`PokemonItem: id is undefined for pokemon ${name}`);
    return null;
  }

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="relative overflow-hidden rounded-xl border-4 border-sky-200 hover:border-sky-300 hover:bg-sky-100 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-900 cursor-pointer">
        <Ripple />
        <div className="pt-2 text-center text-2xl font-semibold">
          #{id} {name}
        </div>
        <Image
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          loading="lazy"
          width={300}
          height={300}

        />
      </div>
    </Link>
  );
}
export default PokemonItem;