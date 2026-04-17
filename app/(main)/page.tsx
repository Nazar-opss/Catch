import DealsList from "@/components/deals/DealsList";
import { FilterBar } from "@/components/filters/FilterBar";

export default function Home() {
  return (
    <main className="flex flex-1 w-full max-w-7xl flex-col justify-between mx-auto py-8 sm:px-6 px-4 font-geist">
      <FilterBar />
      <DealsList />
    </main>
  );
}
