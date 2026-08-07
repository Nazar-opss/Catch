"use client";
import AddDealForm from "@/components/header/AddDealForm";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-clients";
import { ChevronsUpDown, Flame, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const howItWorks = [
  {
    icon: <Search className="w-10 h-10 text-muted-foreground" />,
    title: "Діліться знахідками",
    description:
      "Ви знаходите круту знижку в магазині або в інтернеті та публікуєте її на Catch для всієї спільноти.",
  },
  {
    icon: <ChevronsUpDown className="w-10 h-10 text-muted-foreground" />,
    title: "Голосуйте",
    description: `Спільнота голосує "+" або "-", визначаючи "температуру" знижки. Чим більше плюсів, тим гарячіша пропозиція!`,
  },
  {
    icon: <Flame className="w-10 h-10 text-muted-foreground" />,
    title: `Ставайте "Гарячими"`,
    description: `Найкращі та найвигідніші пропозиції за рейтингом користувачів автоматично потрапляють у розділ "Гарячі".`,
  },
];

export default function About() {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false)
  return (
    <div className="text-center items-center justify-center">
      <section className="py-12 md:py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-card-foreground mb-6 leading-tight">
          Catch — Спільнота найкращих
          <br></br>
          <span className="text-primary">знижок України</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Ми — спільнота мисливців за знижками, які допомагають один одному
          заощаджувати гроші на щоденних покупках. Наша платформа об&apos;єднує
          тисячі користувачів, які щодня знаходять та діляться найкращими
          пропозиціями.
        </p>
      </section>
      <section className="py-24 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              Як це працює
            </h2>
            <div className="w-12 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {howItWorks.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-orange-50 dark:group-hover:bg-orange-200 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 border-y border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 text-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-card-foreground mb-6">
              Наша місія
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Ми прагнемо створити платформу, де кожен може знайти найкращі
              пропозиції та знижки, економлячи час та гроші. Наша спільнота
              допомагає один одному робити покупки більш вигідними та приємними.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ми віримо, що вільний обмін інформацією допомагає кожному купувати
              розумніше. Наша мета — створити простір, де лише реальні люди
              оцінюють реальні пропозиції, допомагаючи спільноті знаходити
              справжню вигоду.
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square bg-card rounded-3xl shadow-xl p-8 flex items-center justify-center relative overflow-hidden">
              {/* <div className="absolute inset-0 opacity-5"></div> */}
              <div className="text-center z-10">
                <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-6" />
                <div className="text-2xl font-bold text-card-foreground">
                  100% Чесність
                </div>
                <div className="text-muted-foreground font-medium">
                  Без реклами та ботів
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 text-center bg-card">
        <div className="max-w-3xl mx-auto">
          {!session ? (
            <>
              <h2 className="text-3xl font-bold text-card-foreground mb-8">
                Приєднуйтесь до Catch вже сьогодні
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button className="w-fit h-full bg-primary cursor-pointer text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-bg-orange/20">
                    Почати економити
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full h-full cursor-pointer bg-card border border-border text-card-foreground  px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    Переглянути знижки
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-card-foreground mb-8">
                Готові поділитися крутою знахідкою?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AddDealForm open={modal} onOpenChange={setModal} />
                <Button onClick={() => setModal(true)} className="w-fit h-full bg-primary cursor-pointer text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-bg-orange/20">
                  Додати знижку
                </Button>
                <Link href="/">
                  <Button className="w-full h-full bg-card border cursor-pointer border-border text-card-foreground px-8 py-4 rounded-2xl font-bold text-lg hover:bg-border transition-all">
                    На головну
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
