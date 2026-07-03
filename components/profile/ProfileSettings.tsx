"use client";
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { ArrowLeft, Check, Eye, EyeOff, Mail, Send, TriangleAlert } from "lucide-react";
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
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import TelegramIcon from "../ui/telegramIcon";
import { updateUserData } from "@/lib/actions/user";
import { ChangePasswordFormValues, changePasswordSchema, ProfileFormValues, profileSchema } from "@/lib/schemas/profileSchema";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-clients";
import { useRouter } from "next/navigation";
import Loader from "../ui/loader";
import ProfileDelete from "./ProfileDelete";

const emailErrorMap: Record<string, string> = {
  EMAIL_IS_THE_SAME: "Це ваша поточна пошта",
  INVALID_EMAIL: "Введіть коректний email",
  USER_ALREADY_EXISTS: "Ця пошта вже використовується",
}

const passwordErrorMap: Record<string, string> = {
  INVALID_PASSWORD: "Невірний поточний пароль",
  PASSWORD_TOO_SHORT: "Пароль занадто короткий",
  PASSWORD_TOO_LONG: "Пароль занадто довгий",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Для цього акаунта не встановлено пароль, спробуйте увійти через соцмережу або відновити пароль",
}

export default function ProfileSettings({
  name,
  userName,
  email,
  emailVerified,
  emailChanged,
}: {
  name: string;
  userName: string;
  email: string;
  emailVerified: boolean;
  emailChanged?: string;
}) {
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password",
  );
  const [savingField, setSavingField] = useState<string | null>(null);
  const [changingEmail, setChangingEmail] = useState(false)
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const router = useRouter()
  const setParam = useSearchParamSetter()
 

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name,
      userName: userName,
      email: email,
    },
  });

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  })

  const saveField = (fieldName: "name" | "userName") => async () => {
    const valid = await form.trigger(fieldName)
    if(!valid) return
    const value = form.getValues(fieldName)
    setSavingField(fieldName)
    const result = await updateUserData({[fieldName]: value})
    setSavingField(null)
    if(result?.success) {
      toast.success(result.success)
      router.push(`/user/${value}?settings=true`)
      form.resetField(fieldName, {defaultValue: value})
    } else {
      toast.error(result?.error ?? "Помилка оновлення даних")
    }
  }

  const handleVerifyCurrentEmail = async () => {
    await authClient.sendVerificationEmail({
      email: email,
      callbackURL: `/user/${userName}?settings=true`
    })
    toast.success("Лист відправлено на вашу пошту")
  } 

  const handleChangeEmail = async () => {
    const valid = await form.trigger("email")
    if(!valid) return
    const newEmail = String(form.getValues("email") ?? "").trim().toLowerCase()
    if(!newEmail || newEmail === email.trim().toLowerCase()) {
      toast.error(emailErrorMap.EMAIL_IS_THE_SAME)
      return
    }
    setChangingEmail(true)
    const { error } = await authClient.changeEmail({
      newEmail,
      callbackURL: `/user/${userName}?settings=true&emailChanged=1`
    })
    setChangingEmail(false)
    if(error) {
      toast.error(emailErrorMap[error.code ?? ""] ?? "Не вдалося змінити пошту")
      return
    }
    setPendingEmail(newEmail)
    toast.success("Лист-підтвердження надіслано на вашу поточну пошту")
  }

  const handleChangePassword = async () => {
    const valid = await passwordForm.trigger(["currentPassword", "newPassword"])
    if(!valid) return;
    const currentPassword = passwordForm.getValues("currentPassword")
    const newPassword = passwordForm.getValues("newPassword")

    setSavingField("password")
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    })
    setSavingField(null)

    if(error) {
      toast.error(passwordErrorMap[error.code ?? ""] ?? "Не вдалося змінити пароль")
      return
    }

    toast.success("Пароль оновлено")
    passwordForm.resetField("currentPassword", {defaultValue: ""})
    passwordForm.resetField("newPassword", {defaultValue: ""})
  }

    useEffect(() => {
      if (emailChanged === "1") {
        router.refresh()
        toast.success("Пошту успішно змінено")
        setParam("emailChanged", null)
      }
    }, [emailChanged, router, setParam])
 
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
              <FieldGroup className="flex flex-row gap-3 items-center">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={name}
                  type={"text"}
                  value={field.value}
                  className={`${inputStyle} px-4`}
                />
                <Button disabled={!fieldState.isDirty || savingField === "name"} onClick={saveField("name")} className="bg-card h-full border-border text-muted-foreground cursor-pointer hover:bg-transparent px-5 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" variant={'outline'}>Зберегти</Button>
              </FieldGroup>
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
              <FieldGroup className="flex flex-row gap-3 items-center">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={userName}
                  type={"text"}
                  value={field.value}
                  className={`${inputStyle} px-4`}

                />
                <Button disabled={!fieldState.isDirty || savingField === "userName"} onClick={saveField("userName")}  className="bg-card h-full border-border text-muted-foreground cursor-pointer hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl font-medium text-sm transition-colors" variant={'outline'}>Зберегти</Button>
              </FieldGroup>
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
              <FieldGroup className="relative flex flex-row items-center">
                <Input
                  {...field}
                  id={field.name}
                  aria-describedby="email-hint"
                  aria-invalid={fieldState.invalid}
                  placeholder={email}
                  type="email"
                  autoComplete="email"
                  value={field.value}
                  className={`${inputStyle} px-4`}
                  disabled={!emailVerified}
                />
                  <div className={`absolute ${emailVerified ? "text-green-500 bg-green-200" : "text-yellow-500 bg-amber-200"}  text-xs font-medium rounded-lg border border-transparent flex items-center gap-1 right-0 py-2 px-4 mr-px`}>
                    {
                      emailVerified ? <>
                      <Check className="w-4"/>
                    Верифіковано  </> : <>
                      <TriangleAlert className="w-4" />
                      Не Верифіковано
                      </>
                    }
                    
                  </div>
              </FieldGroup>
              <FieldGroup className="flex flex-row">
                <Button disabled={changingEmail || !emailVerified || !form.formState.dirtyFields.email} onClick={handleChangeEmail}  className="bg-card h-full border-border max-w-1/4 text-muted-foreground cursor-pointer hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl font-medium text-sm transition-colors" variant={'outline'}>
                  <Mail />
                  Змінити пошту
                </Button>
                {!emailVerified && 
                  <Button onClick={handleVerifyCurrentEmail}  className="bg-card h-full border-border text-muted-foreground cursor-pointer hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl font-medium text-sm transition-colors" variant={'outline'}>
                    Відправити лист для верифікації
                  </Button>
                }
              </FieldGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {pendingEmail && (
          <div className="text-[13px] flex flex-col bg-orange-200/50 dark:bg-orange-700/20 text-muted-foreground mt-1.5 gap-2.5 px-4 py-3.25 rounded-lg border border-orange-100/50 dark:border-orange-900/30">
            <p>
              Очікує підтвердження зміни на <b className="text-primary">{pendingEmail}</b>. Перевірте поточну скриньку <b className="text-primary">({email})</b> і підтвердіть зміну, потім підтвердіть лист у новій скриньці.
            </p>
            <Button disabled={changingEmail || !emailVerified || !form.formState.dirtyFields.email} onClick={handleChangeEmail} className="cursor-pointer w-1/4 text-[13px] text-primary flex py-1.75 px-3.5 rounded-lg items-center gap-2.25 bg-orange-100 hover:bg-orange-300 dark:bg-orange-900/20 border border-primary dark:hover:bg-orange-950 dark:border-orange-900/30"><Send />Надіслати ще раз</Button>
          </div>
        )}
        {!emailVerified && (
          <p id="email-hint" className="text-xs text-muted-foreground mt-1.5">Електронну пошту можна змінити лише після верифікації.</p>
        )}
      </div>
      <div className="space-y-4 border-b border-secondary pt-6 pb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Безпека</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="currentPassword"
            control={passwordForm.control}
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
                  type={showPassword}
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
            control={passwordForm.control}
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
                  type={showPassword}
                  autoComplete="new-password"
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
                  className="absolute inline-flex items-center justify-center right-0 top-9 -translate-y-1/6 w-10! cursor-pointer h-10 hover:bg-transparent"
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
          onClick={handleChangePassword}
          disabled={savingField === "password"}
          className="bg-card h-full border-border text-muted-foreground px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
          variant={"outline"}
        >
          {savingField === "password" ? 
          (<>
            <Loader color="primary" gap={1} />
            Оновлення...
          </>) 
          : "Оновити пароль"}
        </Button>
      </div>
      <div className="border-b cursor-not-allowed border-secondary pt-6 pb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Сповіщення (в розробці/WIP)
        </h2>
    {/*TODO: create a component for this */}
        <div className="space-y-4 opacity-50">
            <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Надсилати листа, коли хтось відповів на мій коментар
                </FieldLabel>
            </FieldContent>
            <Switch disabled className="disabled:opacity-50 disabled:cursor-not-allowed" id="switch-focus-mode" />
            </Field>
            <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel  className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Повідомити мене, коли моя знижка набрала +100° температури
                </FieldLabel>
            </FieldContent>
            <Switch disabled className="disabled:opacity-50 disabled:cursor-not-allowed" id="switch-focus-mode" />
            </Field>
            <Field orientation="horizontal" className="w-full">
            <FieldContent >
                <FieldLabel  className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Сповіщення, коли хтось згадав мене через @username
                </FieldLabel>
            </FieldContent>
            <Switch disabled className="disabled:opacity-50 disabled:cursor-not-allowed" id="switch-focus-mode" />
            </Field>
            <Field orientation="horizontal" className="w-full">
            <FieldContent>
                <FieldLabel className="font-normal text-muted-foreground text-sm pr-4" htmlFor="switch-focus-mode">
                Важливі новини платформи та нові функції
                </FieldLabel>
            </FieldContent>
            <Switch disabled className="disabled:opacity-50 disabled:cursor-not-allowed" id="switch-focus-mode" />
            </Field>
        </div>
      </div>
      <div className="border-b cursor-not-allowed border-secondary pt-6 pb-8 ">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Месенджери (в розробці/WIP)</h2>
        <Button
          className="disabled:opacity-50 bg-[#24A1DE] cursor-pointer dark:bg-[#24A1DE] hover:bg-[#1c8ac4] dark:hover:bg-[#1c8ac4] h-full border-border text-white hover:text-white px-6 py-3 rounded-xl font-medium text-[15px] transition-colors shadow-sm"
          variant={"outline"}
          disabled
        >
            <TelegramIcon size={24} strokeWidth={0.3} color="#FFFFFF" />
          Підключити Telegram-бота
        </Button>
      </div>
      <div className="mt-12">
          <h3 className="font-medium text-red-600 mb-4">Небезпечна зона</h3>
          <Button variant={"destructive"} onClick={() => setModal(true)} className="px-5 py-2.5 rounded-xl font-medium text-sm border border-red-200 text-red-600 h-full bg-transparent hover:bg-red-50 hover:border-red-300 cursor-pointer transition-all">
            Видалити акаунт
          </Button>
          <ProfileDelete open={modal} onOpenChange={setModal} />
      </div>
    </div>
  );
}
