"use client"
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { AuthButtons } from "./AuthButtons";
import { Logo } from "../ui/Logo";
import { useSession } from "@/lib/auth-clients";
import LoggedUser from "./LoggedUser";

export function Header() {
    const { data: session } = useSession()


    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-none gap-6 lg:gap-12" >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[68px] flex items-center justify-between gap-4">
                <Link href="/" className="cursor-pointer">
                    <Logo />
                </Link>
                <SearchBar />
                {session ? <LoggedUser /> : <AuthButtons />}

            </div>
        </header>
    )
}