import { sentinelClient } from "@better-auth/infra/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    basePath: '/api/auth',
    // ... your existing config
    plugins: [
        // ... other plugins
        sentinelClient()
    ]
})

export const { signIn, signOut, signUp, useSession, requestPasswordReset } = authClient
