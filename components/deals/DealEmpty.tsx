"use client";
import React, { useState } from "react";
import AddDealForm from "../header/AddDealForm";
import { Button } from "../ui/button";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { redirect } from "next/navigation";

function DealEmpty({tab}: { tab?: string}) {
  const [modal, setModal] = useState(false);
  const content = {
        "userDeals": {
            header: "Ви ще не поділилися жодною знижкою",
            subHeading: "Станьте частиною спільноти — знайшли круту ціну? Розкажіть про неї іншим!",
            buttons: <>
            <Button
            onClick={() => setModal(true)}
            className="items-center justify-center px-5 py-2.5 h-full text-[14px] w-44.25 bg-primary shrink text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700"
          >
            <Plus />
            Додати знижку
          </Button>
          <AddDealForm open={modal} onOpenChange={setModal} />
        </>
        },
        "userBookmarks": {
            header: "Ваш список збереженого порожній",
            subHeading: "Тут будуть зберігатися всі цікаві пропозиції, щоб ви могли повернутися до них пізніше.",
            buttons: 
              <Button
            onClick={() => redirect('/')}
            className="items-center justify-center px-5 py-2.5 h-full text-[14px] w-44.25 bg-primary shrink text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700"
          >
            <Search />
            Шукати знижки
          </Button>
        },
        "userComments": {
            header: "Ви ще не залишили жодного коментаря",
            subHeading: "Долучайтеся до обговорень, діліться відгуками про товари та допомагайте іншим з вибором.",
            buttons:    <Button
            onClick={() => redirect('/')}
            className="items-center justify-center px-5 py-2.5 h-full text-[14px] w-44.25 bg-primary shrink text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700"
          >
            <ArrowLeft/>
            На головну
          </Button>
        }
    };
    const current = content[tab as keyof typeof content]

  return (
    <div className={`text-center ${!tab && "max-w-md"} w-full flex flex-col items-center`}>
      <div className="w-64 h-64 mb-8">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="#f1f5f9"></circle>

          <path
            d="M60 80 L140 80 L150 140 L50 140 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="2"
          ></path>
          <path d="M60 80 L140 80 L140 90 L60 90 Z" fill="#cbd5e1"></path>

          <path
            d="M100 50 L105 65 L120 65 L108 75 L112 90 L100 80 L88 90 L92 75 L80 65 L95 65 Z"
            fill="#f26522"
            opacity="0.4"
          ></path>

          <circle
            cx="120"
            cy="110"
            r="25"
            fill="white"
            stroke="#64748b"
            strokeWidth="3"
          ></circle>
          <line
            x1="140"
            y1="130"
            x2="160"
            y2="150"
            stroke="#64748b"
            strokeWidth="6"
            strokeLinecap="round"
          ></line>

          <circle cx="40" cy="60" r="3" fill="#cbd5e1"></circle>
          <circle cx="160" cy="50" r="4" fill="#f26522" opacity="0.2"></circle>
          <circle cx="170" cy="100" r="2" fill="#cbd5e1"></circle>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-card-foreground mb-4">
        { tab ? current.header : "На жаль, тут порожньо..."}
      </h2>
      <p className="text-base text-slate-600 mb-10 leading-relaxed">
        { tab ? current.subHeading : "Спробуйте змінити фільтри або зачекайте на нові знижки. Можливо, ви самі знайдете щось цікаве?"}
      </p>
      {
        tab ? current.buttons : <>
         <Button
        onClick={() => setModal(true)}
        className="items-center justify-center px-5 py-2.5 h-full text-[14px] bg-primary text-white font-medium rounded-full cursor-pointer transition-all hover:bg-orange-700"
      >
        <Plus />
        Додати знижку
      </Button>
      <AddDealForm open={modal} onOpenChange={setModal} />
        </>
      }
     
    </div>
  );
}

export default DealEmpty;