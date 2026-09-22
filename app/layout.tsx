import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import { getTheme } from "@/lib/actions/theme";
import { ThemeSync } from "@/components/theme-sync";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const theme = (await getTheme()) ?? "light";

  return (
    <html
        lang="uk"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <body className="w-full min-h-full h-full flex flex-col bg-background antialiased font-geist">
            <ThemeProvider
                attribute="class"
                defaultTheme={theme}
                enableSystem
                disableTransitionOnChange
                >
                <Providers>
                  <ThemeSync theme={theme} />
                  <TooltipProvider>
                    {children}
                  </TooltipProvider>
              </Providers>
            </ThemeProvider>
            <SpeedInsights />
            <Analytics />
            <Toaster/>
        </body>
      </html>
  );
}
