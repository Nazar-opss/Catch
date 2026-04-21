"use client"
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AuthFooter() {
    const pathname = usePathname()

    const content = {
        "/login": {
            title: "Не маєш акаунта?",
            button: "Зареєструватися",
            redirect: "/register"
        },
        "/register": {
            title: "Вже маєш акаунт?",
            button: "Увійти",
            redirect: "/login"
        },
        "/forgot-password": {
            title: "",
            button: "Повернутися до входу",
            redirect: "/login"
        }
    };
    const current = content[pathname as keyof typeof content]
    return (
        pathname === "/reset-password" ? (
            null
        ) : <div className="font-geist mt-8 pt-6 border-t border-slate-100 text-center text-[14px] w-full text-slate-500 flex items-center justify-center">
            <>
                {current.title}
                <Link href={current.redirect} className="flex items-center text-orange-600 font-semibold gap-1 ml-1 hover:text-orange-700 ">
                    {current.button}
                    <ChevronRight color="#ea580c" size={16} strokeWidth={1.5} />
                </Link>
            </>
        </div>
    )
}