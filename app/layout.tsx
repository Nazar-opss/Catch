import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Catch — Спільнота найкращих знижок та акцій України",
    template: "%s | Catch"
  },
  description: "Шукаєте реальні знижки? На Catch зібрані найкращі акції та промокоди від українських магазинів. Діліться вигодою, голосуйте та економте разом з нами!",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/uk-UA"
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const user = session?.user?.id
  // ? await db
  //     .selectFrom("user")
  //     .select("theme")
  //     .where("id", "=", session.user.id)
  //     .executeTakeFirst()
  // : null;

  // const defaultTheme = user?.theme || "light";

  // TODO: make theme sync with db, make it get theme from db on first load

  return (
    <html
        lang="uk"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <body className="w-full min-h-full h-full flex flex-col bg-background antialiased font-geist">
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                // defaultTheme={defaultTheme}
                enableSystem
                disableTransitionOnChange
                >
                <Providers>
                  {/* <ThemeSync theme={defaultTheme} /> */}
                  <TooltipProvider>
                    {children}
                  </TooltipProvider>
              </Providers>
            </ThemeProvider>
            <SpeedInsights />
            <Toaster/>
        </body>
      </html>
  );
}
