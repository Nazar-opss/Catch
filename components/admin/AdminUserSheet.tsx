"use client";
import { UserColumn } from "@/app/(admin)/admin/users/columns";
import React, { useState, useTransition } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  Ban,
  Logs,
  RotateCcw,
  Unlock,
  UserCog,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import dayjs from "@/lib/dayjs";
import "dayjs/locale/uk";
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { useSearchParams } from "next/navigation";
import AdminRoleSelect from "./AdminRoleSelect";
import { banUser, unbanUser } from "@/lib/actions/user";
import { toast } from "sonner";
import AdminResetRating from "./AdminResetRating";

interface UserSheetProps {
  user: UserColumn;
}

export default function AdminUserSheet({ user }: UserSheetProps) {
  const [imageError, setImageError] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const setParam = useSearchParamSetter();

  const userName = searchParams.get("userName");
  const isOpen = !!userName;
  const handleClose = (open: boolean) => {
    if (!open) {
      setParam("userName", null);
      setImageError(false);
    }
  };

  if (!user && isOpen) return null;

  const initials = user.name?.substring(0, 2).toUpperCase() || "UN";

  const handleBanUser = (userId: string): void => {
    startTransition(async () => {
      const result = await banUser(userId);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success("Користувач успішно забанений");
      }
    });
  };
  const handleUnBanUser = (userId: string): void => {
    startTransition(async () => {
      const result = await unbanUser(userId);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success("Користувач успішно розбанений");
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-full w-full! p-6 overflow-y-auto flex flex-col"
      >
        <SheetHeader className="shrink-0 p-0">
          <SheetTitle className="text-xl">Деталі користувача</SheetTitle>
        </SheetHeader>
        {user && (
          <div className="flex flex-col flex-1">
            <div className="p-6 text-center gap-2 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center border border-border overflow-hidden shrink-0">
                {user.authorImage && !imageError ? (
                  <Image
                    src={user.authorImage}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover h-full w-full"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex w-full h-full items-center justify-center bg-orange-200 text-orange-800 text-5xl font-medium">
                    {initials}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold leading-tight">{user.name}</h2>
              <h3 className="text-sm text-muted-foreground">{user.email}</h3>
              {user.banned === true ? (
                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 ring-1 ring-inset ring-red-600/20 dark:ring-red-500/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  Заблокований
                </div>
              ) : (
                <div className="inline-flex items-center w-fit gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Активний
                </div>
              )}
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-6">
                <div className="p-3 bg-background rounded-xl border border-border text-center">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1">
                    Рейтинг
                  </p>
                  <span
                    className={`font-semibold tabular-nums ${user.karma >= 0 ? "text-emerald-600" : "text-red-600"} `}
                  >
                    {user.karma > 0 ? `+${user.karma}` : user.karma}
                  </span>
                </div>
                <div className="p-3 bg-background rounded-xl border border-border text-center">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    Угоди
                  </p>

                  <span
                    className={`font-semibold tabular-nums text-emerald-600`}
                  >
                    {user.authorDealCount}
                  </span>
                </div>
              </div>
              <div className=" pb-6 space-y-4">
                <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-muted-foreground">Дата реєстрації</span>
                  <span className="font-medium text-card-foreground">
                    {dayjs(user.createdAt).locale("uk").format("DD MMMM YYYY")}
                  </span>
                </div>
                {/* <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-muted-foreground">Останній вхід</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-card-foreground">
                      {dayjs().locale("uk").format("DD MMMM YYYY")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      IP:
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="py-6 border-t border-border space-y-4">
                <div className="">
                  <label
                    className="text-xs font-bold text-muted-foreground uppercase mb-2 block"
                    htmlFor="role-select"
                  >
                    Роль у системі
                  </label>
                  {/* <AdminRoleSelect role={user.role} userId={user.id} /> */}
                  <span>{user.role === "admin" ? "Адміністратор" : "Користувач"}</span>
                  <Button
                    onClick={() => setRoleModal(true)}
                    className="w-full h-full cursor-pointer flex items-center bg-card justify-center gap-2 py-3 mt-2 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted dark:hover:bg-background transition-colors"
                  ><UserCog />Змінити роль</Button>
                </div>
                <Link href={`/user/${user.username}?tab=userDeals`}>
                  <Button className="w-full h-full cursor-pointer flex items-center bg-card justify-center gap-2 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted dark:hover:bg-background transition-colors">
                    <Logs className="text-card-foreground" />
                    Переглянути всі знахідки автора
                  </Button>
                </Link>
              </div>
              <div className="p-4 bg-red-50 dark:bg-destructive/30 rounded-2xl border border-red-100 dark:border-red-800 flex flex-col space-y-3">
                <label
                  className="text-[10px] uppercase font-bold text-red-400 tracking-wider"
                  htmlFor="role-select"
                >
                  Небезпечна зона
                </label>
                <Button
                  onClick={() => setResetModal(true)}
                  className="w-full h-full cursor-pointer flex items-center bg-card justify-center gap-2 py-3 border border-destructive/20 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/20 dark:text-red-200 transition-colors"
                >
                  <RotateCcw />
                  Скинути рейтинг
                </Button>
                {user.banned === false ? (
                  <Button
                    onClick={() => handleBanUser(user.id)}
                    disabled={isPending}
                    className="w-full h-full py-3 cursor-pointer gap-2 bg-red-600 rounded-xl text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm shadow-red-200 dark:shadow-red-800"
                  >
                    <Ban />
                    {isPending === true
                      ? "Блокуєм користувача..."
                      : "Заблокувати користувача"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUnBanUser(user.id)}
                    disabled={isPending}
                    className="w-full h-full py-3 cursor-pointer gap-2 bg-green-600 rounded-xl text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-sm shadow-green-200 dark:shadow-green-800"
                  >
                    <Unlock  />
                    {isPending === true
                      ? "Розблоковуєм користувача..."
                      : "Розблокувати користувача"}
                  </Button>
                )}
              </div>
            </div>

            <SheetFooter className="p-0 sticky"></SheetFooter>
          </div>
        )}
      </SheetContent>
      <AdminResetRating
        userId={user.id}
        open={resetModal}
        onOpenChange={setResetModal}
      />
      <AdminRoleSelect
        role={user.role}
        userId={user.id}
        open={roleModal}
        onOpenChange={setRoleModal}
      />
    </Sheet>
  );
}
