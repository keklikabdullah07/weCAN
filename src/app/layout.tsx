import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/aut-provider";
// Yeni oluşturduğumuz provider'ı ekliyoruz

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkatePro - Profesyonel Paten Eğitimi",
  description: "Özel paten dersleri ile özgürlüğe sür.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={inter.className}>
        {/* Tüm uygulamayı oturum sağlayıcı ile sarmalıyoruz */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}