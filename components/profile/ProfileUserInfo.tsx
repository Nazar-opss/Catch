"use client"
import Image from 'next/image'
import { useState } from 'react'
import { FileUpload } from '../ui/file-upload'
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
                    <div className="w-28 h-28 rounded-full p-1 bg-white border border-slate-200 group-hover:border-orange-200 transition-colors shadow-sm items-center justify-center flex">
                        <Image className="rounded-full object-cover" width={90} height={90} src={user.image || "/icons/avatar-default.svg"} alt={user.name ?? "Користувач"} />
                    </div>
                    {isOwnProfile && (
                        <Button className="absolute cursor-pointer bottom-0 right-0 p-2 bg-white border border-slate-200 shadow-sm hover:text-orange-600 hover:border-orange-200 transition-colors opacity-0 group-hover:opacity-100 rounded-full" variant={"outline"} size={"icon"} onClick={() => setModal(true)}>
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