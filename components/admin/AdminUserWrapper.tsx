"use client"
import { UserColumn } from "@/app/(admin)/admin/users/columns";
import { useSearchParams } from "next/navigation";
import AdminUserSheet from "./AdminUserSheet";
import AdminUsersTableClient from "./AdminUsersTableClient";

export default function AdminUserWrapper({ users }: { users: UserColumn[] }) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const selectedUser = users.find((u) => u.username === userName) || null;
  return (
  <>
    <AdminUsersTableClient users={users} />
    {selectedUser && <AdminUserSheet user={selectedUser} />}
  </>
  )
}
