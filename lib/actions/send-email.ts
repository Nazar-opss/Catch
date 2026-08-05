"use server"
import { Resend } from "resend";
import { contactFormSchema, ContactFormValues } from "../schemas/contactSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormValues) {
    const result = contactFormSchema.safeParse(data);

    if(!result.success) {
        return {error: "Введено невалідні дані"}
    }

    const {name, email, subject, message, userId} = result.data

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
    } catch (error) {
        return { error: "Не вдалося відправити повідомлення. Спробуйте пізніше." };
    }
}