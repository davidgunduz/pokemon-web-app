"use client";
// This component is marked as a client component because it resides at the edge of the component tree and handles client-specific logic, without affecting server-side components or pages.

import { ReactElement, useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

function ToggleTheme(): ReactElement {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Wait until the component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a spinner while the theme is being determined
  if (!mounted) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-yellow-200"></div>;

  // Handle the theme toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative ml-auto flex h-8 w-16 items-center rounded-full bg-slate-800 dark:bg-slate-900 p-1">
      <input type="checkbox" id="toggle" checked={resolvedTheme === "dark"} onChange={toggleTheme} className="absolute top-0 left-0 z-10 h-full w-full opacity-0 cursor-pointer" />
      <FaMoon
        className={`h-6 w-6 text-yellow-200 transform ${mounted ? "transition-transform duration-300 ease-in-out" : ""} ${
          resolvedTheme === "dark" ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
      />
      <FiSun
        className={`h-6 w-6 text-yellow-200 transform ${mounted ? "transition-transform duration-300 ease-in-out" : ""} ${
          resolvedTheme === "dark" ? "-translate-x-6 opacity-0" : "translate-x-2 opacity-100"
        }`}
      />
    </div>
  );
};

export default ToggleTheme;
