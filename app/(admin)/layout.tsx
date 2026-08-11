import AdminHeader from "@/components/admin/AdminHeader";
import AdminSideBar from "@/components/admin/AdminSideBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
          headers: await headers()
      });
  return (
    <div className="flex h-screen overflow-hidden bg-card">
      <AdminSideBar initialSession={session}/>
      <div className="flex flex-col flex-1 w-full">
        <AdminHeader initialSession={session}/>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
