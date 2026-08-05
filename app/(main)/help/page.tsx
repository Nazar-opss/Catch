"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqItems = [
  {
    question: "Що означають градуси біля знижки?",
    answer: `Це "температура" пропозиції. Користувачі голосують за знижку, і якщо вона справді вигідна, температура росте. Чим вища температура, тим гарячіша пропозиція!`,
  },
  {
    question: "Чому мою знижку приховали?",
    answer:
      "Найчастіше це стається, якщо така знижка вже була опублікована (дублікат), товар закінчився в наявності, або посилання містило реферальний код без відповідної позначки. Також ми модеруємо контент, який не відповідає правилам спільноти.",
  },
  {
    question: "Як змінити нікнейм або аватарку?",
    answer: `Перейдіть у свій "Профіль", натисніть "Налаштування" і оновіть свої дані. Зверніть увагу, що нікнейм можна змінювати лише один раз на 30 днів.`,
  },
  {
    question: "Я знайшов підозріле посилання. Що робити?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const FaqItem = ({ item }: { item: (typeof faqItems)[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-2xl shadow-sm hover:border-slate-300 transition-colors border border-border bg-card data-open:bg-card"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full bg-card p-0 rounded-2xl hover:bg-card dark:hover:bg-card px-6 py-5 h-full cursor-pointer text-[16px] md:text-lg whitespace-normal font-semibold text-card-foreground aria-expanded:bg-card border"
        >
          {item.question}
          <ChevronDownIcon
            className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : ""} `}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex items-start px-6 pb-5 text-[16px] leading-relaxed overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div>{item.answer}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default function Help() {
  return (
    <div className="w-full max-w-5xl mx-auto items-start py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-card-foreground mb-4">
          Допомога та часті запитання
        </h1>
        <h2 className="text-lg text-muted-foreground max-w-xl mx-auto">
          Ми зібрали відповіді на найбільш популярні запитання наших
          користувачів, щоб ваш досвід користування Catch був максимально
          приємним.
        </h2>
      </div>
      <div className="space-y-4">
        {faqItems.map((item, index) => {
          return <FaqItem key={index} item={item} />;
        })}
      </div>
      <div className="mt-16 bg-card border border-border rounded-3xl p-10 shadow-sm items-center text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 shadow-sm">
          <Mail className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground mb-2">
            Не знайшли відповідь?
        </h3>
        <p className="text-muted-foreground mb-8">
            Напишіть нам на <span className="font-semibold text-card-foreground">support@catch.ua</span>, і ми допоможемо вам у найкоротші терміни.
        </p>
        <Link href="/contacts">
            <Button className="rounded-xl px-8 py-4 h-full cursor-pointer font-semibold gap-2 shadow-md bg-card-foreground text-card hover:bg-card-foreground/90 hover:text-card transition-colors">
            <Send className="w-4 h-4" />
            Зв&apos;язатися з підтримкою
            </Button>
        </Link>
      </div>
    </div>
  );
}
