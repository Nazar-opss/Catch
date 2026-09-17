import React, { useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { resetUserRating } from "@/lib/actions/user";
import { toast } from "sonner";

export default function AdminResetRating({
  open,
  onOpenChange,
  userId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleResetRating = (userId: string): void => {
    startTransition(async () => {
      const result = await resetUserRating(userId);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success("Рейтинг успішно скинуто!");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="my-auto max-h-[calc(100vh-2rem)] max-w-sm mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">
            Скинути рейтинг користувача
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 sm:px-8">
          <p className="text-sm text-muted-foreground">
            Ви впевнені? Ця дія назавжди скине рейтинг даного користовуча до{" "}
            <span className="text-red-600 font-bold">0</span>. Відновити рейтинг
            буде неможливо.
          </p>
        </div>
        <DialogFooter className="relative mt-6 border-t-0 bg-transparent">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer border border-slate-300"
            >
              Скасувати
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleResetRating(userId)}
            disabled={isPending}
            variant="destructive"
            className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-700 shadow-lg shadow-red-600/20 cursor-pointer"
          >
            {isPending === true ? "Скидаєм рейтинг..." : "Скинути рейтинг"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
