import { Header } from "@/components/header/Header";
import "../globals.css";
import Footer from "@/components/footer/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
        headers: await headers()
    });
  return (
    <>
      <Header initialSession={session}/>
      {children}
      <Footer />
    </>
  );
}
