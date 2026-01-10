import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "weCAN - Özgürlüğe Sür",
  description: "Profesyonel Paten Eğitimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        {/* Bütün sayfalar bu body'nin içine yerleşecek */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
