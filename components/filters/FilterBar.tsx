import { CategoryTabs } from "./CategoryTabs";
import { ViewToggle } from "./ViewToggle";

export function FilterBar() {
    return (
        <div className="flex flex-col justify-between lg:flex-row lg:items-center gap-5 border-b border-slate-200 pb-5 mb-8">
            <CategoryTabs />
            <ViewToggle />
        </div>
    );
}