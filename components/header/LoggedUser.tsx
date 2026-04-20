import { signOut, useSession } from "@/lib/auth-clients"
import { Button } from "../ui/button"
import { BookmarkIcon, ChevronDown, LogOutIcon, Plus, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"
import AddDeal from "./AddDeal"

export default function LoggedUser() {
    const { data: session, isPending } = useSession()
    const [modal, setModal] = useState(false)

    return (
        <div className="flex items-center gap-4 sm:gap-6">
            <AddDeal open={modal} onOpenChange={setModal} />
            <Button onClick={() => setModal(true)} className="items-center justify-center px-5 py-2.5 h-full text-[14px] bg-[#ea580c] text-white font-geist font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700">
                <Plus />
                Додати знижку
            </Button>
            <div className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-transparent transition-all hover:bg-slate-100 hover:border-slate-200 cursor-pointer">
                <img className="w-8 h-8 rounded-full" src={session?.user?.image ?? undefined} alt={session?.user?.name ?? undefined} />
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        {/* <div className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-transparent transition-all hover:bg-slate-100 hover:border-slate-200 cursor-pointer"> */}
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                        {/* </div> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="font-geist bg-white/50 backdrop-blur-md text-slate-900 mt-2.5 border-slate-200 ">
                        <DropdownMenuItem className="cursor-pointer">
                            <UserIcon />
                            Профіль
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <BookmarkIcon />
                            Збережене
                        </DropdownMenuItem>
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