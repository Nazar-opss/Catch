"use server";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod";

type ActionResult =
  | { success: string; error?: undefined }
  | { error: string; success?: undefined };

    const createCoommentServerSchema = z.object({
        content: z
            .string()
            .trim()
            .min(1, "Введіть коментар")
            .max(2000, "Коментар занадто довгий"),
        dealId: z
            .string()
            .min(1),
        parentId: z
            .string()
            .nullable()
            .optional(),
    })

export async function createCommentAction(values: {
  content: string;
  images: string[];
  dealId: string;
  parentId?: string | null;
}): Promise<ActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Ви не авторизовані" };
  }
  // TODO: uncomment for add images to comment, update db, example for formSchema
  // const serverSchema = formSchema.omit({ images: true }).merge(dealActionSchema)
  // const validateField = serverSchema.safeParse(values)

  // if (!validateField.success) {
  //     return { error: `Не коректно введені дані ${validateField.error.message}` }
  // }

  // const data = validateField.data
  // const imageUrls = data.images

  const parsed = createCoommentServerSchema.safeParse(values)
  if(!parsed.success) {
    return {error: parsed.error.issues[0]?.message ?? "Некоректні дані"}
  }
  const {content, dealId, parentId} = parsed.data

  try {
    const deal = await db.selectFrom('deal')
        .select("id")
        .where("id", "=", dealId)
        .executeTakeFirst()
    if(!deal) return {error: "Знижку не знайдено"}

    if(parentId) {
        const parent = await db.selectFrom('comment')
            .select("id")
            .where("id", "=", parentId)
            .where("dealId", "=", dealId)
            .executeTakeFirst()
        if (!parent) return { error: "Батьківський коментар не знайдено" }
    }

    await db
      .insertInto("comment")
      .values({
        id: crypto.randomUUID(),
        content,
        createdAt: new Date(),
        authorId: session.user.id,
        dealId,
        parentId: parentId || null,
      })
      .execute();
    revalidatePath(`/deal/${values.dealId}`);
    return { success: "Коментар додано" };
  } catch (error) {
    console.error(error);
    return { error: "Помилка при збереженні коментаря" };
  }
}
