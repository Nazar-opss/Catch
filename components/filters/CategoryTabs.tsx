"use client"
import { CategoryButton } from "./CategoryButton";

export function CategoryTabs() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <CategoryButton category="Гарячі" active={true} />
            <CategoryButton category="Нові" active={false} />
            <CategoryButton category="Обговорювані" active={false} />
        </div>
    )
}