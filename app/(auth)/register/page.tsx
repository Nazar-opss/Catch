'use client'
import AuthWrapper from "@/components/auth/authWrapper"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { signIn } from "@/lib/auth-clients"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"

const buttonStyle = "font-geist flex items-center justify-center gap-3 px-4 py-2.5 text-slate-700 rounded-xl border border-slate-200 text-[15px] font-medium cursor-pointer transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-slate-200 focus:outline-none shadow-sm"

export default function RegisterPage() {
    const [pending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>(undefined)

    const handleGoogleSignUp = (provider: 'google') => {
        startTransition(async () => {
            const { error } = await signIn.social({
                provider,
                callbackURL: "/"
            })

            if (error) setError(error.message)
        })
    }

    return (
        <AuthWrapper authType="register">
            <div className="flex flex-col w-full mb-8 gap-3.5">
                <Button variant="outline" disabled={pending} onClick={() => handleGoogleSignUp('google')} className={buttonStyle}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    Продовжити з Google
                </Button>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button variant="outline" className={buttonStyle}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.665 3.717L2.405 10.748C0.605 11.47 0.62 12.478 2.073 12.924L6.776 14.394L17.653 7.532C18.167 7.22 18.636 7.391 18.252 7.732L9.44 15.687L9.088 20.941C9.601 20.941 9.828 20.705 10.101 20.44L12.531 18.077L17.584 21.808C18.514 22.32 19.167 22.052 19.387 20.944L22.651 5.564C22.97 3.868 21.841 3.125 20.665 3.717Z" fill="#24A1DE"></path>
                    </svg>
                    Продовжити з Telegram
                </Button>
            </div>

            <div className="flex items-center w-full gap-4 z-10">
                <div className="w-full h-px bg-slate-200"></div>
                <span className="text-slate-400 font-medium tracking-wide text-[13px] font-geist">або</span>
                <div className="w-full h-px bg-slate-200"></div>
            </div>

        </AuthWrapper>
    )
}