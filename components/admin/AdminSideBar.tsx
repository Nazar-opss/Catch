import React from 'react'
import { Logo } from '../ui/Logo'
import AdminNav from './AdminNav'
import ThemeButton from '../ui/theme-button'

export default function AdminSideBar() {
  return (
    <aside className=" hidden fixed inset-y-0 left-0 z-40 md:flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0 -translate-x-full">
        <div className='flex items-center justify-center gap-2.5 px-6 h-16 border-b border-border'>
            <Logo/>
            <p className='text-[22px] font-bold tracking-tight text-foreground'>
                Admin
            </p>
        </div>
        <AdminNav/>
        <div>
        <div className="bg-muted w-8 h-8 rounded-full"></div>
        <ThemeButton/>
      </div>
    </aside>
  )
}
