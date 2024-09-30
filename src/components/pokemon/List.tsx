import { PokemonListSchema } from "@/models/pokemon";
import getBase64 from "@/utils/getBase64";
import PokemonItem from "./Item";
import capitalizeFirstLetter from "@/utils/capitalize";

const TOTAL_GEN1_POKEMON = 151;

// The PokemonList component fetches and displays a list of Pokémon.
const PokemonList: React.FC<{ pageNumber: number }> = async ({ pageNumber }) => {
  const limit = 21;
  const offset = (pageNumber - 1) * limit;

  const response = await fetch("https://pokeapi.co/api/v2/generation/1/", {
    next: { revalidate: 60 }, // Revalidate cache every 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Generation 1 Pokémon.");
  }

  const data = await response.json();

  // Extract Pokémon species from the response
  const speciesList = data.pokemon_species;

  // Sort by ID
  speciesList.sort((a: any, b: any) => {
    const idA = parseInt(a.url.split("/")[6], 10);
    const idB = parseInt(b.url.split("/")[6], 10);
    return idA - idB;
  });

  // Calculate total pages for pagination
  const totalPages = Math.ceil(TOTAL_GEN1_POKEMON / limit);

  // Generate base64 placeholders on the server
  const pokemonWithBlur = await Promise.all(
    speciesList.slice(offset, offset + limit).map(async (pokemon: any) => {
      const id = pokemon.url.split("/")[6];
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      let blurDataURL = "";
      try {
        blurDataURL = await getBase64(imageUrl);
      } catch (error) {
        console.error(`Failed to generate blurDataURL for Pokémon ID ${id}:`, error);
      }

      return { ...pokemon, id, blurDataURL, name: capitalizeFirstLetter(pokemon.name) };
    })
  );

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {pokemonWithBlur.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
