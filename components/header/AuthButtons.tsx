import Link from "next/link";
import { Button } from "../ui/button";

export function AuthButtons() {
    return (
        <div className="flex items-center gap-3">
            <Link href="/login">
                <Button variant="outline" className="items-center hidden sm:flex justify-center px-5 py-2.5 h-full text-muted-foreground rounded-full border border-border text-[14px] font-medium cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-300">
                    Увійти
                </Button>
            </Link>
            <Link href="/register">
                <Button className="items-center justify-center px-5 py-2.5 h-full text-[14px] bg-primary text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700">
                    Зареєструватися
                </Button>
            </Link>
        </div>
    )
}