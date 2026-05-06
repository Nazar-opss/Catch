import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

  const name = filtered[0];
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
  const fileName = SHOP_ICONS[name] || `${name}.svg`
  return fileName
}