"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteDealAction } from "@/lib/actions/deal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function DealDelete({
  dealId,
  open,
  onOpenChange,
}: {
  dealId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    const res = await deleteDealAction(dealId);
    if (res?.error) {
      toast.error(res.error);
      setSubmitting(false);
      return;
    }
    toast.success(res?.success ?? "Знижку видалено");
    onOpenChange(false);
    router.push("/");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby="Додати нову знижку"
        className="my-auto max-h-[calc(100vh-2rem)] max-w-sm mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">Видалити знижку?</DialogTitle>
        </DialogHeader>
        <div className="px-6 sm:px-8">
            <p className="text-sm text-muted-foreground">
                Ви впевнені? Ця дія назавжди видалить знижку та всі коментарі до неї.
                Відновити дані буде неможливо.
            </p>
        </div>
        <DialogFooter className="relative mt-6 border-t-0 bg-transparent">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={submitting}
              className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-slate-300"
            >
              Скасувати
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={submitting}
            className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-700 shadow-lg shadow-red-600/20 cursor-pointer"
          >
            {submitting ? "Видалення..." : "Видалити"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
