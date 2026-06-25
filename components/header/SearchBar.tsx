"use client"
import { SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import useDebounced from "@/hooks/useDebounced";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { DealWithAuthor } from "@/app/(main)/page";
import { CommandInput, Command, CommandList, CommandItem, CommandEmpty, CommandGroup } from "../ui/command";
import Image from "next/image";


export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [, startTransition] = useTransition()

    const [value, setValue] = useState(searchParams.get("q") ?? "")
    const [open, setOpen] = useState(false)
    const [results, setResults] = useState<DealWithAuthor[]>([])
    const [loading, setLoading] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)
    
    const debounce = useDebounced(value, 300)

    useEffect(() => {
        const q = debounce.trim()
        if (!q) return

        const ctrl = new AbortController()
        let cancelled = false

        const run = async () => {
            setLoading(true)
            try {
                const result = await fetch(`/api/deals?q=${encodeURIComponent(q)}&limit=6`, {signal: ctrl.signal})
                const page = await result.json()
                if(!cancelled) setResults(page.items ?? [])
            } catch {
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        run()
        return () => { cancelled = true; ctrl.abort()}
    }, [debounce])

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", onClick)
        return () => document.removeEventListener("mousedown", onClick)
    }, [])

    const goToSearch = (q: string) => {
        setOpen(false)
        startTransition(() => {
            router.push(q.trim() ? `/?q=${encodeURIComponent(q.trim())}` : "/")
        })
    }

    const goToDeal = (id: string) => {
        setOpen(false)
        router.push(`/deal/${id}`)
    }

    const showList = open && value.trim().length > 0

    return (
        <div ref={boxRef} className="flex-1 max-w-2xl relative hidden md:block ">
            <Command shouldFilter={false} className="bg-transparent overflow-visible focus-within:ring-2 focus-within:ring-primary transition-all" onKeyDown={(e) => {if (e.key === "Escape") setOpen(false)} }>
                    <CommandInput 
                        value={value}
                        onValueChange={(v) => {setValue(v); setOpen(true)}}
                        onFocus={() => value && setOpen(true)}
                        placeholder="Шукати знижки, товари, магазини..."
                        className="flex-1 h-auto p-0 border-0 text-[15px] placeholder:text-slate-400 focus:ring-0 "
                        wrapperClassName="border-0 px-0 flex-1"
                    />
                {/* </div> */}
                { showList && (
                    <CommandList className="absolute z-50 w-full top-full mt-2 rounded-2xl border border-border bg-card shadow-lg max-h-100">
                        <CommandItem
                            value={`__search__${value}`}
                            onSelect={() => goToSearch(value)}
                            className="text-primary"
                        >
                            <SearchIcon className="h-4 w-4 mr-2" />
                            Показати всі результати для «{value.trim()}»
                        </CommandItem>

                    {loading && (
                        <div className="px-3 py-3 text-sm text-muted-foreground">Шукаю…</div>
                    )}

                    {!loading && results.length === 0 &&
                        <CommandEmpty>Нічого не знайдено</CommandEmpty>
                    }

                    {
                        results.length > 0 && (
                            <CommandGroup heading="Знижки">
                                {results.map((deal) => (
                                    <CommandItem 
                                        key={deal.id} 
                                        value={deal.id}
                                        onSelect={() => goToDeal(deal.id)}
                                        className="flex items-center gap-3"
                                    >   
                                        {deal.imageUrls?.[0] && (
                                            <Image src={deal.imageUrls[0]} alt="" width={36} height={36} className="h-9 w-9 rounded-md object-cover"/>
                                        )}
                                        <span className="flex-1 truncate text-sm">{deal.title}</span> 
                                        <span className="text-sm font-semibold text-primary">
                                            {deal.newPrice}₴
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )
                    }
                    </CommandList>
                )}

            </Command>
        </div>
    )
}   
// todo: jailbreak the app, test mobile version, email verification, full page of settings