"use client"
import { usePathname } from 'next/navigation'

export default function AuthHeader() {
    const pathname = usePathname()

    const content = {
        "/login": {
            title: "З поверненням",
            description: "Введіть свої дані, щоб увійти",
        },
        "/register": {
            title: "Створити акаунт",
            description: "Приєднуйся до спільноти мисливців за знижками",
        },
        "/forgot-password": {
            title: "Скидання паролю",
            description: "Введіть свою електронну пошту, щоб скинути пароль",
        },
        "/reset-password": {
            title: "Створіть новий пароль",
            description: "Введіть новий пароль для вашого акаунта",
        }
    };

    const current = content[pathname as keyof typeof content]

    return (
        <div className="mb-8 text-center z-10">
            <h1 className="text-[26px] sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2.5">{current?.title}</h1>
            <p className="text-[15px] text-gray-600 text-center max-w-[320px]">{current?.description}</p>
        </div>
    )
}