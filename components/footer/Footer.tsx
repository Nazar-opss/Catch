import Link from "next/link";
import { Logo } from "../ui/Logo";
import FacebookIcon from "../ui/facebook";
import InstagramIcon from "../ui/instagram";
import Telegram from "../ui/telegram";
import { Button } from "../ui/button";
import TelegramIcon from "../ui/telegramIcon";



export default function Footer() {
    return (
        <footer className="flex justify-center items-center bg-card border-t border-border py-10 mt-12">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href={"/"} className="flex items-center">
                        <Logo />
                    </Link>
                    <ul className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <Link href={"/rules"} className="hover:text-orange-600 transition-colors">Правила</Link>
                        <Link href={"/about"} className="hover:text-orange-600 transition-colors">Про нас</Link>
                        <Link href={"/help"} className="hover:text-orange-600 transition-colors">Допомога</Link>
                        <Link href={"/contact"} className="hover:text-orange-600 transition-colors">Контакти</Link>
                    </ul>
                    <div className="flex items-center gap-4">
                        <Button variant={"outline"} size={"icon"} className="rounded-full cursor-pointer hover:bg-orange-100 hover:text-[#ea580c] h-8! w-8! border-0 bg-secondary p-1">
                            <FacebookIcon size={16} />
                        </Button>
                        <Button variant={"outline"} size={"icon"} className="rounded-full cursor-pointer hover:bg-orange-100 hover:text-[#ea580c] border-0 bg-secondary p-1 h-8! w-8!">
                            <InstagramIcon size={16} />
                        </Button>
                        <Button variant={"outline"} size={"icon"} className="rounded-full cursor-pointer hover:bg-orange-100 hover:text-[#ea580c] border-0 bg-secondary p-1 h-8! w-8!">
                            <TelegramIcon size={16} />
                        </Button>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-secondary text-center text-xs text-slate-400">
                    © 2026 Catch - Спільнота найкращих знижок України.
                </div>
            </div>
        </footer>
    )
}