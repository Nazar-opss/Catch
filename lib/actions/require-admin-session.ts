"use server";

import { requireSession } from "./require-session";

export async function requireAdminSession() {
  const sessionResult = await requireSession();

  if (!sessionResult.ok) return { error: sessionResult.error };

  if (sessionResult.session?.user?.role !== "admin") {
    return { ok: false as const,  error: "Недостатньо прав для виконання дії" };
  }

  return sessionResult;
}
