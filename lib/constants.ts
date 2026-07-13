export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ
export const MAX_FILES = 5;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CATEGORY_VALUES = ["electronics","food","clothing","home","gaming",
  "auto","beauty","sports","software","kids","pets","books","travel","other"] as const

export type CategoryValue = typeof CATEGORY_VALUES[number]

export const CATEGORIES: { value: CategoryValue; label: string; icon: string }[] = [
  { value: "electronics", label: "Електроніка",         icon: "💻" },
  { value: "food",        label: "Їжа та напої",        icon: "🍔" },
  { value: "clothing",    label: "Одяг та взуття",      icon: "👕" },
  { value: "home",        label: "Дім та сад",          icon: "🏠" },
  { value: "gaming",      label: "Ігри та консолі",     icon: "🎮" },
  { value: "auto",        label: "Авто та інструменти", icon: "🚗" },
  { value: "beauty",      label: "Краса та здоров'я",   icon: "🧴" },
  { value: "sports",      label: "Спорт і відпочинок",  icon: "⚽" },
  { value: "software",    label: "Софт та підписки",    icon: "🔑" },
  { value: "kids",        label: "Дитячі товари",       icon: "🧸" },
  { value: "pets",        label: "Зоотовари",           icon: "🐾" },
  { value: "books",       label: "Книги та навчання",   icon: "📚" },
  { value: "travel",      label: "Туризм та подорожі",  icon: "✈️" },
  { value: "other",       label: "Інше",               icon: "📦" },
]