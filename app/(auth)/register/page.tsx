'use client'
import AuthEmailInput from "@/components/auth/AuthEmailInput"
import AuthPasswordInput from "@/components/auth/AuthPasswordInput"
import AuthTypeDivider from "@/components/auth/AuthTypeDivider"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import Google from "@/components/ui/google"
import Telegram from "@/components/ui/telegram"
import { signIn } from "@/lib/auth-clients"
import { AuthFormValues, authSchema } from "@/lib/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

const buttonStyle = "flex items-center justify-center gap-3 px-4 py-2.5 text-slate-700 rounded-xl border border-slate-200 text-[15px] font-medium cursor-pointer transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-slate-200 focus:outline-none shadow-sm"

export default function RegisterPage() {
    const [pending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>(undefined)

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    })

    const handleGoogleSignUp = (provider: 'google') => {
        startTransition(async () => {
            const { error } = await signIn.social({
                provider,
                callbackURL: "/"
            })

            if (error) setError(error.message)
        })
    }

    return (
        <>
            <div className="flex flex-col w-full mb-8 gap-3.5">
                <Button variant="outline" disabled={pending} onClick={() => handleGoogleSignUp('google')} className={buttonStyle}>
                    <Google width={20} height={20} />
                    Продовжити з Google
                </Button>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button variant="outline" disabled className={buttonStyle}>
                    <Telegram width={20} height={20} />
                    Продовжити з Telegram
                </Button>
            </div>

            <AuthTypeDivider />

            <FieldGroup className="gap-5">
                <AuthEmailInput form={form} inputLabel="Ім'я користувача (Нікнейм)" placeholder="Введіть ваше ім'я користувача" inputName="name" type="text" />
                <AuthEmailInput form={form} inputLabel="Електронна пошта" placeholder="name@example.com" inputName="email" type="email" />
                <AuthPasswordInput form={form} inputLabel="Пароль" placeholder="Пароль" inputName="password" autoComplete="new-password" />
                <Button variant="outline" className="px-5 py-2.5 mt-3 w-full text-[15px] bg-orange-600 text-white font-medium shadow-sm shadow-orange-600/20 rounded-xl cursor-pointer transition-all hover:bg-orange-700 hover:text-white active:scale-95" type="submit">
                    Зареєструватися
                </Button>
            </FieldGroup>

        </>
    )
}