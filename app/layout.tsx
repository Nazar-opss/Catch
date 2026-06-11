import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Catch",
  description: "Catch - злови свою знижку",
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
        lang="en"
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
                  {children}
              </Providers>
            </ThemeProvider>
        </body>
      </html>
  );
}
