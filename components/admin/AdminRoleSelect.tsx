"use client";
import { setUserRole } from "@/lib/actions/user";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface AdminRoleSelectProps {
  userId: string;
  role: "user" | "admin";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminRoleSelect({
  userId,
  role,
  open,
  onOpenChange,
}: AdminRoleSelectProps) {
  const [isPending, startTransition] = useTransition();
  const [roleState, setRoleState] = useState(role);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setRoleState(role);
    onOpenChange(nextOpen);
  };

  const handleUserRole = (roleState: string): void => {
    startTransition(async () => {
      const result = await setUserRole({
        userId,
        role: roleState as "user" | "admin",
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success(
          `Роль успішно змінено на ${roleState === "admin" ? "Адміністратор" : "Користувач"}`,
        );
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="my-auto max-h-[calc(100vh-2rem)] max-w-sm mx-4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader className="flex flex-col border-b-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 sm:mb-8">
          <DialogTitle className="text-xl font-bold text-card-foreground tracking-tight">
            Змінити роль користувача
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 sm:px-8">
          <div className="relative">
            <select
              disabled={isPending}
              value={roleState}
              onChange={(event) =>
                setRoleState(event.target.value as "user" | "admin")
              }
              className="w-full bg-background text-card-foreground border border-border rounded-lg px-3 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="user">Користувач</option>
              <option value="admin">Адміністратор</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 text-muted-foreground transform -translate-y-1/2 pointer-events-none" />
          </div>
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
            onClick={() => handleUserRole(roleState)}
            disabled={isPending}
            className="rounded-lg h-10 px-5 py-2 text-[14px] font-semibold text-white bg-primary hover:bg-orange-700 shadow-lg shadow-orange-600/20 cursor-pointer"
          >
            {isPending === true ? "Змінюєм роль..." : "Змінити роль"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
