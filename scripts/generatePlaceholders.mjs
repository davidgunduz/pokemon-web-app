// Purpose: Pre-fetches all required images and generates their base64 placeholders before the application runs.
// Usage: Run as a standalone script to create a placeholders.json file containing all base64 placeholders.
// Performance benefit: Since placeholders are generated ahead of time, the application can load them instantly, improving performance.
// I had to convert from .ts to .mjs extension to ensure compatibility with ES Modules and resolve import issues...

import fs from 'fs';
import fetch from 'node-fetch';
import { getPlaiceholder } from 'plaiceholder';

async function generatePlaceholders() {
  const placeholders = {};

  // Loop through Pokémon IDs 1 to 151 to fetch their images
  for (let id = 1; id <= 151; id++) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image for Pokémon ID ${id}: ${response.statusText}`);
      }

      // Fetch the image as a buffer
      const buffer = await response.buffer();

      // Generate the placeholder using plaiceholder
      const { base64 } = await getPlaiceholder(buffer);

      // Assign the base64 string to the corresponding ID
      placeholders[id] = base64;

      console.log(`Generated placeholder for Pokémon ID ${id}`);
    } catch (error) {
      console.error(`Error generating placeholder for Pokémon ID ${id}:`, error.message);
    }
  }

  // Write the placeholders object to a JSON file with pretty formatting
  fs.writeFileSync('placeholders.json', JSON.stringify(placeholders, null, 2));

  console.log('Placeholders generation completed.');
}

// Invoke the function
generatePlaceholders().catch((error) => {
  console.error('Unexpected error during placeholder generation:', error);
});


import fs from 'fs';
import fetch from 'node-fetch';
import { getPlaiceholder } from 'plaiceholder';


async function generatePlaceholders() {
  const placeholders = {};


  for (let id = 1; id <= 151; id++) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image for Pokémon ID ${id}: ${response.statusText}`);
      }

      // Fetch the image as a buffer
      const buffer = await response.buffer();

      // Generate the placeholder using plaiceholder
      const { base64 } = await getPlaiceholder(buffer);

      // Assign the base64 string to the corresponding ID
      placeholders[id] = base64;

      console.log(`Generated placeholder for Pokémon ID ${id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error generating placeholder for Pokémon ID ${id}:`, error.message);
      } else {
        console.error(`Unknown error generating placeholder for Pokémon ID ${id}:`, error);
      }
    }
  }

  // Write the placeholders object to a JSON file with pretty formatting
  fs.writeFileSync('placeholders.json', JSON.stringify(placeholders, null, 2));

  console.log('Placeholders generation completed.');
}

// Invoke the function
generatePlaceholders().catch((error) => {
  console.error('Unexpected error during placeholder generation:', error);
});
