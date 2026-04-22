import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { db } from "@/server/db";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { EmailTemplate } from "@/components/ui/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const secret = process.env.BETTER_AUTH_SECRET
if (!secret) throw new Error("BETTER_AUTH_SECRET is not defined")


export const auth = betterAuth({
    secret,
    baseURL: "http://localhost:3000",
    database: {
        db,
        type: "postgres"
    },
    emailAndPassword: {
        autoSignIn: true,
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            const html = await render(EmailTemplate({ url }));
            const data = await resend.emails.send({
                from: "Catch <onboarding@resend.dev>",
                to: [user.email],
                subject: "Відновлення паролю",
                html,
            });
            console.log(data);
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },

    plugins: [
        // ... other plugins
        dash()
    ]
})

export type Session = typeof auth.$Infer.Session