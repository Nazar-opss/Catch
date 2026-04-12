import { authClient } from "./auth-clients";

export async function signUp(email: string, password: string, name: string, image?: string) {
    const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image,
        callbackURL: "/"
    });

    return { data, error };
}