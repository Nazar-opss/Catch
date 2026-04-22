'use client'
import { inputStyle } from "@/components/deals/DealFormContent"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgetPasswordSchema, ForgetPasswordSchemaValues } from "@/lib/schemas/resetSchema"
import Link from "next/link"
import { authClient } from "@/lib/auth-clients"
import { toast } from "sonner"

export default function ForgetPasswordPage() {
    const form = useForm<ForgetPasswordSchemaValues>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: ForgetPasswordSchemaValues) => {
        try {
            await authClient.requestPasswordReset({
                email: data.email,
                redirectTo: "/reset-password",
            })
            toast.success("Посилання для скидання пароля відправлено")
        } catch (error) {
            toast.error("Не вдалося скинути пароль")
        }
    }
    return (
        <div className="flex flex-col w-full mb-8 gap-3.5 z-10">
            <FieldGroup className="gap-5">

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Електронна пошта</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="name@example.com"
                                autoComplete="off"
                                type="email"
                                value={field.value}
                                className={`${inputStyle} px-4`}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button variant="outline" onClick={form.handleSubmit(onSubmit)} className="px-5 py-2.5 mt-3 w-full text-[15px] bg-orange-600 text-white font-medium shadow-sm shadow-orange-600/20 rounded-xl cursor-pointer transition-all hover:bg-orange-700 hover:text-white active:scale-95">
                    Скинути пароль
                </Button>

            </FieldGroup>
        </div>
    )
}