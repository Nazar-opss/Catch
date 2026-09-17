"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  MoreVertical,
  RotateCcw,
  Unlock,
  User,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import AdminResetRating from "@/components/admin/AdminResetRating";
import { banUser, unbanUser } from "@/lib/actions/user";
import { Badge } from "@/components/ui/badge";
import AdminRoleSelect from "@/components/admin/AdminRoleSelect";

export type UserColumn = {
  id: string;
  name: string;
  username: string | null;
  email: string | null;
  authorImage: string | null;
  karma: number;
  role: "user" | "admin";
  banned?: boolean | null;
  createdAt: Date;
  authorDealCount?: number | null;
};

const ROLE_BADGE_PROPS: Record<
  string,
  {
    label: string;
    variant?:
      | "default"
      | "secondary"
      | "link"
      | "destructive"
      | "outline"
      | "ghost";
    className?: string;
  }
> = {
  admin: {
    label: "Адміністратор",
    className:
      "bg-blue-100 text-blue-700 h-full hover:bg-blue-100/80 dark:bg-blue/15 dark:text-blue-400 ring-1 ring-blue-600/20",
  },
  user: {
    label: "Користувач",
    variant: "secondary",
    className: "h-full"
  },
};

const UserActionsCell = ({ user }: { user: UserColumn }) => {
  const [resetModal, setResetModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Відкрити меню</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <Link href={`/admin/users?userName=${user.username}`}>
            <DropdownMenuItem className="flex gap-2">
              <User className="w-4 h-4" />
              Деталі користувача
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={() => setRoleModal(true)}
          >
            <UserCog className="w-4 h-4" />
            Змінити роль
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={() => setResetModal(true)}
          >
            <RotateCcw className="w-4 h-4" />
            Скинути рейтинг
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.banned === false ? (
            <DropdownMenuItem
              onSelect={() => banUser(user.id)}
              className="text-red-600 flex gap-2"
            >
              <Ban className="w-4 h-4" />
              Заблокувати
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => unbanUser(user.id)}
              className="text-green-600 flex gap-2"
            >
              <Unlock className="w-4 h-4" />
              Розблокувати
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
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
    </>
  );
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Користувач",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const image = row.original.authorImage;
      const username = row.original.username;
      const email = row.original.email;

      const initials = name?.substring(0, 2).toUpperCase() || "UN";

      return (
        <Link
          href={`/admin/users?userName=${username}`}
          className="font-medium hover:text-primary"
        >
          <div className="flex items-center gap-2">
            {image ? (
              <Image
                src={image || initials}
                alt={name}
                className="rounded-full w-6 h-6"
                width={24}
                unoptimized
                quality={90}
                height={20}
              />
            ) : (
              <span className="font-medium bg-orange-200 rounded-full w-6 h-6 text-center justify-center pt-0.5">
                {initials}
              </span>
            )}
            <div className="flex flex-col">
              <span className="font-medium text-sm leading-none">{name}</span>
              <div className="flex gap-1 items-center mt-1">
                <span className="text-xs text-muted-foreground">
                  @{username}
                </span>
                <div className="w-1 h-1 rounded-full  bg-muted-foreground"></div>
                <span className="text-xs text-muted-foreground">{email}</span>
              </div>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const config = ROLE_BADGE_PROPS[role] || ROLE_BADGE_PROPS.default;
      return (
        <Badge variant={config.variant} className={config.className}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "banned",
    header: "Статус",
    cell: ({ row }) => {
      const isBanned = row.getValue("banned") as boolean;

      return (
        <Badge
          className={`inline-flex h-full w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset ${
            isBanned
              ? "bg-red-100 text-red-700 ring-red-600/20 dark:bg-red-500/15 dark:text-red-400 dark:ring-red-500/25"
              : "bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/25"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isBanned ? "bg-red-500" : "bg-emerald-500"}`}
          />
          {isBanned ? "Заблокований" : "Активний"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "karma",
    header: "Рейтинг",
    cell: ({ row }) => {
      const karma = row.getValue("karma") as number;
      return (
        <span
          className={`font-semibold tabular-nums ${karma >= 0 ? "text-emerald-600" : "text-red-600"} `}
        >
          {karma > 0 ? `+${karma}` : karma}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Приєднався",
    cell: ({ row }) => {
      const time = row.getValue("createdAt") as Date;
      return <span>{dayjs(time).format("DD/MM/YYYY")}</span>;
    },
  },
  {
    id: "actions",
    header: "Дії",
    cell: ({ row }) => <UserActionsCell user={row.original} />,
  },
];
