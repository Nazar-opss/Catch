import { DealsCarousel } from "@/components/deals/DealsCarousel";
import NoImage from "@/components/ui/noImage";
import { db } from "@/server/db";
import Image from "next/image";
import { notFound } from "next/navigation";

interface DealPageProps {
    params: Promise<{ id: string }>;
}

export default async function DealPage({ params }: DealPageProps) {


    const { id } = await params;

    const deal = await db
        .selectFrom('deal')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();

    if (!deal) {
        notFound();
    }

    // TODO: Fix solo image display

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {deal.imageUrls.length > 1 ? (
                        <DealsCarousel images={deal.imageUrls} />
                    ) :
                        deal.imageUrls[0] ? (
                            <Image
                                src={deal.imageUrls[0]!}
                                alt={deal.title}
                                width={400}
                                height={400}
                                className="rounded-lg object-contain w-full h-full"
                            />) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <NoImage />
                            </div>
                        )
                    }
                </div>

                <div className="lg:col-span-4 sticky top-24">

                </div>
            </div>
        </main>
    )
}