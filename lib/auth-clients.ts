import { sentinelClient } from "@better-auth/infra/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    basePath: '/api/auth',
    // ... your existing config
    plugins: [
        // ... other plugins
        sentinelClient()
    ]
})

export const { signIn, signOut, signUp, useSession, requestPasswordReset, changeEmail, changePassword, deleteUser } = authClient
