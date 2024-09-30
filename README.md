# Pokémon Web App

A web application that displays information about Generation 1 Pokémon, including details, images, abilities, stats, and weaknesses. The app provides a smooth user experience with pre-generated image placeholders, caching strategies, and a clean UI.

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Caching Strategy](#caching-strategy)
-   [Pre-generated Placeholders](#pre-generated-placeholders)
-   [Data Validation with Zod](#data-validation-with-zod)
-   [Components Overview](#components-overview)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Display a list of Generation 1 Pokémon with pagination.
-   View detailed information about each Pokémon, including:
    -   Images (static and animated GIFs).
    -   Types, abilities, stats, and weaknesses.
    -   Descriptions from the Pokémon species data.
-   Search functionality to find Pokémon by name.
-   Dark and light theme support.
-   Responsive design for various screen sizes.
-   Optimized image loading with pre-generated placeholders.
-   Caching of API requests to improve performance.

## Technologies Used

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **React**: JavaScript library for building user interfaces.
-   **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **Zod**: TypeScript-first schema validation library.
-   **Plaiceholder**: Library for generating low-quality image placeholders.
-   **Node Fetch**: A light-weight module that brings `window.fetch` to Node.js.

## Installation

1.  **Clone the repository:** `git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name` 
    
2.  **Install dependencies:** `npm install` 
    
3.  **Generate image placeholders:** `npm run generate-placeholders` 
    
    This script fetches images for the first 151 Pokémon and generates base64 placeholders, saving them to `placeholders.json`.
    
4.  **Run the development server:** `npm run dev` 
    
    Open [http://localhost:3000](http://localhost:3000) to view the app.
    

## Usage

-   **Browse Pokémon:**
    -   Use the pagination controls at the bottom to navigate through the list of Pokémon.
-   **View Details:**
    -   Click on a Pokémon to view detailed information.
    -   Toggle between the static image and animated GIF if available.
-   **Search Pokémon:**
    -   Use the search bar to find Pokémon by name.
    -   Navigate to a Pokémon's detail page by selecting it from the suggestions.

## Caching Strategy

The app uses Next.js's built-in caching mechanisms to improve performance:

-   **Server-side Caching:**
    
    -   API responses from the Pokémon API are cached using the `revalidate` option in `fetch` requests.
    -   Data is revalidated every 60 seconds, reducing the number of API calls.
    
    ``const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 60 },
    });`` 
    
-   **Client-side Caching:**
    
    -   Since server-side caching is sufficient for this app, additional client-side caching mechanisms were deemed unnecessary.

## Pre-generated Placeholders

-   **Why Pre-generate Placeholders:**
    
    -   Generating image placeholders at runtime can be computationally expensive and slow.
    -   Pre-generating placeholders improves initial load times and overall performance.
-   **How It Works:**
    
    -   The `generatePlaceholders.mjs` script fetches Pokémon images and generates base64 placeholders using `plaiceholder`.
    -   Placeholders are stored in `placeholders.json`.
    -   The app uses these placeholders when rendering images to provide a smooth loading experience.
-   **Regenerating Placeholders:**
    
    -   If you update images or add new ones, run `npm run generate-placeholders` to regenerate the placeholders.

## Data Validation with Zod

-   **Purpose:**
    
    -   Zod is used to define schemas and validate data fetched from the Pokémon API.
    -   It helps catch errors due to missing or unexpected fields in the API responses.
-   **Example:**
    
``export const PokemonDetailSchema = z.object({ id: z.number(), name: z.string(), // ... other fields ... }); const parsedPokemon = PokemonDetailSchema.parse(pokemonData);``

``const parsedPokemon = PokemonDetailSchema.parse(pokemonData);``

    
-   **Benefits:**
    
    -   Ensures type safety throughout the application.
    -   Improves reliability by validating data at runtime.

## Components Overview

### **Common Components**

-   **Header.tsx & Footer.tsx:**
    
    -   The header includes the app title and navigation elements.
    -   The footer contains additional information or links.
-   **Pagination.tsx:**
    
    -   Handles pagination logic and UI for navigating through Pokémon pages.
-   **Ripple.tsx:**
    
    -   Provides a ripple effect on clickable elements for better UX.
-   **ToggleTheme.tsx:**
    
    -   Allows users to switch between light and dark themes.
-   **TypeBadge.tsx:**
    
    -   Displays Pokémon types with corresponding colors.

### **Pokémon Components**

-   **Abilities.tsx:**
    
    -   Displays a list of a Pokémon's abilities.
-   **Image.tsx:**
    
    -   Renders the Pokémon image with placeholder support.
-   **Item.tsx:**
    
    -   Represents a single Pokémon item in the list.
-   **List.tsx:**
    
    -   Fetches and displays a list of Pokémon with pagination.
-   **Searchbar.tsx:**
    
    -   Provides search functionality to find Pokémon by name.
-   **StatsChart.tsx:**
    
    -   Visualizes a Pokémon's stats in a chart.
-   **Weaknesses.tsx:**
    
    -   Displays a Pokémon's weaknesses based on its types.