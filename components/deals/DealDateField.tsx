import { DealFormValues } from "@/lib/schemas/dealSchema";
import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarDays, X } from "lucide-react";
import dayjs from "dayjs";
import { Calendar } from "../ui/calendar";

export default function DealDateField({
  form,
  inputName,
  inputLabel,
}: {
  form: UseFormReturn<DealFormValues>;
  inputName: "expiresAt"
  inputLabel: string;
}) {
    return (
        <Controller
            name={inputName}
            control={form.control}
            render={({field, fieldState}) => {
                const selected = field.value ? new Date(field.value) : undefined
                const today = new Date()
                today.setHours(0, 0, 0, 0)

                return (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            // htmlFor="expiresAt"
                        >
                            {inputLabel}
                        </FieldLabel>
                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        id={field.name}
                                        className={`h-11 flex-1 justify-start rounded-lg px-3.5 text-[15px] font-normal shadow-sm ${!field.value && "text-muted-foreground"}`}    
                                    >
                                        <CalendarDays className="mr-2 size-4"/>
                                        {field.value ? dayjs(field.value).format("DD.MM.YYYY"): "Оберіть дату"}

                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selected}
                                        onSelect={(date) => field.onChange(date ? dayjs(date).format("YYYY-MM-DD"): "")
                                        }
                                        disabled={{before: today}}
                                        autoFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {field.value && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Очистити дату"
                                    onClick={() => field.onChange("")}
                                >
                                    <X className="size-4"/>
                                </Button>
                            )}
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
            }}
        >

        </Controller>
    )
}
