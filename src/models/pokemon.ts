import { z } from "zod";

/* 
Why Zod? 
Zod helped me catch errors quickly, especially with missing fields in the API response. For example, I discovered that only the "black-white" version in "generation-v" contains animated GIFs. By using Zod’s validation, I was able to identify missing fields and handle them with `.partial()` and `.nullable()`. This ensures the application doesn't break when the API lacks certain fields.
ZodError: [
  {
    "code": "invalid_type",
    "expected": "object",
    "received": "undefined",
    "path": [
      "sprites",
      "versions",
      "generation-iv",
      "diamond-pearl",
      "animated"
    ],
    "message": "Required"
  }
] */

// Basic Pokémon schema
export const PokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

// Pokémon list schema
export const PokemonListSchema = z.object({
  results: z.array(PokemonSchema),
});

// Detailed Pokémon schema
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    })
  ),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    })
  ),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    })
  ),
  sprites: z.object({
    other: z.object({
      "official-artwork": z.object({
        front_default: z.string().url().nullable(),
      }),
    }),
    versions: z
      .object({
        "generation-v": z.object({
          "black-white": z.object({
            animated: z.object({
              front_default: z.string().url().nullable(),
            }),
          }),
        }),
      })
      .partial(),
  }),
});

// Pokémon species schema for descriptions
export const PokemonSpeciesSchema = z.object({
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({
        name: z.string(),
      }),
    })
  ),
});

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
