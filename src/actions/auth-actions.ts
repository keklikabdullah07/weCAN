"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar-123");

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Kullanıcıyı Bul
    let user = await prisma.adminUser.findUnique({ where: { email } });

    // 🔥 HACK: Eğer veritabanında hiç kullanıcı yoksa, bu girmeye çalışanı OTOMATİK admin yapalım.
    // (İlk kurulum kolaylığı için)
   if (!user) {
      const count = await prisma.adminUser.count();
      if (count === 0) { // <--- SORUN BURADA: Sadece 0 ise izin veriyor
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await prisma.adminUser.create({
          data: { email, password: hashedPassword }
        });
      } else {
        return { error: "Kullanıcı bulunamadı." };
      }
    }

    // 2. Şifreyi Kontrol Et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Hatalı şifre!" };
    }

    // 3. Jeton (Token) Oluştur
    const token = await new SignJWT({ email: user.email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h") // 24 saat geçerli
      .sign(SECRET_KEY);

    // 4. Çerezi (Cookie) Yapıştır
    // (await cookies()) Next.js 15+ için gereklidir, eski sürümse await kaldırılabilir.
    (await cookies()).set("admin_session", token, {
      httpOnly: true, // JavaScript ile erişilemez (Güvenlik)
      secure: process.env.NODE_ENV === "production", // Sadece HTTPS'de çalışır
      maxAge: 60 * 60 * 24, // 1 gün
      path: "/",
    });

  } catch (error) {
    return { error: "Bir hata oluştu." };
  }

  // İşlem bitince yönlendir (Try-Catch dışında olmalı)
  redirect("/admin/homepage");
}

// Çıkış Yapma Fonksiyonu
export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}