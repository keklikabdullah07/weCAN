"use server";

import { prisma } from "@/lib/prisma"; // Senin lib dosyan
import { revalidatePath } from "next/cache";

// 1. Paketleri Getir
export async function getPackages() {
  try {
    const packages = await prisma.pricingPackage.findMany({
      orderBy: { price: 'asc' }, // Ucuzdan pahalıya
    });
    return { success: true, data: packages };
  } catch (error) {
    return { success: false, error: "Paketler yüklenemedi." };
  }
}

// 2. Paket Kaydet (Hem Yeni Ekleme hem Güncelleme)
export async function savePackage(data: any) {
  try {
    const featuresList = typeof data.features === 'string' 
      ? data.features.split('\n').filter((f: string) => f.trim() !== '') 
      : data.features;

    if (data.id) {
      // ID varsa GÜNCELLE
      await prisma.pricingPackage.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          price: parseInt(data.price),
          unit: data.unit,
          isPopular: data.isPopular === true || data.isPopular === "true",
          buttonText: data.buttonText,
          features: featuresList
        }
      });
    } else {
      // ID yoksa YENİ OLUŞTUR
      await prisma.pricingPackage.create({
        data: {
          title: data.title,
          description: data.description,
          price: parseInt(data.price),
          unit: data.unit,
          isPopular: data.isPopular === true || data.isPopular === "true",
          buttonText: data.buttonText,
          features: featuresList
        }
      });
    }

    revalidatePath("/"); // Siteyi yenile
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "İşlem başarısız." };
  }
}

// 3. Paket Sil
export async function deletePackage(id: string) {
  try {
    await prisma.pricingPackage.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Silinemedi." };
  }
}