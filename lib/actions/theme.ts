"use server";
import { auth } from "@/lib/auth";
import { Theme } from "@prisma/client";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
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
    revalidatePath(`/user/${session.user.id}`);
    return { success: "Тему оновлено" };
  } catch (error) {
    return { error: "Помилка оновлення теми" };
  }
}
