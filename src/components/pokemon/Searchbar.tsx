"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import capitalizeFirstLetter from "@/utils/capitalize";
import { Pokemon } from "@/models/pokemon";

function PokemonSearchBar(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // Track the active suggestion
  const router = useRouter();

  useEffect(() => {
    // Fetch Generation 1 Pokémon when the component mounts
    const fetchGen1Pokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/generation/1/");
      if (!response.ok) {
        console.error("Failed to fetch Generation 1 Pokémon for search.");
        return;
      }
      const data = await response.json();
      const speciesList: Pokemon[] = data.pokemon_species;

      // Sort and map the species list
      const sortedPokemon: Pokemon[] = speciesList
        .sort((a, b) => {
          const idA = parseInt(a.url.split("/")[6], 10);
          const idB = parseInt(b.url.split("/")[6], 10);
          return idA - idB;
        })
        .map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
          id: pokemon.url.split("/")[6],
        }));

      setAllPokemon(sortedPokemon);
    };

    fetchGen1Pokemon();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(value));
      setSuggestions(filteredSuggestions.slice(0, 10)); // Limit to 10 suggestions
      setActiveSuggestionIndex(-1); // Reset active suggestion index when input changes
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (pokemon: Pokemon) => {
    setSearchTerm("");
    setSuggestions([]);
    setActiveSuggestionIndex(-1); // Reset active suggestion index after selection
    router.push(`/pokemon/${pokemon.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      handleSelect(suggestions[activeSuggestionIndex]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon..."
        className="w-full px-4 py-2 border placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border dark:bg-slate-900 border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((pokemon, index) => (
            <li
              key={pokemon.id}
              onClick={() => handleSelect(pokemon)}
              className={`px-4 py-2 cursor-pointer ${index === activeSuggestionIndex ? "bg-sky-100 dark:bg-slate-600" : "hover:bg-gray-100 dark:hover:bg-slate-500"}`}
            >
              {capitalizeFirstLetter(pokemon.name)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonSearchBar;
