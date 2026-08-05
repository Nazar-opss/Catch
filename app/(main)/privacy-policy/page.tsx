import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="border-b border-slate-100 py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-card-foreground tracking-tight mb-4">
            Політика конфіденційності Catch
          </h1>
          <p className="text-muted-foreground text-lg">
            Останнє оновлення: Серпень 2026
          </p>
        </div>
      </div>
      <div className="bg-card">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="space-y-12 max-w-none">
            <section>
              <h2 className="flex items-center gap-2 text-2xl mb-4 font-bold">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-muted-foreground text-sm font-bold">
                  1
                </span>
                Які дані ми збираємо?
              </h2>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                  <span>
                    <strong className="text-card-foreground">
                      Дані облікового запису{" "}
                    </strong>
                    (ім&apos;я, email, фото при авторизації через Google);
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                  <span>
                    <strong className="text-card-foreground">
                      Ваша активність{" "}
                    </strong>
                    (опубліковані знижки, коментарі, оцінки);
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                  <span>
                    <strong className="text-card-foreground">
                      Технічні дані{" "}
                    </strong>
                    (анонімізована інформація для захисту від спаму).
                  </span>
                </li>
              </ul>
            </section>
            <section>
              <h2 className="flex items-center gap-2 text-2xl mb-4 font-bold">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-muted-foreground text-sm font-bold">
                  2
                </span>
                Як ми використовуємо ваші дані?
              </h2>
              <ul className="space-y-4 list-none pl-0 mb-6">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                  <p>Для підтримки профілю;</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                  <p>Для відображення авторства;</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                  <p>Для аналізу статистики сайту.</p>
                </li>
              </ul>
              <div className="bg-orange-50 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="font-bold text-primary m-0">
                  Ми ніколи не продаємо ваші персональні дані третім особам.
                </p>
              </div>
            </section>
            <section>
              <h2 className="flex items-center gap-2 text-2xl mb-4 font-bold">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-muted-foreground text-sm font-bold">
                  3
                </span>
                Використання файлів Cookie
              </h2>
              <p>
                Використовуємо технічні cookie для збереження вашої авторизації
                та анонімізовані cookie для базової аналітики відвідуваності. Це
                допомагає нам покращувати сервіс та забезпечувати стабільну
                роботу платформи.
              </p>
            </section>
            <section>
              <h2 className="flex items-center gap-2 text-2xl mb-4 font-bold">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-muted-foreground text-sm font-bold">
                  4
                </span>
                Зберігання та захист даних
              </h2>
              <p>
                Усі дані надійно зберігаються на сучасних захищених серверах. Ми
                не маємо доступу до ваших паролів, оскільки використовуємо
                безпечну авторизацію через надійних провайдерів і сучасні методи
                шифрування.
              </p>
            </section>
            <section>
              <h2 className="flex items-center gap-2 text-2xl mb-4 font-bold">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-muted-foreground text-sm font-bold">
                  5
                </span>
                Ваші права
              </h2>
              <p className="mb-6">
                Ви є власником своїх даних. Ви маєте право переглядати,
                змінювати інформацію у профілі, або запитати повне видалення
                вашого акаунта.
              </p>
              <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                <Mail className="bg-card p-1 rounded-full shadow-sm text-muted-foreground" />
                <p className="m-0 text-muted-foreground">
                  Для цього напишіть нам на{" "}
                  <Link href="/contacts" className="text-primary font-bold">
                    support@catch.ua
                  </Link>
                </p>
              </div>
            </section>
            <Link href="/">
              <Button className="w-fit h-full bg-card border cursor-pointer border-border text-card-foreground px-8 py-4 rounded-2xl font-bold text-lg hover:bg-border transition-all">
                На головну
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
