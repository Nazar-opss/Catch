import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { db } from "@/server/db";
import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { types } from "util";

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
        enabled: true
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