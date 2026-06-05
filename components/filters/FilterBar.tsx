import { SortFilter } from "./SortFilter";
import { ViewToggle } from "./ViewToggle";

export function FilterBar() {
    return (
        <div className="flex flex-col w-full justify-between lg:flex-row lg:items-center gap-5 border-b border-border pb-5 mb-8">
            <SortFilter />
            <ViewToggle />
        </div>
    );
}