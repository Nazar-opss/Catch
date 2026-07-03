import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import DealFormInput from "./DealFormInput";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList } from "../ui/file-upload";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DealFormValues, formSchema } from "@/lib/schemas/dealSchema";
import { toast } from "sonner";
import { createDealAction } from "@/lib/actions/deal";

export default function DealEdit({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const form = useForm<DealFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
            title: "",
            oldPrice: "",
            newPrice: "",
            images: [],
            description: "",
        }
    })

    async function onSubmit(values: DealFormValues) {
        const formData = new FormData();
        values.images.forEach((image) => {
            formData.append("files", image);
        });

        const uploadResult = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const data = await uploadResult.json();

        values.images = data.urls.map((image: { secure_url: string }) => image.secure_url);
        console.log(values)
        const result = await createDealAction(values)
        //update the deal in the database with the new values
        console.log(result)
        if (result?.success) {
            toast.success(result.success)
            form.reset()
            onOpenChange(false)
        } else {
            toast.error(result?.error)
        }
    }
    return (
         <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent
        showCloseButton={false}
        aria-describedby="Додати нову знижку"
        className="my-auto max-h-[calc(100vh-2rem)] max-w-137.5 mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <div className="flex justify-between">
            <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">
              Редагування знижки
            </DialogTitle>
            <DialogClose onClick={() => {}} className="w-5 h-5 p-2 bg-card items-center box-content flex justify-center rounded-full cursor-pointer text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors">
              <X height={20} width={20} className="" aria-hidden={false} />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="px-6 sm:px-8">
            <FieldGroup>
                <DealFormInput form={form} inputName="link" placeholder="https://rozetka.com.ua/..." inputLabel="Посилання на товар" />
                <DealFormInput form={form} inputName="title" placeholder="Наприклад: iPhone 15 Pro Max 256GB" inputLabel="Назва товару"  />
            <FieldGroup className="flex flex-row">
                <DealFormInput form={form} inputName="newPrice" placeholder="Наприклад: 12999" inputLabel="Нова ціна (₴)" price />
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
                            <FileUploadDropzone asChild aria-label="Dropzone for file upload" className="py-8 px-4 group transition-colors duration-200 hover:border-orange-400 rounded-xl border-border">
                                <div className="flex flex-col items-center transition-colors duration-200">
                                    <div className="flex items-center justify-center rounded-full border w-12 h-12 mb-3 group-hover:border-primary group-hover:bg-orange-500/20 transition-colors">
                                        <Upload className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-secondary-foreground font-medium  text-sm mb-1 group-hover:text-card-foreground">Перетягніть фото сюди або <span className="text-primary font-bold">натисніть</span> для завантаження</p>
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
        </div>
        <DialogFooter className='relative mt-6 border-t-0 bg-transparent'>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-slate-300"
            >
              Скасувати
            </Button>
          </DialogClose>
          <DialogClose type="submit" onClick={() => {}} asChild>
            <Button  className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-primary hover:bg-orange-700 cursor-pointer">
              Зберегти зміни
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}