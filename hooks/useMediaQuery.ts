import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mq1 = window.matchMedia(query);
        setMatches(mq1.matches)
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
        mq1.addEventListener('change', handler)
        return () =>
            mq1.removeEventListener('change', handler)
    }, [query])

    return matches
}