"use client";

import { columns, DealColumn } from "@/app/(admin)/admin/deals/columns";
import dayjs from "@/lib/dayjs";
import { DataTable } from "./data-table";

export default function AdminDealsTableClient({
  deals,
}: {
  deals: DealColumn[];
}) {
  const handleExport = (filteredData: DealColumn[]) => {
    const csvContent = filteredData.map((deal) => {
      return [
        `"${deal.title?.replace(/"/g, '""')}"`,
        deal.authorName,
        deal.newPrice,
        deal.oldPrice,
        `${deal.oldPrice ? `${Math.round(((deal.oldPrice - deal.newPrice) / deal.oldPrice) * 100)}% off` : "Немає старої ціни"}`,
        deal.temperature,
        deal.category,
        deal.isExpired ? "Закінчилась" : "Активна",
        dayjs(deal.createdAt).fromNow(),
      ].join(",");
    });
    csvContent.unshift(
      [
        "Назва товару",
        "Автор",
        "Нова ціна",
        "Стара ціна",
        "Процентна знижка",
        "Рейтинг",
        "Категорія",
        "Статус",
        "Дата додавання",
      ].join(","),
    );
    const blob = new Blob([csvContent.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `deals_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  }
  return (
    <DataTable 
      columns={columns} 
      data={deals} 
      searchKey="title" 
      searchPlaceholder="Знайти знижку за назвою..." 
      onExport={handleExport}
    />
  )
}
