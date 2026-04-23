"use client"
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { AuthButtons } from "./AuthButtons";
import { Logo } from "../ui/Logo";
import { useSession } from "@/lib/auth-clients";
import LoggedUser from "./LoggedUser";

export function Header() {
    const { data: session, isPending } = useSession()


    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-none gap-6 lg:gap-12" >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[68px] flex items-center justify-between gap-4">
                <Link href="/" className="cursor-pointer">
                    <Logo />
                </Link>
                <SearchBar />
                {isPending ? (
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="h-11 w-44 rounded-full bg-orange-200 animate-pulse" />
                        <div className="h-11 w-19 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                ) : session ? (
                    <LoggedUser session={session} />
                ) : (
                    <AuthButtons />
                )
                }
            </div>
        </header>
    )
}