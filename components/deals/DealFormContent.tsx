import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from "../ui/file-upload";
import { Upload, X } from "lucide-react";
import { DealFormValues } from "@/lib/schemas/dealSchema";
import { Button } from "../ui/button";
import DealFormInput from "./DealFormInput";
import DealDateField from "./DealDateField";
import DealCategorySelect from "./DealCategorySelect";

export const inputStyle =
  "flex h-11 w-full rounded-lg border border-border bg-card px-3.5 py-2 text-[15px] text-card-foreground shadow-sm placeholder:text-muted-foreground hover:border-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring/10 transition-all duration-200";

export default function DealFormContent({
  form,
  dealType,
}: {
  form: UseFormReturn<DealFormValues>;
  dealType: "online" | "offline";
}) {
  return (
    <FieldGroup>
      <DealFormInput
        form={form}
        inputName="link"
        placeholder="https://rozetka.com.ua/..."
        inputLabel="Посилання на товар"
        redRequired
      />
      <DealFormInput
        form={form}
        inputName="title"
        placeholder="Наприклад: iPhone 15 Pro Max 256GB"
        inputLabel="Назва товару"
        redRequired
      />
      <FieldGroup className="flex flex-row">
        <DealFormInput
          form={form}
          inputName="newPrice"
          placeholder="Наприклад: 12999"
          inputLabel="Нова ціна (₴)"
          redRequired
          price
        />
        <DealFormInput
          form={form}
          inputName="oldPrice"
          placeholder="Наприклад: 16999"
          inputLabel="Стара ціна (₴)"
          price
        />
      </FieldGroup>
      <DealCategorySelect form={form} />

      <Controller
        name="images"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
              Зображення
              {dealType === "offline" && (
                <span className="text-red-500">*</span>
              )}{" "}
              ({field.value?.length || 0}/5)
            </FieldLabel>

            <FileUpload
              id={field.name}
              aria-invalid={fieldState.invalid}
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={5}
              className="w-full"
              disabled={field.value?.length >= 5}
            >
              <FileUploadDropzone
                asChild
                aria-label="Dropzone for file upload"
                className={`${field.value?.length >= 5 ? "opacity-50" : ""} py-8 px-4 group transition-colors duration-200 hover:border-orange-400 rounded-xl border-border`}
              >
                <div
                  className={`${field.value?.length >= 5 ? "cursor-not-allowed" : "cursor-pointer"} flex flex-col items-center transition-colors duration-200`}
                >
                  <div className="flex items-center justify-center rounded-full border w-12 h-12 mb-3 group-hover:border-primary group-hover:bg-orange-500/20 transition-colors">
                    <Upload className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {field.value?.length >= 5 ? (
                    <p className="text-red-500 font-medium text-sm mb-1">
                      Максимальна кількість зображень досягнута
                    </p>
                  ) : (
                    <p className="text-secondary-foreground font-medium text-center text-sm mb-1 group-hover:text-card-foreground">
                      Перетягніть фото сюди або{" "}
                      <span className="text-primary font-bold">натисніть</span>{" "}
                      для завантаження
                    </p>
                  )}
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
                        className="cursor-pointer size-7"
                      >
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FileUpload>
          </Field>
        )}
        //fix error display for images
      />

      <DealFormInput
        form={form}
        inputName="description"
        placeholder="Додайте опис або промокод для знижки..."
        inputLabel="Опис або промокод"
        description
      />
      <DealDateField
        form={form}
        inputName="expiresAt"
        inputLabel="Діє до (необов'язково)"
      />
    </FieldGroup>
  );
}
