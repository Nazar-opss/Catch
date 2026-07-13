import { CATEGORIES } from "@/lib/constants";
import { DealFormValues } from "@/lib/schemas/dealSchema";
import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { inputStyle } from "./DealFormContent";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

export default function DealCategorySelect({form}: {form: UseFormReturn<DealFormValues>}) {
    const [open, setOpen] = useState(false)
    return (
        <Controller 
            name="category"
            control={form.control}
            render={({field, fieldState}) => {
                const selected = CATEGORIES.find((c) => c.value === field.value)
                return (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Категорія<span className="text-red-500">*</span></FieldLabel>
                        <Popover open={open} onOpenChange={setOpen} modal>
                            <PopoverTrigger asChild>
                                <Button 
                                    type="button"
                                    aria-invalid={fieldState.invalid}
                                    className={`${inputStyle} justify-between bg-card font-normal cursor-pointer`}
                                >
                                    {selected ? <span>{selected.icon}{selected.label}</span> : <span className="text-muted-foreground">Оберіть категорію</span>}
                                    <ChevronsUpDown className="size-4 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="rounded-lg p-0 w-(--radix-popover-trigger-width)">
                                <Command className="rounded-lg">
                                    <CommandInput placeholder="Пошук категорії..."/>
                                    <CommandList>
                                        <CommandEmpty>Нічого не знайдено</CommandEmpty>
                                        <CommandGroup>
                                            {CATEGORIES.map((c) => (
                                                <CommandItem 
                                                    key={c.value}
                                                    value={c.label}
                                                    data-checked={field.value === c.value}
                                                    onSelect={() => {field.onChange(c.value); setOpen(false)}}
                                                >
                                                    {c.icon} {c.label}

                                                    {field.value === c.value}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
            }}
        />
    )
}