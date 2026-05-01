import { Header } from "@/components/header/Header";
import "../globals.css";
import Footer from "@/components/footer/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
