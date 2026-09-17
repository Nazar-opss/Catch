import { db } from "@/server/db";
import AdminUserWrapper from "@/components/admin/AdminUserWrapper";

export default async function AdminUsersPage() {
  const users = await db
    .selectFrom("user")
    .select((eb) => [
      "user.id",
      "user.karma",
      "user.name",
      "user.username",
      "user.image as authorImage",
      "user.email",
      "user.role",
      "user.banned",
      "user.createdAt",
      eb
        .selectFrom("deal")
        .select(eb.fn.countAll<number>().as("count"))
        .whereRef("deal.authorId", "=", "user.id")
        .as("authorDealCount"),
    ])
    .orderBy("user.createdAt", "desc")
    .execute();
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Управління користувачами
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Перегляд, пошук та управління учасниками платформи та їхніми ролями.
          </p>
        </div>
      </div>
      <AdminUserWrapper
        users={users.map((user) => ({
          ...user,
          role: user.role === "admin" ? "admin" : "user",
        }))}
      />
    </>
  );
}
