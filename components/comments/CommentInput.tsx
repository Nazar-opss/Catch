"use client"
import { useSession } from "@/lib/auth-clients";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadItemProgress, FileUploadList, FileUploadProps, FileUploadTrigger } from "../ui/file-upload";
import { Image, Smile, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import EmojiPicker from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { commentFormSchema, CommentFormValues } from "@/lib/schemas/dealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { createCommentAction } from "@/lib/actions/comment";

export default function CommentInput({ dealId }: { dealId: string }) {
    const { data: session, isPending } = useSession()

    const [input, setInput] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            content: "",
            images: [],
        }
    })

    async function onSubmit(values: CommentFormValues) {
        const formData = new FormData();
        values.images.forEach((image) => {
            formData.append("files", image);
        });

        const uploadResult = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await uploadResult.json();

        const imageUrls: string[] = data.urls.map((image: any) => image.secure_url);
        const payload = { ...values, images: imageUrls, dealId: dealId };
        console.log(payload)
        const result = await createCommentAction(payload)
        console.log(result)
        if (result?.success) {
            toast.success(result.success)
            form.reset()
        } else {
            toast.error(result?.error)
        }
    }

    const onInputChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput(event.target.value);
        },
        [],
    );

    const [emojiOpen, setEmojiOpen] = useState(false);

    const onUpload: NonNullable<FileUploadProps["onUpload"]> = useCallback(
        async (files, { onProgress, onSuccess, onError }) => {
            try {
                setIsUploading(true);
                // Process each file individually
                const uploadPromises = files.map(async (file) => {
                    try {
                        // Simulate file upload with progress
                        const totalChunks = 10;
                        let uploadedChunks = 0;

                        // Simulate chunk upload with delays
                        for (let i = 0; i < totalChunks; i++) {
                            // Simulate network delay (100-300ms per chunk)
                            await new Promise((resolve) =>
                                setTimeout(resolve, Math.random() * 200 + 100),
                            );

                            // Update progress for this specific file
                            uploadedChunks++;
                            const progress = (uploadedChunks / totalChunks) * 100;
                            onProgress(file, progress);
                        }

                        // Simulate server processing delay
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        onSuccess(file);
                    } catch (error) {
                        onError(
                            file,
                            error instanceof Error ? error : new Error("Upload failed"),
                        );
                    } finally {
                        setIsUploading(false);
                    }
                });

                // Wait for all uploads to complete
                await Promise.all(uploadPromises);
            } catch (error) {
                // This handles any error that might occur outside the individual upload processes
                console.error("Unexpected error during upload:", error);
            }
        },
        [],
    );

    const onFileReject = useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
    }, []);

    // const onSubmit = useCallback(
    //     (event: React.FormEvent<HTMLFormElement>) => {
    //         event.preventDefault();
    //         setInput("");
    //         setFiles([]);
    //     },
    //     [],
    // );


    return (
        <div className="flex gap-4 sm:gap-5 mb-10">
            {isPending ? (
                <div className="flex gap-4 md:gap-6">
                    <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                </div>
            ) : session?.user?.image ? (
                <img className="w-12 h-12 rounded-full shrink-0" src={session.user.image} alt={session.user.name ?? ""} />
            ) : session?.user ? (
                <div className="shrink-0 rounded-full w-12 h-12 bg-orange-600 text-white flex items-center justify-center text-lg font-semibold">
                    {session.user.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
            ) : null}
            <div className="w-full">
                <Controller
                    name="images"
                    control={form.control}
                    render={({ field }) => (
                        <FileUpload
                            value={field.value}
                            onValueChange={field.onChange}
                            onUpload={onUpload}
                            onFileReject={onFileReject}
                            maxFiles={5}
                            className="relative w-full items-center"
                            multiple
                            disabled={isUploading}
                        >
                            <FileUploadDropzone
                                tabIndex={-1}
                                // Prevents the dropzone from triggering on click
                                onClick={(event) => event.preventDefault()}
                                className="absolute top-0 left-0 z-0 flex size-full items-center justify-center rounded-xl border-none bg-background/50 p-0 opacity-0 backdrop-blur transition-opacity duration-200 ease-out data-dragging:z-10 data-dragging:opacity-100"
                            >
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <div className="flex items-center justify-center rounded-full border p-2.5">
                                        <Upload className="size-6 text-muted-foreground" />
                                    </div>
                                    <p className="font-medium text-sm">Drag & drop files here</p>
                                    <p className="text-muted-foreground text-xs">
                                        Upload max 5 files each up to 5MB
                                    </p>
                                </div>
                            </FileUploadDropzone>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="relative flex w-full flex-col rounded-xl border border-slate-200 bg-white outline-none focus-within:ring-2 focus-within:ring-orange-600/20 focus-within:border-orange-500 transition-all overflow-hidden shadow-sm"
                            >
                                <FileUploadList
                                    orientation="horizontal"
                                    className="overflow-x-auto px-0 py-1 pl-1"
                                >
                                    {field.value.map((file, index) => (
                                        <FileUploadItem key={index} value={file} className="max-w-52 p-1.5">
                                            <FileUploadItemPreview className="size-8 [&>svg]:size-5">
                                                <FileUploadItemProgress variant="fill" />
                                            </FileUploadItemPreview>
                                            <FileUploadItemMetadata size="sm" />
                                            <FileUploadItemDelete asChild>
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    className="absolute -top-1 -right-1 size-4 shrink-0 cursor-pointer rounded-full"
                                                >
                                                    <X className="size-2.5" />
                                                </Button>
                                            </FileUploadItemDelete>
                                        </FileUploadItem>
                                    ))}
                                </FileUploadList>
                                <Controller
                                    name="content"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onInputChange(e);
                                            }}
                                            placeholder="Написати коментар..."
                                            className="rounded-none text-slate-900 placeholder:text-slate-400 px-4! py-3.5! sm:text-[15px] sm:leading-6 min-h-[90px] resize-y w-full border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent "
                                            disabled={isUploading}
                                        />
                                    )}
                                />
                                <div className="flex items-center justify-between bg-slate-50 border-t border-slate-100 px-3 py-2.5">
                                    <div className="flex items-center">
                                        <FileUploadTrigger asChild>
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="ghost"
                                                // TODO: add upload images feature, update bd, add images to comment
                                                disabled
                                                className="cursor-pointer p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-colors"
                                            >
                                                <Image className="size-5 " />
                                                <span className="sr-only">Додати зображення</span>
                                            </Button>
                                        </FileUploadTrigger>
                                        <Popover open={emojiOpen} onOpenChange={setEmojiOpen} >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="cursor-pointer p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-colors"
                                                >
                                                    <Smile className="size-5 " />
                                                    <span className="sr-only">Додати емодзі</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 border-0 shadow-sm" align="start" side='bottom'>
                                                <EmojiPicker
                                                    open={emojiOpen}
                                                    skinTonesDisabled={true}
                                                    searchPlaceHolder="Пошук"
                                                    previewConfig={{
                                                        showPreview: false,
                                                    }}
                                                    autoFocusSearch={false}
                                                    onEmojiClick={(emojiObject) => {
                                                        form.setValue('content', `${form.getValues().content}${emojiObject.emoji}`)
                                                        console.log(emojiObject)
                                                    }} />
                                            </PopoverContent>
                                        </Popover>

                                        <span className="sr-only">Додати зображення</span>
                                    </div>
                                    <Button
                                        className="rounded-lg font-medium px-5 py-1.5 bg-orange-600 text-white cursor-pointer hover:bg-orange-700 transition-all text-sm shadow-sm h-8"
                                        disabled={!form.getValues().content.trim() || isUploading}
                                        onClick={() => onSubmit(form.getValues())}
                                    >
                                        Відправити
                                        <span className="sr-only">Відправити</span>
                                    </Button>
                                </div>
                            </form>
                        </FileUpload>
                    )}
                />
            </div>
        </div>
    )
}
