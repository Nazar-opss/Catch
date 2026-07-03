"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { authClient } from "@/lib/auth-clients";
import { deleteAccountWithPassword } from "@/lib/actions/account";

const errorMap: Record<string, string> = {
  INVALID_PASSWORD: "Невірний пароль",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Для цього акаунта не встановлено пароль",
};

export default function ProfileDelete({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    authClient.listAccounts().then(({ data }) => {
      if (cancelled) return;
      setHasPassword(!!data?.some((a) => a.providerId === "credential"));
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setPassword("");
      setError(null);
      setHasPassword(null);
    }
    onOpenChange(next);
  };

  const handleDelete = async () => {
    setError(null);
    setSubmitting(true);

    if (hasPassword) {
      const res = await deleteAccountWithPassword(password);
      if (res.error) {
        setSubmitting(false);
        setError(errorMap[res.error] ?? "Не вдалося видалити акаунт");
        return;
      }
      await authClient.signOut();
      toast.success("Акаунт видалено");
      handleOpenChange(false);
      router.push("/");
      router.refresh();
      return;
    }

    // Google / без пароля — підтвердження через лист
    const { error } = await authClient.deleteUser({ callbackURL: "/" });
    setSubmitting(false);
    if (error) {
      setError("Не вдалося надіслати лист для підтвердження");
      return;
    }
    toast.success("Лист для підтвердження надіслано на вашу пошту");
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="my-auto max-h-[calc(100vh-2rem)] max-w-md mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">
              Ви точно хочете видалити акаунт?
            </DialogTitle>
            <DialogClose className="w-5 h-5 bg-card items-center box-content flex justify-center rounded-full cursor-pointer text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors">
              <X height={20} width={20} className="" aria-hidden={false} />
            </DialogClose>
          </div>

          <DialogDescription>
            {hasPassword
              ? "Ваш акаунт буде видалено назавжди. Введіть пароль, щоб підтвердити дію."
              : "Ваш акаунт буде видалено назавжди. Ми надішлемо лист на вашу пошту для підтвердження."}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 sm:px-8">
          {hasPassword && (
            <div className="flex flex-col gap-1.5">
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="Ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error}
                disabled={submitting}
              />
              {error && (
                <p className="text-sm text-destructive px-3">{error}</p>
              )}
            </div>
          )}
          {hasPassword === false && error && (
            <p className="text-sm text-destructive px-3">{error}</p>
          )}
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
            disabled={submitting || hasPassword === null || (hasPassword && !password)}
            className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold cursor-pointer"
          >
            {submitting ? "Видалення..." : "Видалити акаунт"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
