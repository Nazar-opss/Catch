'use client'
import Settings from "./settings";
import { Selectable } from "kysely";
import { User } from "@/prisma/types/types";
import ProfileUserInfo from "./ProfileUserInfo";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function ProfileCard({ user, isOwnProfile }: { user: Selectable<User>, isOwnProfile: boolean }) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // Detect client mount so theme-dependent classes only render after hydration,
    // avoiding an SSR/client mismatch (theme is undefined on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);
    const isDark = mounted && theme === "dark";
    const themeButtonBase =
        "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-center text-sm font-medium transition-all duration-200";
    return (
        <div className=" bg-card rounded-[24px] border border-border shadow-sm p-8 flex flex-col gap-8">
            <ProfileUserInfo user={user} isOwnProfile={isOwnProfile} />
            <div className="w-full h-px bg-secondary "></div>
            <div className="w-full flex flex-col items-start text-left bg-orange-50/50 dark:bg-orange-950/20 p-5 rounded-2xl border border-orange-100/50 dark:border-orange-900/30">
                <div className="flex gap-2 items-center text-[15px] font-bold text-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary">
                        <path d="M12 2C12 2 8 6 8 11C8 14 10 16 10 16C10 16 9 14 10 12C10 12 14 16 13 20C13 20 18 16 18 11C18 6 12 2 12 2Z"></path>
                        <path d="M11.5 22C9 22 7 20 7 17.5C7 16 8.5 13 8.5 13C8.5 13 7.5 15 8.5 17.5C8.5 17.5 12 21 15.5 18C15.5 18 14 22 11.5 22Z" opacity="0.4"></path>
                    </svg>
                    Карма спільноти
                </div>
                <span className="text-[42px] leading-none  font-bold text-primary mt-3 tracking-tighter">{user.karma > 0 ? `+${user.karma}` : user.karma}</span>
                <p className="text-[13px] text-muted-foreground leading-snug font-medium mt-2.5">{isOwnProfile
                    ? "Це загальний рейтинг усіх ваших знахідок."
                    : "Це загальний рейтинг усіх знахідок користувача."}</p>
            </div>
            {isOwnProfile && <div className="w-full h-px bg-secondary " />}
            {isOwnProfile && (
                <div className="w-full">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1.5">
                            Керування:
                        </h4>
                        <Settings />
                </div>
            )}
            <div className="w-full">
                <span className="px-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Тема:</span>
                <div className="mt-3 flex w-full items-center rounded-xl bg-secondary p-1 gap-2">
                    <Button onClick={() => setTheme("light")} className={`${themeButtonBase} ${!isDark ? 'bg-card text-foreground shadow-sm hover:bg-card' : 'text-slate-400 bg-transparent hover:text-slate-200'}`}>
                        <Sun className={`h-4 w-4 ${!isDark ? 'text-orange-400' : 'text-slate-400'}`} />
                        Світла
                    </Button>
                    <Button onClick={() => setTheme("dark")} className={`${themeButtonBase} ${isDark ? 'bg-slate-700 hover:bg-slate-700 text-foreground shadow-sm' : 'text-slate-400 bg-transparent hover:text-slate-200'}`}>
                        <Moon className={`h-4 w-4 ${isDark ? 'text-orange-400' : 'text-slate-400'}`} />
                        Темна
                    </Button>
                </div>
            </div>
        </div>
    )
}