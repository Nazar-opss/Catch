"use client"
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema, NewPasswordSchemaValues } from "@/lib/schemas/resetSchema";
import AuthPasswordInput from "@/components/auth/AuthPasswordInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPasswordPage() {
    const form = useForm<NewPasswordSchemaValues>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    return (
        <div className="flex flex-col w-full mb-8 gap-3.5 z-10">
            <FieldGroup className="gap-5">

                <AuthPasswordInput form={form} inputLabel="Новий пароль" placeholder="••••••••" inputName="password" />
                <AuthPasswordInput form={form} inputLabel="Повторіть пароль" placeholder="••••••••" inputName="confirmPassword" />

                <Button asChild variant="outline" className="px-5 py-2.5 mt-3 w-full text-[15px] bg-orange-600 text-white font-medium shadow-sm shadow-orange-600/20 rounded-xl cursor-pointer transition-all hover:bg-orange-700 hover:text-white active:scale-95">
                    <Link href="/login" onClick={() => console.log(form.getValues())}>
                        Зберегти
                    </Link>
                </Button>
            </FieldGroup>
        </div>
    )
}