"use client"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    link: z
        .url("Введіть коректне посилання"),
    itemName: z
        .string()
        .min(1, "Введіть назву"),
    oldPrice: z
        .number(),
    newPrice: z
        .number(),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, "Максимальний розмір файлу 5МБ")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Підтримуються лише формати .jpeg, .jpg, .png, .webp"),
    description: z
        .string()
        .min(1, "Додайте опис або промокод для знижки...")
        .max(100, "Опис повинен бути не більше 100 символів"),
})


export default function AddDeal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
            itemName: "",
            oldPrice: 0,
            newPrice: 0,
            image: null,
            description: "",
        }
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="font-geist">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">Додати нову знижку</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto p-6">
                    <FieldGroup>
                        <Controller
                            name="link"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Посилання на товар</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="https://rozetka.com.ua/product/123456789/"
                                        autoComplete="off"
                                        required={true}
                                        value={field.value}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="itemName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Назва товару</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Наприклад: iPhone 15 Pro Max 256GB"
                                        autoComplete="off"
                                        value={field.value}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <FieldGroup className="flex flex-row">
                            <Controller
                                name="newPrice"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Нова ціна</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Наприклад: 12999"
                                            autoComplete="off"
                                            value={field.value}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="oldPrice"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Стара ціна</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Наприклад: 15999"
                                            autoComplete="off"
                                            value={field.value}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Зображення</FieldLabel>
                                    <Input
                                        id={field.name}
                                        type="file"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Перетягніть сюди або натисніть для завантаження"
                                        accept="image/*"
                                        value={field.value}
                                        multiple={false}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </div>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer">Скасувати</Button>
                    </DialogClose>
                    <DialogClose type="submit" asChild>
                        <Button className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-[#ea580c] hover:bg-orange-700 cursor-pointer">Додати</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}