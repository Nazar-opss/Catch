import { db } from '@/server/db'
import AdminUsersTableClient from '@/components/admin/AdminUsersTableClient'

export default async function AdminUsersPage() {
  const users = await db
      .selectFrom("user")
      .select(["id", "karma", "name", "username", "image as authorImage", "email", "role", "banned", "createdAt" ])
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
      <AdminUsersTableClient users={users} />
    </>
  )
}
