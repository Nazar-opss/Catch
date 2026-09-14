"use client"
import { DealColumn } from "@/app/(admin)/admin/deals/columns";
import { useSearchParams } from "next/navigation";
import React from "react";
import AdminDealsTableClient from "./AdminDealsTableClient";
import AdminDealSheet from "./AdminDealSheet";

export default function AdminDealWrapper({ deals }: { deals: DealColumn[] }) {
  const searchParams = useSearchParams();
  const dealId = searchParams.get("dealId");
  const selectedDeal = deals.find((d) => d.id === dealId) || null;
  return (
  <>
    <AdminDealsTableClient deals={deals} />
    {selectedDeal && <AdminDealSheet deal={selectedDeal} />}
  </>
  )
}
