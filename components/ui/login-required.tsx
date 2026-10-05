import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function LoginRequiredModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const handleAuthRedirect = (path: "/login" | "/register") => {
    const returnUrl =
      window.location.pathname + window.location.search + window.location.hash;

    router.push(`${path}?returnUrl=${encodeURIComponent(returnUrl)}`);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="mx-auto my-auto max-w-100 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 pb-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold text-card-foreground">
              Увійдіть, щоб голосувати
            </DialogTitle>
            <DialogClose
              onClick={() => {}}
              className="w-5 h-5 p-2 bg-card items-center box-content flex justify-center rounded-full cursor-pointer text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors"
            >
              <X height={20} width={20} className="" aria-hidden={false} />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center text-center gap-4 p-6">
          <p className="text-sm text-start text-card-foreground">
            Ваш голос допомагає спільноті знаходити справді вигідні пропозиції.
            Увійдіть або створіть безкоштовний акаунт, щоб продовжити.
          </p>
          <Button
            onClick={() => handleAuthRedirect("/login")}
            className="w-full cursor-pointer font-bold bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-200"
          >
            Увійти
          </Button>
          <Button
            onClick={() => handleAuthRedirect("/register")}
            className="w-full cursor-pointer font-bold bg-transparent text-muted-foreground border border-border px-4 py-2 rounded-md hover:text-black hover:bg-slate-100 hover:border-slate-300 transition-colors duration-200"
          >
            Створити акаунт
          </Button>
          <span
            className="text-xs text-muted-foreground cursor-pointer hover:text-foreground hover:underline"
            onClick={onClose}
          >
            Не зараз
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
