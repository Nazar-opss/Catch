"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"

export default function useSearchParamSetter() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [pending, startTransition] = useTransition()

    return useCallback((keyOrParams: string | Record<string, string | null>, value?: string | null) => {
        const params = new URLSearchParams(searchParams)
        if (typeof keyOrParams === "string") {
            if (value === null || value === undefined) params.delete(keyOrParams)
            else params.set(keyOrParams, value)
        } else {
            Object.entries(keyOrParams).forEach(([k, v]) => {
                if (v === null) params.delete(k)
                else params.set(k, v)
            })
        }
        startTransition(() => {
            router.replace(`${pathname}?${params}`, { scroll: false })
        })
    }, [startTransition, router, pathname, searchParams])
}