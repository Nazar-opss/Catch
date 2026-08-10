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
import { isDealExpired } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ClockFading, Copy, ExternalLink, MoreVertical, RotateCcw, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export type DealColumn = {
  id: string;
  title: string;
  link: string | null;
  description: string | null;
  expiresAt: Date | null;
  imageUrls: string[];
  category: CategoryValue;
  newPrice: number;
  oldPrice: number | null;
  authorName?: string;
  authorImage?: string | null;
  temperature?: number;
  isExpired: boolean | null;
  status?: "expired" | "active";
};

const DealActionsCell = ({ deal }: { deal: DealColumn }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const expired = isDealExpired(deal)

  const handleCopy = () => {
    navigator.clipboard.writeText(deal.id)
    toast.success("ID скопійовано!")
  }
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
          <DropdownMenuLabel className="truncate">
            {deal.title}
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/deal/${deal.id}`} className="flex gap-2">
            <ExternalLink className="w-4 h-4"/>
            Переглянути на сайті
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => handleCopy()}
          >
            <Copy className="w-4 h-4" />
            Копіювати ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={() => setEditModal(true)}
          >
            <SquarePen className="w-4 h-4" />
            Редагувати
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={() => setEditModal(true)}
          >
            {expired 
              ? <><RotateCcw className="w-4 h-4" />Відновити</> 
              : <><ClockFading className="w-4 h-4" />Закінчилася</>}           
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteModal(true)}
            className="text-red-600 flex gap-2"
          > 
            <Trash2 className="w-4 h-4"/>
            Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DealDelete
        dealId={deal.id}
        open={deleteModal}
        onOpenChange={setDeleteModal}
      />
      <DealEdit deal={deal} open={editModal} onOpenChange={setEditModal} />
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
      const id = row.original.id;
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
          <Link href={`/deal/${id}`} className="font-medium hover:text-primary">
            {title}
          </Link>
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
    cell: ({row}) => {
      const rating = row.getValue("temperature") as number

      return (
        <span
          className={`font-semibold tabular-nums ${rating >= 0 ? "text-emerald-600" : "text-red-600"} `}
        >
          {rating > 0 ? `+${rating}` : rating}
        </span>
      )
    }
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
    header: "Дії",
    cell: ({ row }) => <DealActionsCell deal={row.original} />,
  },
];
