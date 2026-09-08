import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { Suspense } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full min-h-screen flex items-center justify-center">
            <div className="w-full relative max-w-120 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] items-center sm:p-10 p-6 bg-card rounded-[24px] ">
                <Link href="/" >
                    <div className="flex items-center justify-center text-[22px] font-bold tracking-tight mb-10 gap-2 text-foreground">
                        <Logo />
                        <span className="block md:hidden">Catch</span>
                    </div>
                </Link>
                <Suspense fallback={null}>
                    <AuthHeader />
                    {children}
                    <AuthFooter />
                </Suspense>
            </div>
        </div>
    );
}
