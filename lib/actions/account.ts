"use server"

import { auth } from "../auth"
import { requireSession } from "./require-session"

export async function deleteAccountWithPassword(password: string) {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error }
    }
    const { session } = sessionResult

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