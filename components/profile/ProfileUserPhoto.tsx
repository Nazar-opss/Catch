import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemPreview,
} from "../ui/file-upload";
import { updateUserPhoto } from "@/lib/actions/user";
import { useSession } from "@/lib/auth-clients";

export default function ProfileUserPhoto({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
    const [files, setFiles] = React.useState<File[]>([]);
    const { refetch } = useSession();

    async function onSubmit(file: File[]) {
            const formData = new FormData();
                formData.append("files", file[0]);
    
            const uploadResult = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            // fix showing error with images
            const data = await uploadResult.json();
            console.log(data)
            const uploadedUrl = data.urls[0]
            console.log(uploadedUrl)

            const result = await updateUserPhoto(uploadedUrl)
            refetch()
            setFiles([])
            console.log(result)
            if (result?.success) {
                onOpenChange(false)
            } else {
                console.error(result?.error)
            }
        }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent
        onInteractOutside={() => setFiles([])}
        showCloseButton={false}
        aria-describedby="Додати нову знижку"
        className="my-auto max-h-[calc(100vh-2rem)] max-w-md mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <div className="flex justify-between">
            <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">
              Змінити фото профілю
            </DialogTitle>
            <DialogClose onClick={() => setFiles([])} className="w-5 h-5 p-2 bg-card items-center box-content flex justify-center rounded-full cursor-pointer text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors">
              <X height={20} width={20} className="" aria-hidden={false} />
            </DialogClose>
          </div>

          <DialogDescription>
            Виберіть нове зображення для вашого аватара (JPG, PNG або WebP).
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 sm:px-8">
          <FileUpload
            value={files}
            onValueChange={setFiles}
            maxFiles={1}
            accept="image/*"
            className="w-full cursor-pointer"
          >
            <FileUploadDropzone
              asChild
              aria-label="Dropzone for file upload"
              className="py-8 px-4 group transition-colors duration-200 hover:border-orange-400 rounded-xl border-border"
            >
              <div className="flex flex-col items-center transition-colors duration-200">
                <div className="flex items-center justify-center rounded-full border w-12 h-12 mb-3 group-hover:border-primary group-hover:bg-orange-500/20 transition-colors">
                  <Upload className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-secondary-foreground font-medium text-center text-sm mb-1 group-hover:text-card-foreground">
                  Перетягніть фото сюди або{" "}
                  <span className="text-primary font-bold">натисніть</span>{" "}
                  для завантаження
                </p>
              </div>
            </FileUploadDropzone>
            {files.map((file) => (
              <FileUploadItem className="mt-8 flex flex-col cursor-default" value={file} key={file.name}>
                <div className="rounded-full border border-slate-300 w-40 h-40 items-center justify-center flex">
                  <FileUploadItemPreview
                  className="rounded-full w-38 h-38 object-cover m-1"
                  // render={(file, fallback) => {
                  //     // Custom preview for specific file types
                  //     if (file.type.startsWith("image/")) {
                  //     return (
                  //         <FileUploadItemPreview className="object-cover w-40 h-40" />
                  //     );
                  //     }
                  //     // Use default behavior for everything else
                  //     return fallback();
                  // }}
                  />
                </div>
                <p className="text-slate-400 font-bold uppercase text-center text-sm">
                  Попередній перегляд
                </p>
                <div className="flex justify-end absolute top-2 right-2">
                  <FileUploadClear forceMount>
                      <X height={20} width={20} className="cursor-pointer text-slate-400 hover:text-red-600" aria-hidden={false} />
                  </FileUploadClear>
                </div>
            </FileUploadItem>
            ))}
          </FileUpload>
        </div>
        <DialogFooter className='relative mt-6 border-t-0 bg-transparent'>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => setFiles([])}
              className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-slate-300"
            >
              Скасувати
            </Button>
          </DialogClose>
          <DialogClose type="submit" onClick={() => onSubmit(files)} asChild>
            <Button  className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-primary hover:bg-orange-700 cursor-pointer">
              Зберегти зміни
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
