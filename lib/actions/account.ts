"use server"

import { headers } from "next/headers"
import { auth } from "../auth"

export async function deleteAccountWithPassword(password: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { error: "Ви не авторизовані" }
    }

    const ctx = await auth.$context
    const accounts = await ctx.internalAdapter.findAccounts(session.user.id)
    const credential = accounts.find(a => a.providerId === "credential" && a.password)
    const hash = credential?.password
    if (!hash) {
        return {error: "CREDENTIAL_ACCOUNT_NOT_FOUND"}
    }

    const ok = await ctx.password.verify({ hash, password })
    if(!ok) return {error: "INVALID_PASSWORD"}

    await ctx.internalAdapter.deleteUser(session.user.id)
    await ctx.internalAdapter.deleteSessions(session.user.id)
    return { success: true }
}