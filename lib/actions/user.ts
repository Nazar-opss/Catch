"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { requireSession } from "./require-session";
import { profileSchema } from "../schemas/profileSchema";
import { auth } from "../auth";
import { headers } from "next/headers";
import { requireAdminSession } from "./require-admin-session";

export async function updateUserPhoto(imageUrl: string) {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) {
    return { error: sessionResult.error };
  }
  const { session } = sessionResult;

  try {
    await db
      .updateTable("user")
      .set({ image: imageUrl })
      .where("id", "=", session.user.id)
      .execute();
    revalidatePath(`/user/[username]`, "page");
    return { success: "Фото профілю оновлено" };
  } catch {
    return { error: "Помилка оновлення фото профілю" };
  }
}

export async function updateUserData(data: {
  name?: string;
  userName?: string;
}) {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) return { error: sessionResult.error };
  const { session } = sessionResult;

  const parsedData = profileSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      error: "validation_error",
      message: "Помилка перевірки даних",
    };
  }

  const values: { name?: string; username?: string } = {};
  if (parsedData.data.name !== undefined) values.name = parsedData.data.name;
  if (parsedData.data.userName !== undefined)
    values.username = parsedData.data.userName;

  if (Object.keys(values).length === 0) {
    return { error: "Немає даних для оновлення" };
  }

  try {
    if (values.username !== undefined) {
      const existingUser = await db
        .selectFrom("user")
        .select("id")
        .where("username", "=", values.username)
        .where("id", "!=", session.user.id)
        .executeTakeFirst();

      if (existingUser) {
        return {
          error: "conflict",
          message: "Цей юзернейм вже зайнятий іншим користувачем",
        };
      }
    }

    await db
      .updateTable("user")
      .set(values)
      .where("id", "=", session.user.id)
      .execute();
    revalidatePath(`/user/[username]`, "page");
    return { success: "Дані оновлено" };
  } catch {
    return { error: "Помилка оновлення даних" };
  }
}

export async function banUser(userId: string) {
  const adminResult = await requireAdminSession();
  if (!adminResult.ok) return { error: adminResult.error };

  try {
    await auth.api.banUser({
      body: {
        userId: userId,
        // banReason: "Spamming",
        banExpiresIn: 60 * 60 * 24 * 7,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { error: "Помилка блокування користувача" };
  }
}

export async function unbanUser(userId: string) {
  const adminResult = await requireAdminSession();
  if (!adminResult.ok) return { error: adminResult.error };

  try {
    await auth.api.unbanUser({
      body: { userId: userId },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err) {
    console.error("System Error:", err);
    return { error: "Помилка розблокування користувача" };
  }
}

export async function setUserRole({
  userId,
  role,
}: {
  userId: string;
  role: "user" | "admin";
}) {
  const adminResult = await requireAdminSession();
  if (!adminResult.ok) return { error: adminResult.error };

  try {
    await auth.api.setRole({
      body: {
        userId: userId,
        role: role,
      },
      headers: await headers(),
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err) {
    console.error("System Error:", err);
    return { error: "Помилка зміни ролі користувача" };
  }
}

export async function resetUserRating(userId: string) {
  const adminResult = await requireAdminSession();
  if (!adminResult.ok) return { error: adminResult.error };

  try {
    await db
      .updateTable("user")
      .set({ karma: 0 })
      .where("id", "=", userId)
      .execute();
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err) {
    console.error("System Error:", err);
    return { error: "Помилка скидання рейтингу користувача" };
  }
}
