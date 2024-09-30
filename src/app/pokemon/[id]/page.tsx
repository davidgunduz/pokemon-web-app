
import { PokemonDetailSchema, PokemonSpeciesSchema } from "@/models/pokemon";
import PokemonDetailPage from "./pokemonDetailPage";
import getBase64 from "@/utils/getBase64";

// Server-side data fetching for Pokémon details.
async function PokemonDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch Pokémon data
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

    // Extract the English description
    const descriptionEntry = parsedSpecies.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description =
      descriptionEntry?.flavor_text.replace(/\f/g, " ") || "No description available.";

    // Fetch weaknesses
    const weaknesses = await fetchWeaknesses(parsedPokemon.types);

    // Generate the blurDataURL
    const imageUrl = parsedPokemon?.sprites?.other["official-artwork"].front_default || "";
    let blurDataURL = "";
    try {
      blurDataURL = await getBase64(imageUrl);
    } catch (error) {
      console.error(`Failed to generate blurDataURL for image:`, error);
    }

    // Pass all the necessary data to the client component
    return (
      <PokemonDetailPage
        pokemon={parsedPokemon}
        description={description}
        weaknesses={weaknesses}
        blurDataURL={blurDataURL}
      />
    );
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

  // Fetch type data in parallel
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