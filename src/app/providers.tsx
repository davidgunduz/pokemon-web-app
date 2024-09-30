"use client";
// This library prevents dark mode flicker/flash.
// This context is created to render the ThemeProvider inside a client component.
// By rendering the provider at the root, all client components throughout the application can consume the theme context without making the entire app a client component.

import { ThemeProvider } from "next-themes";

function Providers ({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>;
};

export default Providers;
