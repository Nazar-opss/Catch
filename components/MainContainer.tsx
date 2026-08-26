"use client"
import { useUIStore } from "@/lib/store/uiStore";
import React from "react";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const isExpanded = useUIStore((state) => state.isExpanded);
  return (
    <main
      className={`flex flex-1 w-full items-center flex-col mx-auto py-8 sm:px-6 px-4 transition-all duration-500 ease-in-out ${isExpanded ? "min-[1440px]:max-w-[1920px]" : "max-w-7xl"}`}
    >
      {children}
    </main>
  );
}
