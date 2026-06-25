"use client";
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputStyle } from "../deals/DealFormContent";
import { Button } from "../ui/button";
import { useState } from "react";
import { Switch } from "../ui/switch";
import TelegramIcon from "../ui/telegramIcon";
import { updateUserData } from "@/lib/actions/user";
import { profileSchema } from "@/lib/schemas/profileSchema";

export default function ProfileSettings({
  name,
  userName,
  email,
  emailVerified,
}: {
  name: string;
  userName: string;
  email: string;
  emailVerified: boolean;
}) {
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password",
  );

  const form = useForm<any>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name,
      userName: userName,
      email: email,
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(data: { name?: string; userName?: string }) {
    const result = await updateUserData({
      name: data.name,
      userName: data.userName,
    })
    if (result?.success) {
      console.log(result.success)
    } else {
      console.error(result?.error)
    }
  }

  const setParam = useSearchParamSetter();
  return (
    <div className=" bg-card rounded-[24px] border border-border shadow-sm p-8 flex flex-col">
      <div className="flex relative flex-col text-start pb-4 mb-6 border-b border-secondary">
        <h1 className="text-2xl font-bold text-card-foreground">
          Налаштування профілю
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Керуйте своїми особистими даними та налаштуваннями.
        </p>
        <ArrowLeft
          onClick={() => setParam("settings", null)}
          className="w-6 h-6 absolute cursor-pointer top-0 right-0 text-muted-foreground hover:text-card-foreground transition-colors"
        />
      </div>
      <div className="space-y-4 border-b border-secondary pb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Особисті дані
        </h2>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative text-muted-foreground">
              <FieldGroup className="flex flex-row justify-between">
                <FieldLabel htmlFor={field.name}>
                  Ім&apos;я користувача (Нікнейм)
                </FieldLabel>
              </FieldGroup>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={name}
                type={"text"}
                value={field.value}
                className={`${inputStyle} px-4`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="userName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative mb-0 text-muted-foreground">
              <FieldGroup className="flex flex-row justify-between">
                <FieldLabel htmlFor={field.name}>
                  Унікальний нікнейм
                </FieldLabel>
              </FieldGroup>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={userName}
                type={"text"}
                value={field.value || userName}
                className={`${inputStyle} px-4`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Зміна цього поля призведе до зміни вашого посилання на профіль.
        </p>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative mb-0 text-muted-foreground ">
              <FieldGroup className="flex flex-row justify-between">
                <FieldLabel htmlFor={field.name}>Електронна пошта</FieldLabel>
              </FieldGroup>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={email}
                type={"text"}
                value={field.value || email}
                className={`${inputStyle} px-4`}
                disabled={!emailVerified}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
            // TODO: change email feature
          )}
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Електронну пошту можна змінити лише після верифікації.
        </p>
      </div>
      <div className="space-y-4 border-b border-secondary pt-6 pb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Безпека</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative text-muted-foreground">
                <FieldGroup className="flex flex-row justify-between">
                  <FieldLabel htmlFor={field.name}>Поточний пароль</FieldLabel>
                </FieldGroup>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={"Поточний пароль"}
                  type="password"
                  value={field.value}
                  className={`${inputStyle} px-4`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative text-muted-foreground">
                <FieldGroup className="flex flex-row justify-between">
                  <FieldLabel htmlFor={field.name}>Новий пароль</FieldLabel>
                </FieldGroup>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={"Мінімум 8 символів"}
                  type="password"
                  value={field.value}
                  className={`${inputStyle} px-4`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setShowPassword(
                      showPassword === "password" ? "text" : "password",
                    )
                  }
                  className="absolute inline-flex items-center justify-center right-0 top-1/2 -translate-y-1/6 w-10! cursor-pointer h-10 hover:bg-transparent"
                  aria-label={
                    showPassword === "password"
                      ? "Показати пароль"
                      : "Приховати пароль"
                  }
                >
                  {showPassword === "password" ? (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button
          className="bg-card h-full border-border text-muted-foreground hover:bg-slate-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
          variant={"outline"}
        >
          Оновити пароль
        </Button>
      </div>
      <div className="border-b border-secondary pt-6 pb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Сповіщення
        </h2>
    {/*TODO: create a component for this */}
        <div className="space-y-4">
            <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel  className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Надсилати листа, коли хтось відповів на мій коментар
                </FieldLabel>
            </FieldContent>
            <Switch id="switch-focus-mode" />
            </Field>
            <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel  className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Повідомити мене, коли моя знижка набрала +100° температури
                </FieldLabel>
            </FieldContent>
            <Switch id="switch-focus-mode" />
            </Field>
            <Field orientation="horizontal" className="w-full">
            <FieldContent >
                <FieldLabel  className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Сповіщення, коли хтось згадав мене через @username
                </FieldLabel>
            </FieldContent>
            <Switch id="switch-focus-mode" />
            </Field>
            <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Важливі новини платформи та нові функції
                </FieldLabel>
            </FieldContent>
            <Switch id="switch-focus-mode" />
            </Field>
        </div>
      </div>
      <div className="border-b border-secondary pt-6 pb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Месенджери</h2>
        <Button
          className="bg-[#24A1DE] dark:bg-[#24A1DE] hover:bg-[#1c8ac4] dark:hover:bg-[#1c8ac4] h-full border-border text-white hover:text-white px-6 py-3 rounded-xl font-medium text-[15px] transition-colors shadow-sm"
          variant={"outline"}
        >
            <TelegramIcon size={24} strokeWidth={0.3} color="#FFFFFF" />
          Підключити Telegram-бота
        </Button>
      </div>
      <div className="pt-6">
        <div className="flex justify-end">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="bg-primary h-full text-white hover:bg-orange-700 px-6 py-2.5 rounded-xl font-medium text-[15px] shadow-sm cursor-pointer shadow-orange-600/20 transition-colors">
            Зберегти зміни
          </Button>
        </div>
      </div>
      <div className="pt-8 border-t border-secondary mt-12">
          <h3 className="font-medium text-red-600 mb-4">Небезпечна зона</h3>
          <Button variant={"destructive"} className="px-5 py-2.5 rounded-xl font-medium text-sm border border-red-200 text-red-600 h-full bg-transparent hover:bg-red-50 hover:border-red-300 transition-all">
            Видалити акаунт
          </Button>
      </div>
    </div>
  );
}
