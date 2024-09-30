"use client";

// This context is created to render the ThemeProvider inside a client component.
// By rendering the provider at the root, all client components throughout the application can consume the theme context without making the entire app a client component.

// ----------------------------------------------------------------------

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* This library prevents dark mode flicker/flash. */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
