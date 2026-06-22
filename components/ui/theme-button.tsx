"use client"
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Theme } from "@/prisma/types/types";
import { toggleTheme } from "@/lib/actions/theme";

export default function ThemeButton() {
const { setTheme, theme } = useTheme(); 
    const [mounted, setMounted] = useState(false);
    // Detect client mount so theme-dependent classes only render after hydration,
    // avoiding an SSR/client mismatch (theme is undefined on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);
    const isDark = mounted && theme === "dark";

    function handleChange(next: Theme) {
    setTheme(next);
    toggleTheme(next);
  }

const themeButtonBase = "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-center text-sm font-medium transition-all duration-200";
    return (
        <div className="flex w-full max-w-63.5 items-center rounded-xl bg-secondary p-1 gap-1">
                    <Button onClick={() => handleChange("light")} className={`${themeButtonBase} ${!isDark ? 'bg-card text-foreground shadow-sm hover:bg-card' : 'text-slate-400 bg-transparent hover:text-slate-200'}`}>
                        <Sun aria-label="Світла" className={ `h-4 w-4 ${!isDark ? 'text-orange-400' : 'text-slate-400'}`} />
                        <p>
                            Світла
                        </p>
                    </Button>
                    <Button onClick={() => handleChange("dark")} className={`${themeButtonBase} ${isDark ? 'bg-slate-700 hover:bg-slate-700 text-foreground shadow-sm' : 'text-slate-400 bg-transparent hover:text-slate-200'}`}>
                        <Moon aria-label="Темна" className={`h-4 w-4 ${isDark ? 'text-orange-400' : 'text-slate-400'}`} />
                        <p>
                            Темна
                        </p>
                    </Button>
                </div>
    )
}