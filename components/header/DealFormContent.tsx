import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList } from "../ui/file-upload";
import { Upload, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { DealFormValues } from "@/lib/schemas/dealSchema";
import { Button } from "../ui/button";

const inputStyle = "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-[15px] text-slate-900 shadow-sm placeholder:text-slate-400 hover:border-slate-400 focus-visible:outline-none focus-visible:border-orange-600 focus-visible:ring-orange-600/10 transition-all duration-200"

export default function DealFormContent({ form }: { form: UseFormReturn<DealFormValues> }) {
    return (
        <>
            <FieldGroup>
                <Controller
                    name="link"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Посилання на товар<span className="text-red-500">*</span></FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="https://rozetka.com.ua/..."
                                autoComplete="off"
                                required={true}
                                value={field.value}
                                className={inputStyle}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Назва товару<span className="text-red-500">*</span></FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Наприклад: iPhone 15 Pro Max 256GB"
                                autoComplete="off"
                                value={field.value}
                                className={inputStyle}
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
                                <FieldLabel htmlFor={field.name}>Нова ціна (₴)<span className="text-red-500">*</span></FieldLabel>
                                <div className="w-full max-w-sm space-y-2">
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Наприклад: 12999"
                                            autoComplete="off"
                                            value={field.value}
                                            className={`${inputStyle} pr-9 font-medium`}
                                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                            min="0"
                                            step="0.01"
                                            type="number"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-400 font-medium">₴</span>
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </Field>
                        )}
                    />
                    <Controller
                        name="oldPrice"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Стара ціна (₴)</FieldLabel>
                                <div className="w-full max-w-sm space-y-2">
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Наприклад: 16999"
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                            className={`${inputStyle} pr-9 font-medium`}
                                            min="0"
                                            step="0.01"
                                            type="number"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-400 font-medium">₴</span>
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </div>
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Controller
                    name="images"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Зображення</FieldLabel>
                            <FileUpload
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                value={field.value}
                                onValueChange={(files) => field.onChange(files)}
                                accept="image/*"
                                maxFiles={5}
                                className="w-full cursor-pointer"
                            >
                                <FileUploadDropzone className="py-8 px-4 group transition-colors duration-200 hover:border-orange-400 rounded-xl border-slate-300">
                                    <div className="flex flex-col items-center transition-colors duration-200">
                                        <div className="flex items-center justify-center rounded-full border w-12 h-12 mb-3 group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors">
                                            <Upload className="size-6 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                                        </div>
                                        <p className="text-slate-700 font-medium  text-sm mb-1 group-hover:text-slate-900">Перетягніть сюди або натисніть для завантаження</p>
                                        <p className="text-slate-500 text-xs ">
                                            JPG, PNG, WebP (макс. 5MB)
                                        </p>
                                    </div>
                                </FileUploadDropzone>
                                <FileUploadList>
                                    {field.value?.map((file, index) => (
                                        <FileUploadItem key={index} value={file}>
                                            <FileUploadItemPreview />
                                            <FileUploadItemMetadata />
                                            <FileUploadItemDelete asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-7"
                                                >
                                                    <X />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </FileUploadItemDelete>
                                        </FileUploadItem>
                                    ))}
                                </FileUploadList>
                            </FileUpload>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                //fix error display for images
                />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Опис або промокод</FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Додайте опис або промокод для знижки..."
                                autoComplete="off"
                                value={field.value}
                                className='flex w-full rounded-lg border resize-none border-slate-300 bg-white px-3.5 py-3 text-[15px] text-slate-900 shadow-sm transition-color placeholder:text-slate-400 placeholder:text-start min-h-[100px] focus-visible:outline-none focus-visible:border-orange-600 focus-visible:ring-orange-600/10'
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
        </>
    )
}
