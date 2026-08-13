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
import { Ban, MoreVertical, RotateCcw, User, UserCog } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import dayjs from "@/lib/dayjs";

export type UserColumn = {
  id: string;
  name: string;
  username: string | null;
  email: string | null;
  authorImage: string | null;
  karma: number;
  role: string | null;
  banned?: boolean | null;
  createdAt: Date;
};

const UserActionsCell = ({ user }: { user: UserColumn }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
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
          <DropdownMenuItem
            className="flex gap-2"
            // onClick={() => navigator.clipboard.writeText(user.id)}
          >
            <User className="w-4 h-4" />
            Переглянути профіль
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={() => setEditModal(true)}
          >
            <UserCog className="w-4 h-4" />
            Змінити роль
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={() => setEditModal(true)}
          >
            <RotateCcw className="w-4 h-4" />
            Скинути рейтинг
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteModal(true)}
            className="text-red-600 flex gap-2"
          >
            <Ban className="w-4 h-4" />
            Заблокувати
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <DealDelete
        dealId={deal.id}
        open={deleteModal}
        onOpenChange={setDeleteModal}
      /> */}
      {/* <DealEdit 
        deal={deal} 
        open={editModal} 
        onOpenChange={setEditModal} 
      /> */}
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
              <span className="text-xs text-muted-foreground">@{username}</span>
              <div className="w-1 h-1 rounded-full  bg-muted-foreground"></div>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      if (role !== "admin")
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground ring-1 ring-inset ring-border">
            Користувач
          </span>
        );

      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue/15 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-500/25">
          {role === "admin" && "Адмін"}
        </span>
      );
    },
  },
  {
    accessorKey: "banned",
    header: "Статус",
    cell: ({ row }) => {
      const banned = row.getValue("banned") as boolean;
      if (banned === true) {
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 ring-1 ring-inset ring-red-600/20 dark:ring-red-500/25">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
            Заблокований
          </div>
        );
      }
      return (
        <div className="inline-flex items-center w-fit gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/25">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Активний
        </div>
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
