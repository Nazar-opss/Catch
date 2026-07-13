import CategoryFilter from "./CategoryFilter";
import { SortFilter } from "./SortFilter";
import { ViewToggle } from "./ViewToggle";

export function FilterBar() {
    return (
        <div className="flex flex-col w-full justify-between border-b border-border pb-5 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 mb-3">
                <SortFilter />
                <ViewToggle />
            </div>
            <CategoryFilter/>
        </div>
    );
}