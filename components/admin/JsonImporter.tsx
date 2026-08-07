"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { importDealsAction } from "@/lib/actions/deal";

export default function JsonImporter() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setIsLoading(true);
    toast.info("Аналіз файлу...");

    try {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);

      const result = await importDealsAction(jsonData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Не вдалося прочитати файл. Переконайтеся, що це валідний JSON.",
      );
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-4 max-w-xl">
      <div>
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Масовий імпорт (JSON)
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Завантажте масив об&apos;єктів для швидкого наповнення бази. Система
          автоматично призначить вас автором цих знижок.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          disabled={isLoading}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
