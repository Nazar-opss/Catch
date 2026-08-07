'use client'
import { FileJson, Settings, Tags, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const links = [
  { href: "/admin/deals", label: "Знижки", icon: Tags },
  { href: "/admin/users", label: "Користувачі", icon: Users },
  { href: "/admin/import", label: "Імпорт JSON", icon: FileJson },
  { href: "/admin/settings", label: "Налаштування", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2 p-4">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        const Icon = link.icon;

        return (
            <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all 
                    ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                `}
            >
                <Icon className="w-5 h-5"/>
                {link.label}
            </Link>
        )
      })}
    </nav>
  );
}
