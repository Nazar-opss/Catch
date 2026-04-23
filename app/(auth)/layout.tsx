import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import { Logo } from "@/components/ui/Logo";
import { Suspense } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full min-h-full flex items-center justify-center">
            <div className="w-full relative max-w-[480px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] items-center sm:p-10 p-6 bg-white rounded-[24px] ">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                <Logo className="mb-10 gap-2!" />
                <Suspense fallback={null}>
                    <AuthHeader />
                    {children}
                    <AuthFooter />
                </Suspense>
            </div>
        </div>
    );
}
