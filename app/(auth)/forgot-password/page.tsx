'use client'
import { inputStyle } from "@/components/header/DealFormContent"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgetPasswordSchema, ForgetPasswordSchemaValues } from "@/lib/schemas/resetSchema"
import Link from "next/link"

export default function ForgetPasswordPage() {
    const form = useForm<ForgetPasswordSchemaValues>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
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

                <Button variant="outline" asChild className="px-5 py-2.5 mt-3 w-full text-[15px] bg-orange-600 text-white font-medium shadow-sm shadow-orange-600/20 rounded-xl cursor-pointer transition-all hover:bg-orange-700 hover:text-white active:scale-95">
                    <Link href="/reset-password">
                        Скинути пароль
                    </Link>
                </Button>

            </FieldGroup>
        </div>
    )
}