import Settings from "./settings";
import { Selectable } from "kysely";
import { User } from "@/prisma/types/types";
import ProfileUserInfo from "./ProfileUserInfo";
import ThemeButton from "../ui/theme-button";


export default function ProfileCard({ user, isOwnProfile }: { user: Selectable<User>, isOwnProfile: boolean }) {
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
                <ThemeButton/>
            </div>
        </div>
    )
}