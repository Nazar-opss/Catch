import { signOut } from "@/lib/auth-clients"
import { Button } from "../ui/button"
import { BookmarkIcon, ChevronDown, LogOutIcon, Plus, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"
import AddDealForm from "./AddDealForm"
import { Session } from "@/lib/auth";
import Link from "next/link"
import Image from "next/image"

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
            <div className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-transparent transition-all hover:bg-slate-100 hover:border-slate-200 cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image className="rounded-full object-cover h-full w-full" width={32} height={32} unoptimized quality={90} src={session?.user?.image || "/icons/avatar-default.svg"} alt={session?.user?.name ?? "Користувач"} />
                </div>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-white/50 backdrop-blur-md text-slate-900 mt-2.5 border-slate-200 ">
                        <Link href={`/user/${session?.user?.username}`}>
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