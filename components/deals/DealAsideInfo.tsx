'use client'
import Link from "next/link"
import RatingButton from "../ui/rating-button"
import { Button } from "../ui/button"
import { Bookmark, Clock, EllipsisVertical, ExternalLink, PenLine, RotateCcw, Trash } from "lucide-react"
import { dealPercentCalculate, getExpirationBadge, getShopIcon, getShopName, isDealExpired } from "@/lib/utils"
import Image from "next/image"
import { saveDealAction } from "@/lib/actions/saved"
import dayjs from "@/lib/dayjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"
import DealEdit from "./DealEdit"
import DealDelete from "./DealDelete"
import { toggleDealExpiredAction } from "@/lib/actions/deal"
import { toast } from "sonner"

export interface DealAsideInfoProps {
    id: string;
    createdAt: Date;
    link: string | null;
    title: string;
    newPrice: number;
    oldPrice: number | null;
    description: string | null;
    imageUrls: string[];
    temperature: number;
    authorId: string;
    authorUsername: string;
    authorName: string;
    authorImage: string | null;
    commentCount: number | null;
    userVote: number | null;
    expiresAt: Date | null;
    isExpired: boolean;
}

export default function DealAsideInfo({deal, isAuthor}: { deal: DealAsideInfoProps; isAuthor: boolean }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const expired = isDealExpired(deal)
    const daysLeft = !expired && deal.expiresAt
        ? dayjs(deal.expiresAt).endOf("day").diff(dayjs(), "day")
        : null
    async function handleToggleExpired() {
        const result = await toggleDealExpiredAction(deal.id)
        if (result?.success) toast.success(result.success)
        else toast.error(result?.error)
    }

    const expirationData = !expired ? getExpirationBadge(deal.expiresAt) : null;


    return (
        <div className="sticky top-23 flex flex-col gap-4">
            <div className="bg-card rounded-[24px] border border-border p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <span className="uppercase text-sm font-bold text-slate-400">
                        рейтинг знижки
                    </span>
                    <RatingButton dealId={deal.id} rating={(deal.temperature)} userVote={deal.userVote} fontSize="text-2xl" iconSize="20" deal />
                    {isAuthor && (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button asChild onClick={() => {}} className="w-9 h-9 bg-transparent border border-border text-muted-foreground hover:text-card-foreground hover:bg-transparent p-1 rounded-md transition-colors">
                                    <EllipsisVertical width={32} height={32} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                <DropdownMenuLabel>Налаштування публікації</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setEditModal(true)}>
                                    <PenLine />Редагувати
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleToggleExpired}>
                                    {expired ? <><RotateCcw />Відновити</> : <><Clock />Закінчилася</>}
                                </DropdownMenuItem>

                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setDeleteModal(true)} className="text-red-600">
                                    <Trash />
                                    Видалити
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <div className="w-full h-px bg-secondary mb-6"></div>
                {expired && (
                    <div className="mb-4 flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <Clock className="h-4 w-4" />
                        Знижка закінчилася
                    </div>
                )}
                <div className="mb-6 flex flex-col gap-2">
                    <span className="font-extrabold text-[40px] leading-none text-card-foreground tracking-tight">{deal.newPrice} <span className="font-bold text-3xl">грн</span></span>
                    {deal.oldPrice && (
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-lg text-muted-foreground line-through font-medium decoration-slate-300">{deal.oldPrice} грн</span>
                            <span className="text-[14px] bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded font-extrabold tracking-wide border border-red-200 dark:border-red-500/30">-{dealPercentCalculate(deal.oldPrice, deal.newPrice)}%</span>
                        </div>
                    )}
                </div>
                {deal.link && (
                    <>
                        <Link href={deal.link} target="_blank" rel="noopener noreferrer">
                            <Button className="relative w-full h-full group overflow-hidden bg-[#ea580c] text-white font-bold text-[17px] py-4 rounded-xl! shadow-[0_4px_14px_0_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.23)] cursor-pointer group hover:-translate-y-0.5 transition-all  items-center justify-center gap-2 mb-4">
                                <div className="absolute inset-0 bg-linear-to-t from-orange-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>
                                <span className="flex items-center z-10 gap-2 relative">
                                    Перейти до магазину
                                    <ExternalLink strokeWidth={3} className="w-5 h-5 transition-colors" />
                                </span>
                            </Button>
                        </Link>
                      
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-[14px] font-medium">
                            Продавець:
                            <span className="text-card-foreground items-center font-semibold gap-1.5 flex  ">
                                <Image src={getShopIcon(deal.link)} alt={getShopName(deal.link)} width={32} height={32} />
                                {getShopName(deal.link)}
                            </span>
                        </div>
                          {daysLeft !== null && (
                            <div className={`flex items-center justify-center mt-4 gap-1 font-semibold ${expirationData?.colorClass}`}>
                                <Clock className='size-4' />
                                {expirationData?.text}
                            </div>
                        )}
                    </>
                )}
                <div className="w-full h-px bg-secondary my-6"></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/user/${deal.authorUsername}`} className="relative">
                            <Image src={deal.authorImage ?? "/logo.png"} alt={deal.authorName} className="rounded-full w-10 h-10" width={20} unoptimized quality={90} height={20} />
                        </Link>
                        <div className="flex flex-col ">
                            <span className="text-xs text-muted-foreground mb-0.5 leading-tight">Опублікував</span>
                            <Link href={`/user/${deal.authorUsername}`}>
                                <span className="text-[14px] font-bold text-card-foreground hover:text-orange-600 transition-colors leading-tight">{deal.authorName}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md border text-muted-foreground border-secondary bg-secondary text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{dayjs(deal.createdAt).fromNow()}</span>
                    </div>
                </div>
                <Button onClick={() => saveDealAction({ dealId: deal.id })} className="flex items-center bg-transparent mt-4.5 text-sm font-semibold text-muted-foreground transition-colors gap-1.5 w-full justify-center  border cursor-pointer border-transparent hover:text-primary hover:bg-[#FFF3EA] dark:hover:bg-orange-950/70 flex-1 rounded-lg py-2 px-3">
                    <Bookmark className="w-4 h-4" />
                    Зберегти
                </Button>
            </div>
            <DealEdit deal={deal} open={editModal} onOpenChange={setEditModal} />
            <DealDelete dealId={deal.id} open={deleteModal} onOpenChange={setDeleteModal} />
        </div>
    )
}