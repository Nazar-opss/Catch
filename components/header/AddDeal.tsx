"use client"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import DealFormContent from "./DealFormContent";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formSchema, DealFormValues } from "@/lib/schemas/dealSchema";
import { X } from "lucide-react";
import z from "zod";
import { toast } from "sonner";

export default function AddDeal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const form = useForm<DealFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
            itemName: "",
            oldPrice: "",
            newPrice: "",
            images: [],
            description: "",
        }
    })

    const isDesktop = useMediaQuery("(min-width: 640px)")

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
    }


    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent showCloseButton={false} className="font-geist mx-auto my-auto max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
                    <DialogHeader className="flex justify-between">
                        <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">Додати нову знижку</DialogTitle>
                        <DialogClose asChild className="">
                            <X className="w-5 h-5 p-2 text-slate-400 bg-transparent rounded-full hover:bg-slate-100" />
                        </DialogClose>

                    </DialogHeader>
                    <div className="p-6 sm:p-8">
                        <DealFormContent form={form} />
                    </div>
                    <DialogFooter >
                        <DialogClose asChild onClick={() => form.reset()}>
                            <Button variant="outline" className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-slate-300">Скасувати</Button>
                        </DialogClose>
                        <DialogClose type="submit" onClick={form.handleSubmit(onSubmit)} asChild>
                            <Button className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-[#ea580c] hover:bg-orange-700 cursor-pointer">Опублікувати</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="font-geist">
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-bold text-slate-900 tracking-tight">Додати нову знижку</DrawerTitle>
                </DrawerHeader>
                <div className="no-scrollbar max-h-[calc(100vh-2rem)] overflow-y-auto p-6 sm:p-8">
                    <DealFormContent form={form} />
                </div>
                <DrawerFooter >
                    <DrawerClose asChild>
                        <Button variant="outline" className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer">Скасувати</Button>
                    </DrawerClose>
                    <DrawerClose type="submit" asChild>
                        <Button className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-[#ea580c] hover:bg-orange-700 cursor-pointer">Додати</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}