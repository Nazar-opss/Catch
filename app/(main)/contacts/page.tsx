"use client";
import { inputStyle } from "@/components/deals/DealFormContent";
import { Button } from "@/components/ui/button";
import FacebookIcon from "@/components/ui/facebook";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InstagramIcon from "@/components/ui/instagram";
import TelegramIcon from "@/components/ui/telegramIcon";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/lib/actions/send-email";
import { useSession } from "@/lib/auth-clients";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/lib/schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Contacts() {
    const [isPending, startTransition] = useTransition()
    const { data: session } = useSession();
  const socials = [
    {
      name: "Facebook",
      element: <FacebookIcon size={20} />,
    },
    {
      name: "Instagram",
      element: <InstagramIcon size={20} />,
    },
    {
      name: "Telegram",
      element: <TelegramIcon size={20} />,
    },
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
      startTransition(async () => {
        const payload = {
            ...data,
            userId: session?.session?.userId || "Гість"
        }
        const result = await sendContactEmail(payload)
        if (result.error) {
                toast.error(result.error);
                return;
        }
        toast.success("Повідомлення успішно відправлено!");
        form.reset();
    })
  }

  useEffect(() => {
    if (session?.user) {
      form.setValue("name", session.user.name || "");
      form.setValue("email", session.user.email || "");
    }
  }, [session, form]);

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-card-foreground tracking-tight leading-tight">
            Зв&apos;яжіться з нами
          </h1>
          <h2 className="text-lg text-muted-foreground leading-relaxed max-w-md">
            Маєте питання, пропозиції щодо співпраці або знайшли баг? Напишіть
            нам! Ми завжди раді зворотньому зв&apos;язку.
          </h2>
        </div>
        <div className="space-y-8">
          <div className="flex items-center gap-5 p-1">
            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 shadow-sm">
              <Mail className="text-primary" />
            </div>
            <div>
              <h4 className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-0.5">
                email
              </h4>
              <h3 className="text-xl font-semibold text-card-foreground hover:text-primary transition-colors">
                support@catch.ua
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-0.5">
              Ми у соцмережах
            </p>
            <div className="flex gap-3">
              {socials.map((e) => {
                return (
                  <Link
                    href="#"
                    className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground group hover:bg-orange-50 hover:border-primary transition-all shadow-sm hover:shadow-md"
                    key={e.name}
                  >
                    {e.element}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-2xl shadow-slate-200/60">
        <form className="space-y-6">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="relative text-card-foreground"
              >
                <FieldGroup className="flex flex-row justify-between">
                  <FieldLabel htmlFor={field.name}>
                    Ваше ім&apos;я або нікнейм
                  </FieldLabel>
                </FieldGroup>
                <FieldGroup className="flex flex-row gap-3 items-center">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={"ExampleName132"}
                    type={"text"}
                    value={field.value}
                    className={`${inputStyle} px-4`}
                  />
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="relative text-сard-foreground "
              >
                <FieldGroup className="flex flex-row justify-between">
                  <FieldLabel htmlFor={field.name}>
                    Ваша електронна пошта
                  </FieldLabel>
                </FieldGroup>
                <FieldGroup className="relative flex flex-col gap-0 md:flex-row items-center">
                  <Input
                    {...field}
                    id={field.name}
                    aria-describedby="email-hint"
                    aria-invalid={fieldState.invalid}
                    placeholder={"example@gmail.com"}
                    type="email"
                    autoComplete="email"
                    value={field.value}
                    className={`${inputStyle} px-4`}
                  />
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="relative text-card-foreground"
              >
                <FieldGroup className="flex flex-row justify-between">
                  <FieldLabel htmlFor={field.name}>Тема</FieldLabel>
                </FieldGroup>
                <FieldGroup className="flex flex-row gap-3 items-center">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={"Питання щодо знижки"}
                    type={"text"}
                    value={field.value}
                    className={`${inputStyle} px-4`}
                  />
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="relative text-card-foreground"
              >
                <FieldGroup className="flex flex-row justify-between">
                  <FieldLabel htmlFor={field.name}>Повідомлення</FieldLabel>
                </FieldGroup>
                <FieldGroup className="flex flex-row gap-3 items-center">
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Напишіть ваше повідомлення тут..."
                    autoComplete="off"
                    value={field.value}
                    className="flex w-full rounded-lg border border-border bg-card px-3.5 py-3 text-[15px] text-card-foreground shadow-sm transition-color placeholder:text-start min-h-25 max-h-80 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring/10 resize-none overflow-y-hidden"
                  />
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-primary font-bold text-base hover:opacity-90 transition-all shadow-orange-500/20 active:scale-[0.98]">
            Відправити
          </Button>
        </form>
      </div>
    </div>
  );
}
