"use server";
import { auth } from "@/lib/auth";
import { Theme } from "@prisma/client";
import { db } from "@/server/db";
import { headers } from "next/headers";

export async function toggleTheme(theme: Theme) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return;

  try {
    await db
      .updateTable("user")
      .set({ theme })
      .where("id", "=", session.user.id)
      .execute();
    return { success: "Тему оновлено" };
  } catch {
    return { error: "Помилка оновлення теми" };
  }
}

export async function getTheme() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return;

  const user = await db
    .selectFrom("user")
    .select("theme")
    .where("id", "=", session.user.id)
    .executeTakeFirst();

  return user?.theme;
}
