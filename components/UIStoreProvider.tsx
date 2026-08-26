"use client"
import { useUIStore, ViewLayout } from '@/lib/store/uiStore'
import React, { useState } from 'react'

export default function UIStoreProvider({initialExpanded, initialLayout, children} : {initialExpanded: boolean, initialLayout: ViewLayout, children: React.ReactNode}) {
useState(() => {
    useUIStore.setState({isExpanded: initialExpanded, layout: initialLayout})
    return true;
})
    return (
    <div>{children}</div>
  )
}
