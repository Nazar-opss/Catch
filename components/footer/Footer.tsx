'use client'
import Link from "next/link";
import { Logo } from "../ui/Logo";
import FacebookIcon from "../ui/facebook";
import InstagramIcon from "../ui/instagram";
import { Button } from "../ui/button";
import TelegramIcon from "../ui/telegramIcon";
import ThemeButton from "../ui/theme-button";
import { usePathname, useRouter } from "next/navigation";

const socials = [
  {
    name: "Facebook",
    element: <FacebookIcon size={16} />,
  },
  {
    name: "Instagram",
    element: <InstagramIcon size={16} />,
  },
  {
    name: "Telegram",
    element: <TelegramIcon size={16} />,
  },
];

const footerNav = [
  {
    link: "/privacy-policy",
    title: "Політика конфіденційності",
  },
  {
    link: "/rules",
    title: "Правила",
  },
  {
    link: "/about",
    title: "Про нас",
  },
  {
    link: "/help",
    title: "Допомога",
  },
  {
    link: "/contacts",
    title: "Контакти",
  },
];

export default function Footer() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <footer className="flex justify-center items-center bg-card border-t border-border py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <Link
            href={"/"}
            className="flex items-center text-[22px] font-bold tracking-tight text-foreground"
          >
            <Logo />
            <span className="block sm:hidden">Catch</span>
          </Link>
          <ul className="flex items-center justify-center flex-wrap gap-8 text-sm font-medium text-muted-foreground">
            {footerNav.map((e) => {
              return (
                <Link
                  key={e.title}
                  href={e.link}
                  className={`hover:text-orange-600  transition-colors ${pathname === e.link ? "text-orange-600 font-bold" : ""}`}
                >
                  {e.title}
                </Link>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            {socials.map((e) => {
              return (
                <Button
                  key={e.name}
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full cursor-pointer hover:bg-orange-100 hover:text-[#ea580c] h-8! w-8! border-0 bg-secondary p-1"
                >
                  {e.element}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-between mt-8 pt-6 border-t gap-8 items-center md:flex-row md:items-start">
          <div className="border-secondary text-center text-sm text-muted-foreground">
            © 2026 Catch - Спільнота найкращих знижок України.
          </div>
          <ThemeButton />
        </div>
      </div>
    </footer>
  );
}
