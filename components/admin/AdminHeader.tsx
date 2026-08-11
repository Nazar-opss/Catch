"use client"
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronRight, Menu } from "lucide-react";
import { Logo } from "../ui/Logo";
import AdminNav, { links } from "./AdminNav";
import { usePathname } from "next/navigation";
import ThemeButton from "../ui/theme-button";
import Link from "next/link";
import { Session } from "@/lib/auth";

export default function AdminHeader({initialSession}: {initialSession: Session | null}) {
    const pathname = usePathname()
    const activeLink = links.find(({href}) => pathname === href || pathname.startsWith(`${href}/`));
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center md:justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline"  size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Відкрити меню навігації</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-62.5 p-0">
          <div className="">
            <SheetTitle asChild>
              <div className="flex items-center justify-center gap-2.5 px-6 h-16 border-b border-border">
                <Logo />
                <span className="text-[22px] font-bold tracking-tight text-foreground">
                  Адмін
                </span>
              </div>
            </SheetTitle>
          </div>
          <AdminNav/>
          <ThemeButton/>
        </SheetContent>
      </Sheet>
      <div className="flex">
        <span className="flex text-muted-foreground">
            <Link href="/admin">
              Адмін
            </Link>
            <ChevronRight />
            <p className="first-letter:uppercase text-card-foreground">{activeLink?.label ?? "Головна"}</p>
        </span>
      </div>
    </header>
  );
}
