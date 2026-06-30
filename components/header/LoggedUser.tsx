import { signOut } from "@/lib/auth-clients"
import { Button } from "../ui/button"
import { BookmarkIcon, ChevronDown, LogOutIcon, Plus, Settings, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"
import AddDealForm from "./AddDealForm"
import { Session } from "@/lib/auth";
import Link from "next/link"
import Image from "next/image"
import ThemeButton from "../ui/theme-button"

export default function LoggedUser({ session }: { session: Session }) {
    const [modal, setModal] = useState(false)
    // TODO: add notifications

    return (
        <div className="flex items-center gap-4 sm:gap-6">
            <AddDealForm open={modal} onOpenChange={setModal} />
            <Button onClick={() => setModal(true)} className="items-center justify-center px-5 py-2.5 h-full text-[14px] bg-[#ea580c] text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700">
                <Plus />
                Додати знижку
            </Button>
            <div className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-transparent transition-all hover:bg-secondary hover:border-border cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image className="rounded-full object-cover h-full w-full" width={32} height={32} unoptimized quality={90} src={session?.user?.image || "/icons/avatar-default.svg"} alt={session?.user?.name ?? "Користувач"} />
                </div>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className=" w-64 bg-card/50 backdrop-blur-md text-foreground mt-2.5 border-border ">
                        <DropdownMenuLabel className="flex gap-3 items-center">  
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image className="rounded-full object-cover" width={32} height={32} unoptimized quality={90} src={session?.user?.image || "/icons/avatar-default.svg"} alt={session?.user?.name ?? "Користувач"} />
                            </div>           
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-card-foreground truncate">{session?.user?.name}</span>
                                <span className="text-xs text-muted-foreground truncate">{session?.user?.email}</span>
                            </div>          
                        </DropdownMenuLabel>
                        <div className="h-px bg-secondary my-1 mx-2"></div>
                        <Link href={`/user/${session?.user?.username}?tab=userDeals`}>
                            <DropdownMenuItem className="cursor-pointer">
                                <UserIcon />
                                Профіль
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/user/${session?.user?.username}/?tab=userBookmarks`}>
                            <DropdownMenuItem className="cursor-pointer">
                                <BookmarkIcon />
                                Збережене
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/user/${session?.user?.username}?settings=true`}>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings />
                                Налаштування
                            </DropdownMenuItem>
                        </Link>
                        <div className="h-px bg-secondary my-1 mx-2"></div>
                        <div className="px-2 py-2">
                            <ThemeButton/>
                        </div>
                        <div className="h-px bg-secondary my-1 mx-2"></div>
                        <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                            <LogOutIcon />
                            Вийти
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}