"use client";
import DealDelete from "@/components/deals/DealDelete";
import DealEdit from "@/components/deals/DealEdit";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES, CategoryValue } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type DealColumn = {
  id: string;
  title: string;
  link: string | null;
  description: string | null;
  expiresAt: Date | null;
  imageUrls: string[];
  category:CategoryValue;
  newPrice: number;
  oldPrice: number | null;
  authorName?: string;
  authorImage?: string | null;
  temperature?: number;
  status?: "expired" | "active";
};

const DealActionsCell = ({ deal }: { deal: DealColumn }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Відкрити меню</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Дії</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(deal.id)}
          >
            Копіювати ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setEditModal(true)}>
            Редагувати
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setDeleteModal(true)}
            className="text-red-600"
          >
            Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DealDelete
        dealId={deal.id}
        open={deleteModal}
        onOpenChange={setDeleteModal}
      />
      <DealEdit 
        deal={deal} 
        open={editModal} 
        onOpenChange={setEditModal} 
      />
    </>
  );
};

export const columns: ColumnDef<DealColumn>[] = [
  {
    accessorKey: "title",
    header: "Назва товару",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const imageUrl = row.original.imageUrls[0];
      const initials = title?.substring(0, 2).toUpperCase() || "UN";

      return (
        <div className="flex items-center gap-2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={60}
              height={60}
              className="rounded-md w-15 h-15"
            />
          ) : (
            <span className="p-5 font-medium bg-orange-200 rounded-md">
              {initials}
            </span>
          )}
          <span className="font-medium">{title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "authorName",
    header: "Автор ",
    cell: ({ row }) => {
      const name = row.getValue("authorName") as string;
      const image = row.original.authorImage;

      const initials = name?.substring(0, 2).toUpperCase() || "UN";

      return (
        <div className="flex items-center gap-2">
          <Image
            src={image || initials}
            alt={name}
            className="rounded-full w-6 h-6"
            width={24}
            unoptimized
            quality={90}
            height={20}
          />
          <span className="font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "newPrice",
    header: "Нова ціна",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("newPrice"));

      const formatted = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        currencyDisplay: "code",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "oldPrice",
    header: "Стара ціна",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("oldPrice"));
      if (!price) {
        return <div className="font-medium">Поле не вказане</div>;
      }
      const formatted = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        currencyDisplay: "code",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "temperature",
    header: "Рейтинг",
  },
  {
    accessorKey: "category",
    header: "Категорія",
    cell: ({ row }) => {
      const categoryValue = row.getValue("category") as string;
      const category = CATEGORIES.find((c) => c.value === categoryValue);

      if (category) {
        return (
          <div className="flex items-center gap-2">
            <span>{category.icon}</span>
            <span className="font-medium">{category.label}</span>
          </div>
        );
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DealActionsCell deal={row.original} />,
  },
];
