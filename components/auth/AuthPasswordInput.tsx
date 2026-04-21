import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { inputStyle } from "../header/DealFormContent";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Link from "next/link";

type InputProps = {
    form: UseFormReturn<any>;
    inputLabel: string;
    placeholder: string;
    inputName: string;
    forgotPassword?: boolean;
}

export default function AuthPasswordInput({ form, inputLabel, placeholder, inputName, forgotPassword }: InputProps) {
    const [showPassword, setShowPassword] = useState<"password" | "text">("password")

    return (
        <Controller
            name={inputName}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                    <FieldGroup className="flex flex-row justify-between">
                        <FieldLabel htmlFor={field.name}>{inputLabel}</FieldLabel>
                        {forgotPassword && <Link href="/forgot-password">
                            <FieldLabel htmlFor={field.name} className="text-orange-600 cursor-pointer">Забули пароль?</FieldLabel>
                        </Link>}
                    </FieldGroup>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete="off"
                        type={showPassword}
                        value={field.value}
                        className={`${inputStyle} px-4`}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(showPassword === "password" ? "text" : "password")}
                        className="absolute inline-flex items-center justify-center right-0 top-1/2 -translate-y-1/6 w-10! cursor-pointer h-10 hover:bg-transparent"
                        aria-label={showPassword === "password" ? "Показати пароль" : "Приховати пароль"}
                    >
                        {showPassword === "password" ? (
                            <Eye className="h-5 w-5 text-slate-500" />
                        ) : (
                            <EyeOff className="h-5 w-5 text-slate-500" />
                        )}
                    </Button>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}