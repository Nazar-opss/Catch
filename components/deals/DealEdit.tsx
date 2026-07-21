import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import DealFormInput from "./DealFormInput";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemPreview, FileUploadList } from "../ui/file-upload";
import { Controller, useForm, useWatch  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DealFormValues, formSchema } from "@/lib/schemas/dealSchema";
import { toast } from "sonner";
import { updateDealAction } from "@/lib/actions/deal";
import { DealAsideInfoProps } from "./DealAsideInfo";
import Image from "next/image";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import DealDateField from "./DealDateField";

function dealToFormValues(deal: DealAsideInfoProps): DealFormValues {
    return {
        link: deal.link || "",
        title: deal.title || "",
        oldPrice: deal.oldPrice ?? "",
        newPrice: deal.newPrice ?? "",
        images: [],
        existingImages: deal.imageUrls || [],
        description: deal.description || "",
        expiresAt: deal.expiresAt ? new Date(deal.expiresAt).toISOString().slice(0, 10) : "",
        category: deal.category,
    }
}

export default function DealEdit({ deal, open, onOpenChange }: { deal: DealAsideInfoProps; open: boolean; onOpenChange: (open: boolean) => void }) {
    const form = useForm<DealFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: dealToFormValues(deal),
    })

    useEffect(() => {
        if (open) {
            form.reset(dealToFormValues(deal))
        }
    }, [open, deal, form])

    const existingImages = useWatch({ control: form.control, name: "existingImages" });
    const remainingImageSlots = Math.max(0, 5 - (existingImages?.length ?? 0));

    async function onSubmit(values: DealFormValues) {
        let uploadedUrls: string[] = []

        if (values.images.length > 0) {
            const formData = new FormData();
            values.images.forEach((image) => {
                formData.append("files", image);
            });

            const uploadResult = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await uploadResult.json();
            uploadedUrls = data.urls;
        }
        console.log(values)
        const result = await updateDealAction(deal.id, {...values, images: [...values.existingImages, ...uploadedUrls]}) 
        
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
                            maxFiles={remainingImageSlots}
                            className="w-full cursor-pointer"
                        >
                            <FileUploadList  className="flex flex-row cursor-default" forceMount>
                                {existingImages?.map((url) => (
                                    // <Tooltip key={url}>
                                        // <TooltipTrigger asChild>
                                            <div
                                                key={url}
                                                className="relative w-20 h-20 overflow-hidden rounded-md border"
                                            >
                                                <Image src={url}
                                                    width={80}
                                                    height={80}
                                                    alt="Зображення знижки"
                                                    className="w-full h-full object-cover p-3"
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    className="size-5 absolute top-1 right-1 rounded-full p-1 
                                                    cursor-pointer bg-secondary text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors duration-200"
                                                    onClick={() =>
                                                        form.setValue(
                                                            "existingImages",
                                                            existingImages.filter((u) => u !== url),
                                                            { shouldValidate: true, shouldDirty: true },
                                                        )
                                                    }
                                                >
                                                    <X className="text-red-600"/>
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                    //     </TooltipTrigger>
                                    //     <TooltipContent side="bottom" className="bg-card-foreground text-card">
                                    //         <p className="text-xs">{url}</p>
                                    //     </TooltipContent>
                                    // </Tooltip>
                                    // TODO: Add tooltip for existing images, using use_filename in cloudinary to get the original filename, or store the original filename in the database when uploading.
                                ))}
                                {field.value?.map((file, index) => (
                                    <Tooltip key={index}>
                                        <TooltipTrigger asChild>
                                            <FileUploadItem key={index} className="w-20 h-20 " value={file}>
                                                <FileUploadItemPreview className="w-full h-full border-0" />
                                                {/* <FileUploadItemMetadata /> */}
                                                <FileUploadItemDelete asChild>
                                                    <Button
                                                        size="icon"
                                                        className="size-5 absolute top-1 right-1 rounded-full p-1
                                                        cursor-pointer text-muted-foreground 
                                                        bg-secondary hover:text-card-foreground hover:bg-secondary transition-colors duration-200"
                                                    >
                                                        <X className="text-red-600" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </FileUploadItemDelete>
                                            </FileUploadItem>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-card-foreground text-card">
                                            <p className="text-xs">{file.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                                <FileUploadDropzone asChild aria-label="Dropzone for file upload" className="w-20 h-20 cursor-pointer group transition-colors duration-200 hover:border-orange-400 p-0 rounded-xl border-border">
                                    <div className="flex flex-col items-center transition-colors duration-200">
                                        <Plus />
                                        Додати
                                    </div>
                                </FileUploadDropzone>
                            </FileUploadList>
                        </FileUpload>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                    
                )}
                
            //fix error display for images
            />
    
            <DealFormInput form={form} inputName="description" placeholder="Додайте опис або промокод для знижки..." inputLabel="Опис або промокод" description />
            <DealDateField form={form} inputName="expiresAt" inputLabel="Діє до (необов'язково)"/>
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
          <DialogClose type="submit" onClick={form.handleSubmit(onSubmit)} asChild>
            <Button  className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-primary hover:bg-orange-700 cursor-pointer">
              Зберегти зміни
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}