"use client"
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema, NewPasswordSchemaValues } from "@/lib/schemas/resetSchema";
import AuthPasswordInput from "@/components/auth/AuthPasswordInput";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-clients";
import { toast } from "sonner";
import { useState } from "react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")
    const [loading, setLoading] = useState(false)

    const form = useForm<NewPasswordSchemaValues>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: NewPasswordSchemaValues) => {
        if (!token) {
            toast.error("Токен для скидання паролю відсутній")
            return
        }

        setLoading(true)
        const { error } = await authClient.resetPassword({
            newPassword: data.password,
            token,
        })
        setLoading(false)

        if (error) {
            toast.error(error.message ?? "Не вдалося скинути пароль")
            return
        }

        toast.success("Пароль успішно змінено")
        router.push("/login")
    }

    return (
        <div className="flex flex-col w-full mb-8 gap-3.5 z-10">
            <FieldGroup className="gap-5">

                <AuthPasswordInput form={form} inputLabel="Новий пароль" placeholder="••••••••" inputName="password" />
                <AuthPasswordInput form={form} inputLabel="Повторіть пароль" placeholder="••••••••" inputName="confirmPassword" />

                <Button
                    variant="outline"
                    disabled={loading || !token}
                    onClick={form.handleSubmit(onSubmit)}
                    className="px-5 py-2.5 mt-3 w-full text-[15px] bg-orange-600 text-white font-medium shadow-sm shadow-orange-600/20 rounded-xl cursor-pointer transition-all hover:bg-orange-700 hover:text-white active:scale-95"
                >
                    {loading ? "Збереження..." : "Зберегти"}
                </Button>
            </FieldGroup>
        </div>
    )
}