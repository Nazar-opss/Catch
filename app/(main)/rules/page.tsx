import { Button } from "@/components/ui/button";
import {
  Ban,
  CircleAlert,
  CircleCheck,
  CircleX,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

const notAllowedItems = [
  "Реферальні посилання",
  "Будь-який вид спаму",
  "Самопіар власних магазинів",
  `Фейкові "знижки"`,
];

export default function Rules() {
  return (
    <div className="pt-12 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-card-foreground mb-4 tracking-tight">
            Правила користування Catch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ми будуємо найбільшу спільноту мисливців за знижками в Україні.
            Взаємна повага та чесність — наші головні пріоритети.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-green-600/30 transition-colors">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-green-50 flex items-center justify-center shadow-sm">
                <CircleCheck className="text-green-600 w-6 h-6  " />
              </div>
              <div>
                <h2 className="text-xl font-bold text-card-foreground mb-4">
                  Що можна публікувати?
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Ми цінуємо контент, який допомагає іншим заощаджувати кошти.
                  Діліться лише перевіреною інформацією.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CircleCheck className="text-green-600 w-5 h-5 mt-1" />
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      Тільки реальні знижки:
                    </span>
                    <span className="text-muted-foreground">
                      Діліться пропозиціями, які дійсно існують на момент
                      публікації.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CircleCheck className="text-green-600 w-5 h-5 mt-1" />
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      Промокоди та акції:
                    </span>
                    <span className="text-muted-foreground">
                      Публікуйте діючі коди, які дають вигоду при покупці.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CircleCheck className="text-green-600 w-5 h-5 mt-1" />
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      Повна інформація:
                    </span>
                    <span className="text-muted-foreground">
                      Обов&apos;язково вказуйте фінальну ціну зі знижкою та
                      пряме посилання на товар.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-red-600/30 transition-colors">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-red-50 flex items-center justify-center shadow-sm">
                <CircleX className="text-red-600 w-6 h-6  " />
              </div>
              <div>
                <h2 className="text-xl font-bold text-card-foreground mb-4">
                  Заборони
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Для підтримання високої якості платформи, ми суворо стежимо за
                  дотриманням наступних обмежень.
                </p>
                <div className="grid md:grid-cols-2 gap-2">
                  {notAllowedItems.map((item, index) => {
                    return (
                      <div
                        className="flex gap-3 p-4 bg-card items-center rounded-xl border border-border"
                        key={index}
                      >
                        <Ban className="text-red-600 w-6 h-6" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:border-blue-600/30 transition-colors">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center shadow-sm">
                <ShieldAlert className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-card-foreground mb-4">
                  Повага та модерація
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Коментарі та обговорення — серце Catch. Проте ми вимагаємо від
                  користувачів дотримання етичних норм:
                </p>
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        Ніяких образ:
                      </span>
                      <span>
                        Будь-яка агресія, нецензурна лексика або приниження
                        інших учасників неприпустимі.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        Наслідки:
                      </span>
                      <span>
                        Систематичне порушення правил або груба поведінка
                        призводять до вічного бану аккаунту.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-6 bg-orange-50 border border-primary/20 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center shadow-sm">
              <CircleAlert className="text-orange-600 w-6 h-6" />
            </div>
            <p className="text-orange-900 text-sm font-medium leading-relaxed">
              Незнання правил не звільняє від відповідальності, але ми завжди на
              боці чесних користувачів. Дякуємо, що робите Catch кращим!
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-6">
            Маєте питання щодо правил або роботи платформи?
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/contacts">
              <Button className="w-full h-full bg-card border cursor-pointer border-border text-card-foreground px-8 py-4 rounded-2xl font-bold text-lg hover:bg-border transition-all">
                Написати в підтримку
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-fit h-full bg-primary cursor-pointer text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-bg-orange/20">
                На головну
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
