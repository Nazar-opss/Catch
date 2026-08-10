import { DataTable } from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'
import { columns } from './columns'
import { db } from '@/server/db'

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
        <Button
          variant="outline"
          className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Download className="w-5 h-5" />
          Експортувати
        </Button>
      </div>
      <DataTable columns={columns} searchKey="name" searchPlaceholder="Знайти користувача за ім'ям..." data={users} />
    </>
  )
}
