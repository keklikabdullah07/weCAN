"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Bilgileri Getir
export async function getContactSettings() {
  try {
    let settings = await prisma.contactSettings.findFirst();

    // Eğer hiç ayar yoksa varsayılan oluştur
    if (!settings) {
      settings = await prisma.contactSettings.create({
        data: {
          email: "info@ornek.com",
          phone: "+90 555 000 00 00",
          address: "İstanbul, Türkiye",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
          facebook: "https://facebook.com"
        }
      });
    }

    return { success: true, data: settings };
  } catch (error) {
    return { success: false, error: "İletişim bilgileri yüklenemedi." };
  }
}

// 2. Bilgileri Güncelle
export async function updateContactSettings(data: any) {
  try {
    const existing = await prisma.contactSettings.findFirst();

    if (existing) {
      await prisma.contactSettings.update({
        where: { id: existing.id },
        data: {
          email: data.email,
          phone: data.phone,
          address: data.address,
          instagram: data.instagram,
          twitter: data.twitter,
          facebook: data.facebook,
        },
      });
    } else {
      await prisma.contactSettings.create({ data });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Güncelleme başarısız." };
  }
}