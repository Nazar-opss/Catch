'use client'
import Settings from "./settings";
import { Selectable } from "kysely";
import { User } from "@/prisma/types/types";
import ProfileUserInfo from "./ProfileUserInfo";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";


export default function ProfileCard({ user, isOwnProfile }: { user: Selectable<User>, isOwnProfile: boolean }) {
    const isDarkMode = false;
     const { setTheme } = useTheme()
    const themeButtonBase =
        "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-center text-sm font-medium transition-all duration-200";
    return (
        <div className=" bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 flex flex-col gap-8">
            <ProfileUserInfo user={user} isOwnProfile={isOwnProfile} />
            <div className="w-full h-px bg-slate-100 "></div>
            <div className="w-full flex flex-col items-start text-left bg-orange-50/50 p-5 rounded-2xl border border-orange-100/50">
                <div className="flex gap-2 items-center text-[15px] font-bold text-slate-900">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ea580c]">
                        <path d="M12 2C12 2 8 6 8 11C8 14 10 16 10 16C10 16 9 14 10 12C10 12 14 16 13 20C13 20 18 16 18 11C18 6 12 2 12 2Z"></path>
                        <path d="M11.5 22C9 22 7 20 7 17.5C7 16 8.5 13 8.5 13C8.5 13 7.5 15 8.5 17.5C8.5 17.5 12 21 15.5 18C15.5 18 14 22 11.5 22Z" opacity="0.4"></path>
                    </svg>
                    Карма спільноти
                </div>
                <span className="text-[42px] leading-none  font-bold text-orange-600 mt-3 tracking-tighter">{user.karma > 0 ? `+${user.karma}` : user.karma}</span>
                <p className="text-[13px] text-slate-500 leading-snug font-medium mt-2.5">{isOwnProfile
                    ? "Це загальний рейтинг усіх ваших знахідок."
                    : "Це загальний рейтинг усіх знахідок користувача."}</p>
            </div>
            {isOwnProfile && <div className="w-full h-px bg-slate-100 " />}
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
                <div className="mt-3 flex w-full items-center rounded-xl bg-slate-100 p-1">
                    <Button onClick={() => setTheme("light")} className={`${themeButtonBase} ${isDarkMode ? 'bg-slate-100 text-slate-400 hover:bg-white' : 'bg-white text-slate-900 hover:bg-white'}`}>
                        <Sun className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-orange-400'}`} />
                        Світла
                    </Button>
                    <Button onClick={() => setTheme("dark")} className={`${themeButtonBase} ${isDarkMode ? 'bg-white text-slate-900 hover:bg-white' : 'bg-slate-100 text-slate-400 hover:bg-transparent hover:text-slate-500'}`}>
                        <Moon className={`h-4 w-4 ${isDarkMode ? 'text-orange-400' : ''}`} />
                        Темна
                    </Button>
                </div>
            </div>
        </div>
    )
}