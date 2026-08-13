"use client";
import { DealColumn } from "@/app/(admin)/admin/deals/columns";
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import Image from "next/image";
import { ClockFading, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { dealPercentCalculate, getShopIcon, getShopName } from "@/lib/utils";
import dayjs from "@/lib/dayjs";
import DealEdit from "../deals/DealEdit";
import DealDelete from "../deals/DealDelete";

interface DealSheetProps {
  deals: DealColumn[];
}

export default function AdminDealSheet({ deals }: DealSheetProps) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const searchParams = useSearchParams();

  const setParam = useSearchParamSetter();

  const dealId = searchParams.get("dealId");
  const isOpen = !!dealId;

  const deal = deals.find((d) => d.id === dealId);

  if (!deal) return null;

  const handleClose = (open: boolean) => {
    if (!open) {
      setParam("dealId", null);
      setImageError(false);
    }
  };

  if (!deal && isOpen) return null;

  const imageUrl = deal?.imageUrls?.[0];
  const initials = deal?.title?.substring(0, 2).toUpperCase() || "UN";

  const categoryValue = deal?.category;
  const category = CATEGORIES.find((c) => c.value === categoryValue);

  const dealPercent = dealPercentCalculate(deal.oldPrice, deal.newPrice);
  const memberSince = deal.authorCreatedAt
    ? new Intl.DateTimeFormat("uk-UA", { year: "numeric" }).format(
        deal.authorCreatedAt,
      )
    : null;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-125 p-6 overflow-y-auto flex flex-col">
        <SheetHeader className="mb-6 shrink-0 p-0">
          <SheetTitle className="text-xl">Деталі знижки</SheetTitle>
        </SheetHeader>
        {deal && (
          <div className="flex flex-col relative flex-1">
            <div className="w-full h-62.5 bg-muted rounded-lg flex items-center justify-center border border-border overflow-hidden shrink-0">
              {imageUrl && !imageError ? (
                <Image
                  src={imageUrl}
                  alt={deal.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex w-full h-full items-center justify-center bg-orange-200 text-orange-800 text-5xl font-medium">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold leading-tight">{deal.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-lg font-bold">
                  {new Intl.NumberFormat("uk-UA", {
                    style: "currency",
                    currency: "UAH",
                  }).format(deal.newPrice)}
                </span>
                {deal.oldPrice && (
                  <span className="text-slate-400 line-through text-sm">
                    {new Intl.NumberFormat("uk-UA", {
                      style: "currency",
                      currency: "UAH",
                    }).format(deal.oldPrice || 0)}
                  </span>
                )}
                {dealPercent ? (
                  <span
                    className={`bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 ml-auto py-0.5 rounded font-bold tracking-wide border border-red-200 dark:border-red-500/30 "text-[12px]}`}
                  >
                    {dealPercent > 0
                      ? `-${dealPercent}%`
                      : `+${dealPercent.toString().split("-")[1]}%`}
                  </span>
                ) : null}
                <span className="bg-secondary absolute top-3 left-3 text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium capitalize">
                  <div className="flex items-center gap-2">
                    <span>{category?.icon}</span>
                    <span className="font-medium">{category?.label}</span>
                  </div>
                </span>
                {deal.isExpired && (
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    <ClockFading className="w-3.5 h-3.5" />
                    Закінчилася
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-6 mt-6">
                <div className="gap-2 text-slate-500 text-sm font-medium">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    Продавець
                  </p>
                  {deal.link && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={getShopIcon(deal.link)}
                        alt={getShopName(deal.link)}
                        width={32}
                        height={32}
                      />
                      <p className="text-lg text-card-foreground">
                        {getShopName(deal.link)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="gap-2 text-slate-500 text-sm font-medium">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    Опубліковано
                  </p>
                  <span className="text-lg text-card-foreground">
                    {dayjs(deal.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Автор публікації
                </p>
                <div className="mt-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Image
                      src={deal.authorImage ?? "/icons/avatar-default.svg"}
                      alt={deal.authorName ?? "Автор публікації"}
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                      unoptimized
                    />
                    <div className="min-w-0">
                      <Link
                        href={`/user/${deal.authorUsername}`}
                        className="truncate font-semibold text-card-foreground hover:text-primary transition-colors"
                      >
                        {deal.authorName ?? "Невідомий автор"}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {memberSince
                          ? `Учасник з ${memberSince}`
                          : "Дата реєстрації невідома"}
                        {deal.authorDealCount != null &&
                          ` • ${deal.authorDealCount} угод`}
                      </p>
                    </div>
                    <Link
                      className="ml-auto"
                      href={`/user/${deal.authorUsername}`}
                    >
                      <ExternalLink className="transition-colors hover:text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
              {deal.description && (
                <div className="mt-6 pt-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Опис знижки
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 mt-2 whitespace-pre-wrap max-h-75 overflow-y-auto rounded-xl">
                    <p>{deal.description}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1"></div>
            <SheetFooter className="p-0 sticky">
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border shrink-0">
                <Button
                  asChild
                  className="w-full h-12 py-3 bg-primary hover:bg-orange-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                  variant="default"
                >
                  <Link href={`/deal/${deal.id}`} target="_blank">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Перейти на сторінку знижки
                  </Link>
                </Button>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setEditModal(true)}
                    variant="outline"
                    className="flex-1 cursor-pointer h-10.5 py-2.5 border border-border text-card-foreground rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Редагувати
                  </Button>
                  <DealEdit
                    deal={deal}
                    open={editModal}
                    onOpenChange={setEditModal}
                  />
                  <Button
                    onClick={() => setDeleteModal(true)}
                    variant="destructive"
                    className="flex-1 cursor-pointer h-10.5 py-2.5 border border-border text-card-foreground rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Видалити
                  </Button>
                  <DealDelete
                    dealId={deal.id}
                    open={deleteModal}
                    onOpenChange={setDeleteModal}
                  />
                </div>
              </div>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
