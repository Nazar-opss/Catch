"use client"
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-clients";
import { useRouter } from "next/navigation";

export default function Settings() {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-2 ">
            <Button variant={"ghost"} className="w-full flex items-center cursor-pointer h-full! text-sm px-4 py-2.5 rounded-xl gap-3 border border-slate-200 bg-white font-semibold justify-start hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all">
                <SettingsIcon className="w-4 h-4" />
                <span className="text-sm ">Налаштування</span>
            </Button>
            <Button variant={"ghost"} onClick={() => signOut({ fetchOptions: { onSuccess: () => { router.push('/') } } })} className="w-full flex items-center cursor-pointer h-full! text-sm px-4 py-2.5 rounded-xl gap-3 border border-slate-200 bg-white font-semibold justify-start text-slate-700 hover:text-slate-900 transition-all hover:bg-red-50 hover:border-red-200 group">
                <LogOutIcon className="w-4 h-4 text-slate-700 group-hover:text-red-500 transition-colors" />
                <span className="group-hover:text-red-500">Вийти</span>
            </Button>
        </div>
    )
}