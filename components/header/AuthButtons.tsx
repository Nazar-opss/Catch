import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

export function AuthButtons() {

  return (
    <div className="flex items-center gap-3">
      <Button
      asChild
        variant="outline"
        className="items-center hidden sm:flex justify-center px-5 py-2.5 h-full text-muted-foreground rounded-full border border-border text-[14px] font-medium cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-300"
      >
        <Link href="/login">Увійти</Link>
      </Button>
      <Button
       asChild
        className="items-center justify-center px-5 py-2.5 h-full text-[14px] bg-primary text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700"
      >
        <Link href="/register">
          <span className="hidden sm:inline">Зареєструватися</span>          
          <LogIn className="sm:hidden w-5 h-5" />
        </Link>
      </Button>
    </div>
  );
}
