import React from "react";
import { Logo } from "../ui/Logo";
import AdminNav from "./AdminNav";
import ThemeButton from "../ui/theme-button";
import { Session } from "@/lib/auth";
import Image from "next/image";

export default function AdminSideBar({
  initialSession,
  inSheet = false,
}: {
  initialSession: Session | null;
  inSheet?: boolean;
}) {
  return (
    <aside
      className={
        inSheet
          ? "flex h-full w-full flex-col bg-card"
          : "hidden fixed inset-y-0 left-0 z-40 h-full w-64 -translate-x-full flex-col border-r border-border bg-card transition-transform md:flex lg:static lg:translate-x-0"
      }
    >
      <div className="flex items-center h-full justify-center gap-2.5 px-6 max-h-16 border-b border-border">
        <Logo />
        <p className="text-[22px] font-bold tracking-tight text-foreground">
          Адмін
        </p>
      </div>
      <div className="flex flex-col h-full justify-between">
        <AdminNav />
        <div>
          <div className="pb-4 px-4">
            <ThemeButton />
          </div>
          <div className="p-4 border-t border-border flex items-center gap-3">
            <Image
              src={initialSession?.user.image ?? "/icons/avatar-default.svg"}
              alt={initialSession?.user.name ?? "Автор публікації"}
              className="bg-muted w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {initialSession?.user.name}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {initialSession?.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
