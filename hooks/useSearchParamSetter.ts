"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"

export default function useSearchParamSetter() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [pending, startTransition] = useTransition()

    return useCallback((key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams)
        if (value === null) params.delete(key)
        else params.set(key, value)
        startTransition(() => {
            router.replace(`${pathname}?${params}`, { scroll: false })
        })
    }, [startTransition, router, pathname, searchParams, pending])
}