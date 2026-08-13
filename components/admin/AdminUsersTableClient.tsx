"use client";
import { columns, UserColumn } from "@/app/(admin)/admin/users/columns";
import dayjs from "@/lib/dayjs";
import React from "react";
import { DataTable } from "./data-table";

export default function AdminUsersTableClient({
  users,
}: {
  users: UserColumn[];
}) {
  const handleExport = (filteredData: UserColumn[]) => {
    const csvContent = filteredData.map((user) => {
      return [
        user.name,
        user.username,
        user.email,
        `${user.role === "admin" ? "Адмін" : "Користувач"}`,
        `${user.banned === true ? "Заблокований" : "Активний"}`,
        user.karma,
        dayjs(user.createdAt).format("DD/MM/YYYY"),
      ].join(",");
    });
    csvContent.unshift(
      [
        "Ім'я користувача/Нікнейм",
        "Унікальний нікнейм",
        "Електронна пошта",
        "Роль",
        "Статус",
        "Рейтинг",
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
      `users_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DataTable
      columns={columns}
      searchKey="name"
      searchPlaceholder="Знайти користувача за ім'ям..."
      data={users}
      onExport={handleExport}
    />
  );
}
