"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Veriyi Getir (Site açılırken ve Admin paneli açılırken çalışır)
export async function getHeroContent() {
  try {
    // İlk kaydı bulmaya çalış
    let hero = await prisma.heroSection.findFirst();

    // Eğer hiç kayıt yoksa (ilk kurulum), varsayılan bir tane oluştur
    if (!hero) {
      hero = await prisma.heroSection.create({
        data: {
          badge: "Pro Eğitmenle Tanışın",
          title: "Özgürlüğe Giden Yolu Patenle Keşfet.",
          description: "Kişiye özel derslerle dengenizi bulun, korkularınızı yenin.",
          buttonText: "Dersleri İncele",
        },
      });
    }

    return { success: true, data: hero };
  } catch (error) {
    return { success: false, error: "Veri yüklenemedi." };
  }
}

// 2. Veriyi Güncelle (Admin panelinde 'Kaydet'e basınca çalışır)
export async function updateHeroContent(formData: any) {
  try {
    // Mevcut kaydı bul
    const existingHero = await prisma.heroSection.findFirst();

    if (existingHero) {
      // Varsa güncelle
      await prisma.heroSection.update({
        where: { id: existingHero.id },
        data: {
          badge: formData.badge,
          title: formData.title,
          description: formData.description,
          buttonText: formData.buttonText,
        },
      });
    } else {
      // Yoksa (çok düşük ihtimal ama) oluştur
      await prisma.heroSection.create({
        data: { ...formData },
      });
    }

    // Next.js'e "Git ana sayfayı yenile, eski veriyi önbellekten sil" diyoruz
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { success: false, error: "Güncelleme başarısız." };
  }
}