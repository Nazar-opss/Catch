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

export default function ProfileUserPhoto({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
    const [files, setFiles] = React.useState<File[]>([]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby="Додати нову знижку"
        className="my-auto max-h-[calc(100vh-2rem)] max-w-md mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <div className="flex justify-between">
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              Змінити фото профілю
            </DialogTitle>
            <DialogClose className="w-5 h-5 p-2 bg-transparent items-center box-content flex justify-center rounded-full cursor-pointer text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors">
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
              className="py-8 px-4 group transition-colors duration-200 hover:border-orange-400 rounded-xl border-slate-300"
            >
              <div className="flex flex-col items-center transition-colors duration-200">
                <div className="flex items-center justify-center rounded-full border w-12 h-12 mb-3 group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors">
                  <Upload className="size-6 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                </div>
                <p className="text-slate-700 font-medium text-center text-sm mb-1 group-hover:text-slate-900">
                  Перетягніть фото сюди або{" "}
                  <span className="text-orange-500 font-bold">натисніть</span>{" "}
                  для завантаження
                </p>
              </div>
            </FileUploadDropzone>
            {files.map((file) => (
              <FileUploadItem className="w-40 h-40 pl-0 p-1 rounded-full" value={file} key={file.name}>
                <FileUploadItemPreview
                className="rounded-full w-39 h-39 object-cover"
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
               
            </FileUploadItem>
            ))}
             <FileUploadClear forceMount />
          </FileUpload>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-slate-300"
            >
              Скасувати
            </Button>
          </DialogClose>
          <DialogClose type="submit" asChild>
            <Button className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-[#ea580c] hover:bg-orange-700 cursor-pointer">
              Опублікувати
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
