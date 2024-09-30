
import { PokemonDetailSchema, PokemonSpeciesSchema } from "@/models/pokemon";
import PokemonDetailPage from "./pokemonDetailPage";
import placeholders from "../../../../placeholders.json";

// Server-side data fetching for Pokémon details.
async function PokemonDetail({ params }: { params: { id: string } }) {
  const placeholdersTyped: { [key: string]: string } = placeholders;

  const { id } = params;

  try {
    // Fetch Pokémon data with caching enabled (revalidate every 60 seconds)
    const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 60 },
    });
    if (!resPokemon.ok) {
      throw new Error("Failed to fetch Pokémon data.");
    }
    const pokemonData = await resPokemon.json();
    const parsedPokemon = PokemonDetailSchema.parse(pokemonData);

    // Fetch species data for description
    const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
      next: { revalidate: 60 },
    });
    if (!resSpecies.ok) {
      throw new Error("Failed to fetch Pokémon species data.");
    }
    const speciesData = await resSpecies.json();
    const parsedSpecies = PokemonSpeciesSchema.parse(speciesData);

    // Extract the English description, replacing special characters
    const descriptionEntry = parsedSpecies.flavor_text_entries.find((entry) => entry.language.name === "en");
    const description = descriptionEntry?.flavor_text.replace(/\f/g, " ") || "No description available.";

    // Fetch weaknesses based on Pokémon types
    const weaknesses = await fetchWeaknesses(parsedPokemon.types);

    // Get the pre-generated blurDataURL for the Pokémon image
    const pokemonId = parsedPokemon.id.toString();
    const blurDataURL = placeholdersTyped[pokemonId] || "";

    // Pass all the necessary data to the client component
    return <PokemonDetailPage pokemon={parsedPokemon} description={description} weaknesses={weaknesses} blurDataURL={blurDataURL} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Error Loading Pokémon Details</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}

// Helper function to fetch weaknesses
async function fetchWeaknesses(types: { type: { name: string; url: string } }[]) {
  const weaknessesSet = new Set<string>();

  // Fetch type data in parallel for efficiency
  const typePromises = types.map(({ type }) =>
    fetch(type.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch type data for ${type.name}`);
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      })
  );

  const typeDataArray = await Promise.all(typePromises);

  // Collect weaknesses from type data
  typeDataArray.forEach((typeData) => {
    if (typeData) {
      typeData.damage_relations.double_damage_from.forEach((weakType: { name: string }) => {
        weaknessesSet.add(weakType.name);
      });
    }
  });

  return Array.from(weaknessesSet);
}
export default PokemonDetail;