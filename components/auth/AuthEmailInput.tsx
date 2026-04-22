import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { inputStyle } from "../deals/DealFormContent";
import { UseFormReturn } from "react-hook-form";

type InputProps = {
    form: UseFormReturn<any>;
    inputLabel: string;
    placeholder: string;
    inputName: string;
    type: string;
    autoComplete?: string;
}

export default function AuthEmailInput({ form, inputLabel, placeholder, inputName, type, autoComplete }: InputProps) {
    return (
        <Controller
            name={inputName}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                    <FieldGroup className="flex flex-row justify-between">
                        <FieldLabel htmlFor={field.name}>{inputLabel}</FieldLabel>
                    </FieldGroup>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete={autoComplete || "off"}
                        type={type}
                        value={field.value}
                        className={`${inputStyle} px-4`}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}