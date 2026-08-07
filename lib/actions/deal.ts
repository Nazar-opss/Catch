"use server";
import { db } from "@/server/db";
import { DealActionValues, dealActionSchema, importDealSchema } from "@/lib/schemas/dealSchema";
import { revalidatePath } from "next/cache";
import { requireSession } from "./require-session";

type ActionResult =
  | { success: string; error?: undefined }
  | { error: string; success?: undefined };

export async function createDealAction(
  values: DealActionValues,
): Promise<ActionResult> {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) {
    return { error: sessionResult.error };
  }
  const { session } = sessionResult;

  const validateField = dealActionSchema.safeParse(values);

  if (!validateField.success) {
    return { error: `Не коректно введені ${validateField.error.message}` };
  }

  const data = validateField.data;

  try {
    await db
      .insertInto("deal")
      .values({
        id: crypto.randomUUID(),
        link: data.link,
        title: data.title,
        oldPrice: data.oldPrice === "" ? null : data.oldPrice,
        newPrice: data.newPrice === "" ? 0 : data.newPrice,
        category: data.category,
        description: data.description,
        imageUrls: data.images,
        createdAt: new Date(),
        authorId: session.user.id,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      })
      .execute();
    revalidatePath("/");
    return { success: "Знижку додано" };
  } catch (error) {
    console.error(error);
    return { error: "Помилка при збереженні в базу даних" };
  }
}

export async function updateDealAction(
  dealId: string,
  values: DealActionValues,
): Promise<ActionResult> {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) {
    return { error: sessionResult.error };
  }
  const { session } = sessionResult;

  const validateField = dealActionSchema.safeParse(values);

  if (!validateField.success) {
    return { error: `Не коректно введені дані ${validateField.error.message}` };
  }

  const data = validateField.data;

  try {
    const result = await db
      .updateTable("deal")
      .set({
        link: data.link,
        title: data.title,
        oldPrice: data.oldPrice === "" ? null : data.oldPrice,
        newPrice: data.newPrice === "" ? 0 : data.newPrice,
        category: data.category,
        description: data.description,
        imageUrls: data.images,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      })
      .where("id", "=", dealId)
      .where("authorId", "=", session.user.id)
      .executeTakeFirst();
    if (Number(result.numUpdatedRows) === 0) {
      return { error: "Угоду не знайдено або немає прав" };
    }
    revalidatePath(`/deal/${dealId}`);
    return { success: "Знижку оновлено" };
  } catch (error) {
    console.error(error);
    return { error: "Помилка при збереженні в базу даних" };
  }
}

export async function deleteDealAction(dealId: string): Promise<ActionResult> {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) {
    return { error: sessionResult.error };
  }
  const { session } = sessionResult;

  const userRole = (session.user as typeof session.user & { role?: string })
    .role;
  try {
    let query = db.deleteFrom("deal").where("id", "=", dealId);

    if (userRole !== "admin") {
      query = query.where("authorId", "=", session.user.id);
    }
    const result = await query.executeTakeFirst();

    if (Number(result.numDeletedRows) === 0) {
      return { error: "Угоду не знайдено або немає прав" };
    }
    revalidatePath("/");
    revalidatePath(`/deal/${dealId}`);
    revalidatePath("/admin");
    return { success: "Знижку видалено" };
  } catch (error) {
    console.error(error);
    return { error: "Помилка при видаленні з бази даних" };
  }
}

export async function toggleDealExpiredAction(
  dealId: string,
): Promise<ActionResult> {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) {
    return { error: sessionResult.error };
  }
  const { session } = sessionResult;

  try {
    const deal = await db
      .selectFrom("deal")
      .select(["isExpired", "expiresAt"])
      .where("id", "=", dealId)
      .where("authorId", "=", session.user.id)
      .executeTakeFirst();

    if (!deal) {
      return { error: "Угоду не знайдено або немає прав" };
    }

    const dateExpired = deal.expiresAt
      ? new Date(deal.expiresAt).getTime() <= Date.now()
      : false;
    const currentlyExpired = deal.isExpired || dateExpired;

    const nextValue = currentlyExpired
      ? { isExpired: false, ...(dateExpired ? { expiresAt: null } : {}) }
      : { isExpired: true };

    await db
      .updateTable("deal")
      .set(nextValue)
      .where("id", "=", dealId)
      .where("authorId", "=", session.user.id)
      .execute();

    revalidatePath("/");
    revalidatePath(`/deal/${dealId}`);
    return {
      success: currentlyExpired
        ? "Знижку відновлено"
        : "Знижку позначено як закінчену",
    };
  } catch (error) {
    console.error(error);
    return { error: "Помилка при збереженні в базу даних" };
  }
}

export async function importDealsAction(rawData: unknown) {
  const sessionResult = await requireSession();
  if (!sessionResult.ok) {
    return { error: sessionResult.error };
  }
  const { session } = sessionResult;
  const userRole = (session?.user as typeof session.user & {role?: string})?.role

  if(userRole !== "admin") {
    return { error: "Недостатньо прав. Доступ заборонено." };
  }

  const parsed = importDealSchema.safeParse(rawData)
  if(!parsed.success) {
    return { error: "Помилка формату JSON. Перевірте структуру файлу." };
  }

  const deals = parsed.data
  if(deals.length === 0) return {error: "JSON файл порожній"}

  const dealsToInsert = deals.map((deal) => ({
    id: crypto.randomUUID(),
    authorId: session.user.id,
    // createdAt: new Date(),
    // updatedAt: new Date(),
    title: deal.title,
    link: deal.link,
    oldPrice: deal.oldPrice === "" ? null : deal.oldPrice ?? null,
    newPrice: deal.newPrice === "" ? 0 : deal.newPrice ?? 0,
    category: deal.category,
    description: deal.description,
    imageUrls: deal.images,
    expiresAt: deal.expiresAt ? new Date(deal.expiresAt) : null,
  }))

  try {
        await db.insertInto("deal").values(dealsToInsert).execute();
        
        revalidatePath("/");
        revalidatePath("/admin");
        
        return { success: `Успішно імпортовано ${dealsToInsert.length} знижок!` };
    } catch (error) {
        console.error("Помилка імпорту:", error);
        return { error: "Сталася помилка при записі в базу даних" };
    }
}