import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { db } from "@/server/db";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { EmailTemplate } from "@/components/ui/email-template";
import { generateSlugUsername } from "./utils";


const resend = new Resend(process.env.RESEND_API_KEY);

const secret = process.env.BETTER_AUTH_SECRET
if (!secret) throw new Error("BETTER_AUTH_SECRET is not defined")


export const auth = betterAuth({
    secret,
    baseURL: "http://localhost:3000/api/auth",
    database: {
        db,
        type: "postgres"
    },
    user: {
        additionalFields: {
            username: {
                type: "string",
                required: false,
            },
            theme: {
                type: "string",
                defaultValue: "light",
                required: false,
            },
        },
        changeEmail: {
                enabled: true,
                sendChangeEmailConfirmation: async ({ user, newEmail, url}) => {
                    if (process.env.NODE_ENV !== "production") console.log("CHANGE-EMAIL CONFIRM URL:", url);
                    void resend.emails.send({
                        from: "Catch <onboarding@resend.dev>",
                        to: [user.email], 
                        subject: "Підтвердження зміни електронної пошти",
                        html: `
                            <div style="font-family: sans-serif; padding: 20px;">
                                <h2>Привіт, ${user.name}!</h2>
                                <p>Хтось (сподіваємось, що ви) ініціював зміну пошти на <b>${newEmail}</b>.</p>
                                <p>Якщо це були ви, підтвердіть дію:</p>
                                <a href="${url}" style="background-color: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Підтвердити зміну</a>
                            </div>
                        `,
                    });
                }
        }
    },
    emailAndPassword: {
        autoSignIn: true,
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            const html = await render(EmailTemplate({ url }));
            void resend.emails.send({
                from: "Catch <onboarding@resend.dev>",
                to: [user.email],
                subject: "Відновлення паролю",
                html,
            });
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url}) => {
            if (process.env.NODE_ENV !== "production") console.log("CHANGE-EMAIL CONFIRM URL:", url);
            void resend.emails.send({
                from: "Catch <onboarding@resend.dev>",
                to: [user.email],
                subject: "Підтвердження електронної пошти на Catch",
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>Привіт, ${user.name}!</h2>
                        <p>Дякуємо за реєстрацію. Будь ласка, підтвердіть свою електронну пошту, натиснувши на кнопку нижче:</p>
                        <a href="${url}" style="background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Підтвердити пошту</a>
                    </div>
                `,
            })
        },
        sendVerificationOnSignUp: true,
        
    },
    rateLimit: {
        enabled: true,
        window: 60,
        max: 100,
        customRules: {
            "/change-email": {
                window: 60,
                max: 3,
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            username: generateSlugUsername(user.name)
                        }
                    }
                }
            }
        }
    },

    plugins: [
        
        dash()
    ]
})

export type Session = typeof auth.$Infer.Session