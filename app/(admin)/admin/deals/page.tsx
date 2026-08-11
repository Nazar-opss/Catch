import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { Download } from "lucide-react";
import { DataTable } from "../../../../components/admin/data-table";
import { columns } from "./columns";
import AdminDealSheet from "@/components/admin/AdminDealSheet";

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
        <Button
          variant="outline"
          className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Download className="w-5 h-5" />
          Експортувати
        </Button>
      </div>
      <DataTable columns={columns} searchKey="title" searchPlaceholder="Знайти знижку за назвою..." data={deals} />
      <AdminDealSheet deals={deals}/>
    </>
  );
}
