"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

// Makes the DB value authoritative across browsers: on load, if next-themes'
// localStorage value disagrees with the server (DB) theme, overwrite it.
export function ThemeSync({ theme }: { theme: string }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return null;
}
