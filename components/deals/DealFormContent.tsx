import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList } from "../ui/file-upload";
import { Upload, X } from "lucide-react";
import { DealFormValues } from "@/lib/schemas/dealSchema";
import { Button } from "../ui/button";
import DealFormInput from "./DealFormInput";

export const inputStyle = "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-[15px] text-slate-900 shadow-sm placeholder:text-slate-400 hover:border-slate-400 focus-visible:outline-none focus-visible:border-orange-600 focus-visible:ring-orange-600/10 transition-all duration-200"

export default function DealFormContent({ form }: { form: UseFormReturn<DealFormValues> }) {
    return (
        <FieldGroup>
            <DealFormInput form={form} inputName="link" placeholder="https://rozetka.com.ua/..." inputLabel="Посилання на товар" redRequired />
            <DealFormInput form={form} inputName="title" placeholder="Наприклад: iPhone 15 Pro Max 256GB" inputLabel="Назва товару" redRequired />

            <FieldGroup className="flex flex-row">
                <DealFormInput form={form} inputName="newPrice" placeholder="Наприклад: 12999" inputLabel="Нова ціна (₴)" redRequired price />
                <DealFormInput form={form} inputName="oldPrice" placeholder="Наприклад: 16999" inputLabel="Стара ціна (₴)" price />
            </FieldGroup>

            <Controller
                name="images"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Зображення</FieldLabel>
                        <FileUpload
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            value={field.value}
                            onValueChange={field.onChange}
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

            <DealFormInput form={form} inputName="description" placeholder="Додайте опис або промокод для знижки..." inputLabel="Опис або промокод" description />
        </FieldGroup>
    )
}
