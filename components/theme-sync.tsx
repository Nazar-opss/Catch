"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-clients";

// Makes the DB value authoritative across browsers: on load, if next-themes'
// localStorage value disagrees with the server (DB) theme, overwrite it.
export function ThemeSync() {
  const { setTheme } = useTheme();
   const { data } = authClient.useSession();
  const userId = data?.user?.id;
  const theme = data?.user?.theme;
  const syncedFor = useRef<string | null>(null);

   useEffect(() => {
    if (!userId || !theme) {
      syncedFor.current = null;
      return;
    }
    if (syncedFor.current === userId) return;
    syncedFor.current = userId;
    setTheme(theme);
  }, [userId, theme, setTheme]);

  return null;
}
