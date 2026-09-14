"use server"
import { Resend } from "resend";
import { contactFormSchema, ContactFormValues } from "../schemas/contactSchema";
import { db } from "@/server/db";
import { auth } from "@/lib/auth";
import { sql } from "kysely";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_REQUESTS = 3;

export async function sendContactEmail(data: ContactFormValues) {
    const result = contactFormSchema.safeParse(data);

    if(!result.success) {
        return {error: "Введено невалідні дані"}
    }

    const {name, email, subject, message} = result.data
    const requestHeaders = await headers();
    
    const session = await auth.api.getSession({ headers: requestHeaders });

    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
        || requestHeaders.get("x-real-ip")
        || "unknown-ip";

    const identifier = session?.user?.id ?? `ip:${ip}`;

    const userId = session?.user?.id;

    let limited = false;
    try {
        await db.transaction().execute(async (trx) => {
            await sql`select pg_advisory_xact_lock(hashtextextended(${identifier}, 0))`.execute(trx);
            
            const { count } = await trx
                .selectFrom("contact_submission")
                .select(trx.fn.count("id").as("count"))
                .where("identifier", "=", identifier)
                .where("createdAt", ">=", sql<Date>`NOW() - INTERVAL '1 HOUR'`)
                .executeTakeFirstOrThrow();

            if (Number(count) >= MAX_REQUESTS) {
                limited = true;
                return;
            }

            await trx.insertInto("contact_submission").values({ identifier }).execute();
        });
    } catch (dbError) {
        console.error("Database error in contact form:", dbError);
        return { error: "Помилка сервера. Спробуйте пізніше." };
    }

    if (limited) {
        return { error: "Забагато повідомлень. Спробуйте пізніше (через годину)." };
    }

    const userIdentifier = userId ? `ID: ${userId}` : "Гість (Не авторизований)";

    try {
        await resend.emails.send({
            from: "Catch Support <onboarding@resend.dev>", // TODO: Change domain when release
            to: "support@catch.ua", // TODO: Create mail
            replyTo: email,
            subject: `Нове звернення від ${name}: ${subject}`,
            html: `
                <h3>Нове повідомлення з форми контактів</h3>
                <p><strong>Від кого:</strong> ${name} (${email})</p>
                <p><strong>Статус у системі:</strong> ${userIdentifier}</p>
                <p><strong>Тема:</strong> ${subject}</p>
                <hr />
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });
        return { success: true };
    } catch {
        return { error: "Не вдалося відправити повідомлення. Спробуйте пізніше." };
    }
}
