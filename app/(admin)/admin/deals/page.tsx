import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { Download } from "lucide-react";
import { DataTable } from "../../../../components/admin/data-table";
import { columns } from "./columns";
import AdminDealSheet from "@/components/admin/AdminDealSheet";
import AdminDealsTableClient from "@/components/admin/AdminDealsTableClient";

export default async function AdminDealPage() {
  const deals = await db
    .selectFrom("deal")
    .innerJoin("user", "user.id", "deal.authorId")
    .select([
      "deal.id",
      "deal.title",
      "deal.link",
      "deal.description",
      "deal.expiresAt",
      "deal.authorId",
      "deal.imageUrls",
      "deal.category",
      "deal.newPrice",
      "deal.oldPrice",
      "deal.temperature",
      "deal.isExpired",
      "deal.createdAt",
      "user.name as authorName",
      "user.image as authorImage",
      "user.createdAt as authorCreatedAt",
      "user.username as authorUsername",
      (eb) =>
        eb
          .selectFrom("deal as authorDeal")
          .select(eb.fn.countAll<number>().as("count"))
          .whereRef("authorDeal.authorId", "=", "deal.authorId")
          .as("authorDealCount"),
    ])
    .orderBy("deal.createdAt", "desc")
    .execute();
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Управління угодами
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Відстежуйте, модеруйте та керуйте всіма пропозиціями, опублікованими
            учасниками спільноти.
          </p>
        </div>
      </div>
      <AdminDealsTableClient deals={deals} />
      <AdminDealSheet deals={deals}/>
    </>
  );
}
