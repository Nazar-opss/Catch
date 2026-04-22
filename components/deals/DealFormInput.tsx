import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { inputStyle } from "./DealFormContent";
import { DealFormValues } from "@/lib/schemas/dealSchema";
import { Textarea } from "../ui/textarea";

type DealFormInputProps = {
    form: UseFormReturn<DealFormValues>;
    inputName: Exclude<keyof DealFormValues, "images">;
    placeholder: string;
    inputLabel: string;
    redRequired?: boolean;
    price?: boolean;
    description?: boolean;
}

export default function DealFormInput({ form, inputName, placeholder, inputLabel, redRequired, price, description }: DealFormInputProps) {
    return (
        <Controller
            name={inputName}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{inputLabel}{redRequired ? <span className="text-red-500">*</span> : ""}</FieldLabel>
                    {
                        !description ? (
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder={placeholder}
                                autoComplete="off"
                                value={field.value}
                                className={inputStyle}
                                {...price ? {
                                    onChange: (e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value)),
                                    min: "0",
                                    step: "0.01",
                                    type: "number"
                                } : {}}
                            />
                        ) : (
                            <Textarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder={placeholder}
                                autoComplete="off"
                                value={field.value}
                                className='flex w-full rounded-lg border resize-none border-slate-300 bg-white px-3.5 py-3 text-[15px] text-slate-900 shadow-sm transition-color placeholder:text-start min-h-[100px] focus-visible:outline-none focus-visible:border-orange-600 focus-visible:ring-orange-600/10'
                            />
                        )
                    }
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}