import PokemonItem from "./Item";
import capitalizeFirstLetter from "@/utils/capitalize";
import placeholders from "../../../placeholders.json";
import { Pokemon } from "@/models/pokemon";

type PokemonWithBlur = Pokemon & {
  id: string;
  blurDataURL: string;
  name: string; // This is capitalized
};

// The PokemonList component fetches and displays a list of Pokémon.
async function PokemonList({ pageNumber }: { pageNumber: number }): Promise<JSX.Element> {
  const limit = 21;
  const offset = (pageNumber - 1) * limit;
  const placeholdersTyped = placeholders as { [key: string]: string };

  const response = await fetch("https://pokeapi.co/api/v2/generation/1/", {
    next: { revalidate: 60 }, // Revalidate cache every 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Generation 1 Pokémon.");
  }

  const data = await response.json();

  // Extract Pokémon species from the response
  const speciesList: Pokemon[] = data.pokemon_species;

  // Sort by ID
  speciesList.sort((a, b) => {
    const idA = parseInt(a.url.split("/")[6], 10);
    const idB = parseInt(b.url.split("/")[6], 10);
    return idA - idB;
  });

  // Map species to include additional properties
  const pokemonWithBlur: PokemonWithBlur[] = speciesList.slice(offset, offset + limit).map((pokemon) => {
    const id = pokemon.url.split("/")[6];
    const blurDataURL = placeholdersTyped[id] || "";

    return {
      ...pokemon,
      id,
      blurDataURL,
      name: capitalizeFirstLetter(pokemon.name),
    };
  });

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {pokemonWithBlur.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
