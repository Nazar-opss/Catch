"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function requireSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { ok: false as const, error: "Ви не авторизовані" }
    }

    return { ok: true as const, session }
}
