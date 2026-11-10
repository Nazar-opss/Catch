import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { inputStyle } from "../deals/DealFormContent";

type InputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    inputLabel: string;
    placeholder: string;
    inputName: Path<T>;
    type: string;
    autoComplete?: string;
}

export default function AuthEmailInput<T extends FieldValues>({ form, inputLabel, placeholder, inputName, type, autoComplete }: InputProps<T>) {
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
                        data-cy="email-input"
                        className={`${inputStyle} px-4`}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
