"use client"
import Image from 'next/image'
import { useState } from 'react'
import { User } from '@/prisma/types/types'
import { Selectable } from 'kysely'
import { Button } from '../ui/button'
import { Camera } from 'lucide-react'
import ProfileUserPhoto from './ProfileUserPhoto'

function ProfileUserInfo({ user, isOwnProfile }: { user: Selectable<User>, isOwnProfile: boolean }) {
    const [modal, setModal] = useState(false)
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 group">
                <div className="w-28 h-28 transition-colors shadow-sm items-center justify-center flex rounded-full p-1 bg-card border border-border group-hover:border-orange-200
                dark:group-hover:border-primary
                dark:hover:border-primary dark:bg-slate-800 ">
                    <Image loading='eager' className="rounded-full object-cover h-full w-full" width={90} height={90} unoptimized quality={90} src={user.image || "/icons/avatar-default.svg"} alt={user.name ?? "Користувач"} />
                </div>
                {isOwnProfile && (
                    <Button size="icon" onClick={() => setModal(true)} className="absolute bottom-0 right-0 cursor-pointer rounded-full p-2 bg-secondary text-foreground border border-border shadow-sm opacity-0 transition-colors group-hover:opacity-100 hover:text-primary hover:bg-secondary hover:border-orange-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-primary">
                        <Camera />
                    </Button>
                )}
                <ProfileUserPhoto open={modal} onOpenChange={setModal} />
            </div>
            <span className="text-lg font-bold">{user.name}</span>
            <span className="text-sm text-slate-500 font-medium mt-1.5">Зареєстрований з: {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
    )
}

export default ProfileUserInfo