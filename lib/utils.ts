import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dealPercentCalculate = (oldPrice: number | null | undefined, newPrice: number) => {
  return oldPrice ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0
}