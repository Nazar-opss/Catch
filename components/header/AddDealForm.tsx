"use client"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import DealFormContent from "../deals/DealFormContent";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formSchema, DealFormValues } from "@/lib/schemas/dealSchema";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createDealAction } from "@/lib/actions/deal";
import { useState } from "react";

export default function AddDealForm({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [dealType, setDealType] = useState<"online" | "offline">("online")

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

    const isDesktop = useMediaQuery("(min-width: 640px)")

    async function onSubmit(values: DealFormValues) {
        const formData = new FormData();
        values.images.forEach((image) => {
            formData.append("files", image);
        });

        const uploadResult = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        // fix showing error with images
        const data = await uploadResult.json();

        values.images = data.urls.map((image: { secure_url: string }) => image.secure_url);
        console.log(values)
        const result = await createDealAction(values)
        console.log(result)
        if (result?.success) {
            toast.success(result.success)
            form.reset()
            onOpenChange(false)
        } else {
            toast.error(result?.error)
        }
    }


    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent showCloseButton={false} aria-describedby="Додати нову знижку" className="mx-auto my-auto max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
                    <DialogHeader className="flex justify-between bg-card">
                        <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">Додати нову знижку</DialogTitle>
                        <DialogClose className="w-5 h-5 p-2 bg-transparent items-center box-content flex justify-center rounded-full cursor-pointer text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors">
                            <X height={20} width={20} className="" aria-hidden={false} />
                        </DialogClose>
                    </DialogHeader>
                    <div className="flex items-center w-full bg-secondary rounded-xl p-1">
                        <button onClick={() => setDealType("online")} className={`flex cursor-pointer transition-all duration-200 gap-2 px-4 p-1.5 w-full font-medium justify-center items-center text-[13px] rounded-lg ${dealType === "online" ? "bg-[#ea580c] text-white shadow-sm" : "text-muted-foreground"} `}>
                            <span className="hidden sm:inline">
                                Онлайн
                            </span>
                        </button>
                        <button onClick={() => setDealType("offline")} className={`flex cursor-pointer gap-2 px-4 transition-all duration-200 p-1.5 font-medium w-full justify-center items-center text-[13px] rounded-lg ${dealType === "offline" ? "bg-[#ea580c] text-white shadow-sm" : "text-muted-foreground"} `}>
                            <span className="hidden sm:inline">
                                Офлайн
                            </span>
                        </button>
                    </div>
                    <div className="p-6 sm:p-8">
                        <DealFormContent form={form} dealType={dealType} />
                    </div>
                    <DialogFooter >
                        <DialogClose asChild onClick={() => form.reset()}>
                            <Button variant="outline" className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-border">Скасувати</Button>
                        </DialogClose>
                        <DialogClose type="submit" onClick={form.handleSubmit(onSubmit)} asChild>
                            <Button className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-primary hover:bg-orange-700 cursor-pointer">Опублікувати</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-bold text-card-foreground tracking-tight">Додати нову знижку</DrawerTitle>
                </DrawerHeader>
                <div className="no-scrollbar max-h-[calc(100vh-2rem)] overflow-y-auto p-6 sm:p-8">
                    <DealFormContent form={form} />
                </div>
                <DrawerFooter >
                    <DrawerClose asChild>
                        <Button variant="outline" className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer">Скасувати</Button>
                    </DrawerClose>
                    <DrawerClose type="submit" asChild>
                        <Button className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-card-foreground bg-primary hover:bg-orange-700 cursor-pointer">Додати</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}