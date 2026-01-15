"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Getir
export async function getFeatures() {
  try {
    const features = await prisma.featureItem.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return { success: true, data: features };
  } catch (error) {
    return { success: false, error: "Yüklenemedi." };
  }
}

// 2. Kaydet (Ekle veya Güncelle)
export async function saveFeature(data: any) {
  try {
    if (data.id) {
      await prisma.featureItem.update({
        where: { id: data.id },
        data: {
          icon: data.icon,
          title: data.title,
          description: data.description,
        }
      });
    } else {
      await prisma.featureItem.create({
        data: {
          icon: data.icon,
          title: data.title,
          description: data.description,
        }
      });
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Kaydedilemedi." };
  }
}

// 3. Sil
export async function deleteFeature(id: string) {
  try {
    await prisma.featureItem.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Silinemedi." };
  }
}