"use client"
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-clients";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchParamSetter from "@/hooks/useSearchParamSetter";

export default function Settings() {
    const router = useRouter();
    const setParam = useSearchParamSetter()
    const searchParams = useSearchParams()
    const settings = searchParams.get("settings")
    const handleSetting = () => {
        setParam("settings", settings ? null : "true")
    }
    return (
        <div className="flex flex-col gap-2 ">
            <Button variant={"ghost"} onClick={() => handleSetting()} className={`w-full flex items-center cursor-pointer h-full! text-sm px-4 py-2.5 rounded-xl gap-3 border border-border bg-card font-semibold justify-start ${settings ? "border border-primary bg-orange-100/50 text-primary hover:text-primary dark:bg-orange-900/20 hover:bg-orange-100/50" : "hover:bg-transparent text-muted-foreground hover:text-foreground"}  transition-all`}>
                <SettingsIcon className="w-4 h-4" />
                <span className="text-sm ">Налаштування</span>
            </Button>
            <Button variant={"ghost"} onClick={() => signOut({ fetchOptions: { onSuccess: () => { router.push('/') } } })} className="w-full flex items-center cursor-pointer h-full! text-sm px-4 py-2.5 rounded-xl gap-3 border border-border bg-card font-semibold justify-start text-muted-foreground hover:text-foreground transition-all hover:bg-red-50 hover:border-red-200 group">
                <LogOutIcon className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
                <span className="group-hover:text-red-500 transition-colors">Вийти</span>
            </Button>
        </div>
    )
}