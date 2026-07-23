"use client"
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { AuthButtons } from "./AuthButtons";
import { Logo } from "../ui/Logo";
import LoggedUser from "./LoggedUser";
import { Session } from "@/lib/auth";

export function Header({ initialSession }: { initialSession: Session | null }) {

    return (
        <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-none gap-6 lg:gap-12" >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-17 flex items-center justify-between gap-4">
                <Link href="/" className="cursor-pointer">
                    <Logo />
                </Link>
                <SearchBar />
                {initialSession ? (
                    <LoggedUser session={initialSession} />
                ) : (
                    <AuthButtons />
                )}
            </div>
        </header>
    )
}