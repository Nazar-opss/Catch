import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import Settings from "./settings";
import { Selectable } from "kysely";
import { User } from "@/prisma/types/types";

export default function ProfileCard({ user, isOwnProfile }: { user: Selectable<User>, isOwnProfile: boolean }) {
    return (
        <div className=" bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-5 group">
                    <div className="w-28 h-28 rounded-full p-1 bg-white border border-slate-200 group-hover:border-orange-200 transition-colors shadow-sm">
                        <img className="rounded-full w-full h-full object-cover" src={user.image ?? undefined} alt={user.name ?? undefined} />
                    </div>
                    {isOwnProfile && (
                        <Button className="absolute cursor-pointer bottom-0 right-0 p-2 bg-white border border-slate-200 shadow-sm hover:text-orange-600 hover:border-orange-200 transition-colors opacity-0 group-hover:opacity-100 rounded-full" variant={"outline"} size={"icon"}>
                            <Camera />
                        </Button>
                    )}

                </div>
                <span className="text-lg font-bold">{user.name}</span>
                <span className="text-sm text-slate-500 font-medium mt-1.5">Зареєстрований з: {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="w-full h-px bg-slate-100 "></div>
            <div className="w-full flex flex-col items-start text-left bg-orange-50/50 p-5 rounded-2xl border border-orange-100/50">
                <div className="flex gap-2 items-center text-[15px] font-bold text-slate-900">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ea580c]">
                        <path d="M12 2C12 2 8 6 8 11C8 14 10 16 10 16C10 16 9 14 10 12C10 12 14 16 13 20C13 20 18 16 18 11C18 6 12 2 12 2Z"></path>
                        <path d="M11.5 22C9 22 7 20 7 17.5C7 16 8.5 13 8.5 13C8.5 13 7.5 15 8.5 17.5C8.5 17.5 12 21 15.5 18C15.5 18 14 22 11.5 22Z" opacity="0.4"></path>
                    </svg>
                    Карма спільноти
                </div>
                <span className="text-[42px] leading-none font-bold text-orange-600 mt-3 tracking-tighter">{user.karma > 0 ? `+${user.karma}` : user.karma}</span>
                <p className="text-[13px] text-slate-500 leading-snug font-medium mt-2.5">{isOwnProfile
                    ? "Це загальний рейтинг усіх ваших знахідок."
                    : "Це загальний рейтинг усіх знахідок користувача."}</p>
            </div>
            {isOwnProfile && <div className="w-full h-px bg-slate-100 " />}
            {isOwnProfile && (
                <div className="w-full">
                    <>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1.5">
                            Керування:
                        </h4>
                        <Settings />
                    </>
                </div>
            )}
        </div>
    )
}