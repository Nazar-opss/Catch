import { CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function CategoryRibbon() {
    const [emblaRef, embla] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps",
    })
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)

    const onSelect = useCallback(() => {
        if(!embla) return;
            setShowLeftArrow(embla.canScrollPrev)
            setShowRightArrow(embla.canScrollNext)
    }, [embla])

    useEffect(() => {
       if(!embla) return;
       // eslint-disable-next-line react-hooks/set-state-in-effect -- initial sync from embla (no "select" event fires on init)
       onSelect();
       embla.on("select", onSelect).on("reInit",onSelect);

       return () => { embla.off("select", onSelect).off("reInit", onSelect); };
    },[embla, onSelect])

    const sp = useSearchParams();
    const active = sp.get("category")

    const href = (value?: string) => {
        const params = new URLSearchParams(sp.toString());
        if (value) {
            params.set("category", value);
        } else {
            params.delete("category");
        }
        const q = params.toString();
        return q ? `?${q}` : "?"
    }

     const arrowBtn =
    "flex h-8 w-8 items-center justify-center rounded-full border bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800";

  return (
    <div className="relative my-4 w-full">
      {showLeftArrow && (
        <div className="absolute left-0 top-0 z-10 flex h-full items-center bg-linear-to-r from-background via-background to-transparent pl-1 pr-8">
          <button onClick={() => embla?.scrollPrev()} className={arrowBtn} aria-label="Гортати ліворуч">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex items-center gap-2 py-1">
          <Link
            href={href()}
            scroll={false}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              !active
                ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
            )}
          >
            Усі знижки
          </Link>

          {CATEGORIES.map((cat) => {
            const isActive = active === cat.value;
            return (
              <Link
                key={cat.value}
                href={href(cat.value)}
                scroll={false}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
                )}
              >
                <span aria-hidden>{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {showRightArrow && (
        <div className="absolute right-0 top-0 z-10 flex h-full items-center bg-linear-to-l from-background via-background to-transparent pl-8 pr-1">
          <button onClick={() => embla?.scrollNext()} className={arrowBtn} aria-label="Гортати праворуч">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
