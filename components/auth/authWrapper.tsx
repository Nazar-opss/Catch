import Link from "next/link";
import { Logo } from "../ui/Logo";
import { ChevronRight } from "lucide-react";

export default function AuthWrapper({ children, authType }: { children: React.ReactNode, authType: "login" | "register" }) {
    return (
        <div className="h-full min-h-full flex items-center justify-center font-geist ">
            <div className="w-full relative max-w-[480px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] items-center sm:p-10 p-6 bg-white rounded-[24px] ">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                <Logo className="mb-10 gap-2!" />
                {authType === "login" ? (
                    <div className="mb-8 text-center z-10">
                        <h1 className="font-geist text-[26px] sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2.5">З поверненням</h1>
                        <p className="font-geist text-[15px] text-gray-600 text-center max-w-[320px]">Введіть свої дані, щоб увійти</p>
                    </div>
                ) : (
                    <div className="mb-8 text-center">
                        <h1 className="font-geist text-[26px] sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2.5">Створити акаунт</h1>
                        <p className="font-geist text-[15px] text-gray-600 max-w-[320px]">Приєднуйся до спільноти мисливців за знижками</p>
                    </div>
                )}

                {children}

                <div className="font-geist mt-8 pt-6 border-t border-slate-100 text-center text-[14px] w-full text-slate-500 flex items-center justify-center">
                    {authType === "register" ? (
                        <>
                            Вже маєш акаунт?&nbsp;
                            <Link href="/login" className="flex items-center text-[#ea580c] font-semibold gap-1 ml-1 hover:text-orange-700 ">
                                Увійти
                                <ChevronRight color="#ea580c" size={16} strokeWidth={1.5} />
                            </Link>
                        </>
                    ) : (
                        <>
                            Не маєш акаунта?&nbsp;
                            <Link href="/register" className="flex items-center text-[#ea580c] font-semibold gap-1 ml-1 hover:text-orange-700 ">
                                Зареєструватися
                                <ChevronRight color="#ea580c" size={16} strokeWidth={1.5} />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}