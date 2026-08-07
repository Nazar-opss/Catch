import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dealPercentCalculate = (oldPrice: number | null | undefined, newPrice: number) => {
  return oldPrice ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0
}

export function getShopName(url: string) {
  const hostname = new URL(url).hostname;
  const parts = hostname.split('.');

  const subdomains = ['www', 'bt', 'shop', 'm', 'store', 'hard'];
  const filtered = parts.filter(p => !subdomains.includes(p));

  const name = filtered[0] ?? hostname;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const SHOP_ICONS: Record<string, string> = {
  "rozetka": "/icons/rozetka.svg",
  "moyo": "/icons/moyo.svg",
  "allo": "/icons/allo.svg",
  "comfy": "/icons/comfy.png",
  "foxtrot": "/icons/foxtrot.jpg",
  "epicentrk": "/icons/epicentr.png",
  "brain": "/icons/brain.jpg",
  "elmir": "/icons/elmir.jpg",
  "stls": "/icons/stylus.jpg",
  "ktc": "/icons/ktc.jpg",
  "kvshop": "/icons/kvshop.jpg",
  "pixophone": "/icons/pxphone.png",
  "sota": "/icons/sota.jpg",
  "touch": "/icons/touch.jpg",
  "yabko": "/icons/yabko.jpg",
  "zhuk": "/icons/zhuk.jpg",
  "olx": "/icons/olx.png",
  "prm": "/icons/prm.svg"
}

export function getShopIcon(url: string) {
  const name = getShopName(url).toLowerCase();
  const fileName = SHOP_ICONS[name] || "/icons/store-default.svg"
  return fileName
}

export function generateSlugUsername(name: string): string {
  const baseSlug = slugify(name, {
    replacement: '-',
    lower: true,
    trim: true,
    strict: true,
    locale: 'uk'

  })
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${baseSlug}-${random}`
}

export function isDealExpired(deal: { isExpired: boolean | null; expiresAt?: Date | string | null }): boolean {
  if (deal.isExpired) {
    return true
  }
  if (deal.expiresAt) {
    return new Date(deal.expiresAt).getTime() <= Date.now()
  }
  return false
}

export function getExpirationBadge(expiresAt: Date | string | null) {
  if(!expiresAt) return null;

  const expirationDate = new Date(expiresAt);
  const now = new Date();

  if (expirationDate.getTime() <= now.getTime()) {
    return null;
  }
  const diffInMs = expirationDate.getTime() - now.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 24) {
    if (diffInHours === 0) {
      return {
        text: "Менше години!",
        colorClass: "text-red-500",
      };
    }
    return {
      text: `Залишилось ${diffInHours} год.`,
      colorClass: "text-red-500",
    };
  }

  if (diffInDays <= 2) {
    return {
      text: `Діє ще ${diffInDays} дн.`,
      colorClass: "text-orange-500",
    };
  }

  return {
    text: `Діє ще ${diffInDays} дн.`,
    colorClass: "text-green-600",
  };
}