"use client";

import React, { useState } from "react";
import PokemonImage from "@/components/pokemon/Image";
import TypeBadge from "@/components/common/TypeBadge";
import Abilities from "@/components/pokemon/Abilities";
import StatsChart from "@/components/pokemon/StatsChart";
import Weaknesses from "@/components/pokemon/Weaknesses";
import { PokemonDetail } from "@/models/pokemon";
import { useRouter } from "next/navigation";

type PokemonDetailProps = {
  pokemon: PokemonDetail;
  description: string;
  weaknesses: string[];
  blurDataURL: string;
};

const PokemonDetailPage: React.FC<PokemonDetailProps> = ({ pokemon, description, weaknesses, blurDataURL }) => {
  const [showGif, setShowGif] = useState(false);
  const router = useRouter();

  const { id, name, sprites, height, weight, abilities, types, stats } = pokemon;

  // GIF URL from the sprites
  const gifUrl = sprites?.versions?.["generation-v"]?.["black-white"].animated.front_default || "";

  // Static image URL
  const staticImageUrl = sprites.other["official-artwork"].front_default || "";

  // Handle image toggle
  const handleToggleImage = () => {
    setShowGif(!showGif);
  };

  // Handle navigation to previous/next Pokémon
  const handleNavigate = (newId: number) => {
    router.push(`/pokemon/${newId}`);
  };

  // Calculate previous and next IDs (ensure they are within 1 and 151)
  const prevId = id > 1 ? id - 1 : 151;
  const nextId = id < 151 ? id + 1 : 1;

  return (
    <main className="max-w-4xl mx-auto mt-8 p-4" role="main">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8" aria-labelledby="pokemon-details-heading">
        <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            className="text-blue-500 text-lg sm:text-base px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-100 hover:text-blue-700"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
          <h1 id="pokemon-details-heading" className="text-3xl sm:text-4xl font-extrabold capitalize tracking-wide text-gray-900 dark:text-gray-100 text-center sm:text-left">
            {name}
          </h1>
          <div className="flex gap-4">
            <button
              className="text-blue-500 text-lg sm:text-base px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-100 hover:text-blue-700"
              onClick={() => handleNavigate(prevId)}
            >
              &lt; Prev
            </button>
            <button
              className="text-blue-500 text-lg sm:text-base px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-100 hover:text-blue-700"
              onClick={() => handleNavigate(nextId)}
            >
              Next &gt;
            </button>
          </div>
        </header>

        <section className="flex flex-col md:flex-row mt-6 space-y-6 md:space-y-0 md:space-x-6" aria-labelledby="pokemon-overview">
          {/* Left Column */}
          <div className="md:w-1/3 text-center md:text-left">
            <div className="relative">
              <PokemonImage
                src={showGif && gifUrl ? gifUrl : staticImageUrl}
                alt={`Image of ${name}`}
                blurDataURL={blurDataURL}
                className="transition-transform duration-300 hover:scale-105 z-50"
                unoptimized={true}
              />

              {gifUrl && (
                <button
                  onClick={handleToggleImage}
                  className="absolute right-0 dark:text-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Toggle GIF"
                >
                  {showGif ? "Show Image" : "Show GIF"}
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-start md:justify-start gap-2 mt-6" aria-label="Pokemon Types">
              {types.map(({ type }) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
            </div>
            <section className="mt-4" aria-labelledby="pokemon-description">
              <h2 id="pokemon-description" className="sr-only">
                Description
              </h2>
              <p className="dark:text-gray-300 text-md font-medium text-left">{description}</p>
            </section>
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 md:pl-10">
            <section className="mt-6" aria-labelledby="height-weight">
              <h2 id="height-weight" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Height & Weight
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Height: {height / 10} m, Weight: {weight / 10} kg
              </p>
            </section>

            <section className="mt-8" aria-labelledby="base-stats">
              <h2 id="base-stats" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Base Stats
              </h2>
              <StatsChart stats={stats} />
            </section>

            <section className="mt-8" aria-labelledby="abilities">
              <h2 id="abilities" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Abilities
              </h2>
              <Abilities abilities={abilities} />
            </section>

            <section className="mt-8" aria-labelledby="weaknesses">
              <div className="mt-2 flex flex-wrap gap-2">
                <Weaknesses weaknesses={weaknesses} />
              </div>
            </section>
          </div>
        </section>
      </article>
    </main>
  );
};

export default PokemonDetailPage;
