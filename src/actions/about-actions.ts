"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Cloudinary Ayarları (Zaten .env dosyasından okuyacak)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAboutContent() {
  try {
    let about = await prisma.aboutSection.findFirst();

    if (!about) {
      about = await prisma.aboutSection.create({
        data: {
          title: "Paten Kaymak Sadece Bir Spor Değil, Bir Özgürlüktür.",
          description: "Merhaba! Ben Can. 10 yılı aşkın süredir İstanbul sokaklarında paten kayıyorum.",
          imageUrl: "/file.jpg",
          students: "500+",
          hours: "2000+",
          experience: "10+",
          features: ["Güvenli Eğitim", "Kişiye Özel Program"]
        },
      });
    }
    return { success: true, data: about };
  } catch (error) {
    return { success: false, error: "Veri yüklenemedi." };
  }
}

// GÜNCELLENEN KISIM: FormData kabul ediyor ve Resim Yüklüyor
export async function updateAboutContent(formData: FormData) {
  try {
    const existing = await prisma.aboutSection.findFirst();
    
    // 1. Formdan verileri çek
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const students = formData.get("students") as string;
    const hours = formData.get("hours") as string;
    const experience = formData.get("experience") as string;
    const featuresString = formData.get("features") as string;
    
    // Özellikleri array yap
    const featuresList = featuresString.split('\n').filter(f => f.trim() !== '');

    // 2. RESİM YÜKLEME İŞLEMİ
    const file = formData.get("imageFile") as File;
    let finalImageUrl = formData.get("currentImageUrl") as string; // Eğer yeni resim yoksa eskisi kalsın

    // Eğer yeni bir dosya seçildiyse Cloudinary'ye yükle
    if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "we-can-paten/about" }, // Klasör adı
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });
        
        finalImageUrl = uploadResult.secure_url;
    }

    // 3. Veritabanını Güncelle
    if (existing) {
      await prisma.aboutSection.update({
        where: { id: existing.id },
        data: {
          title, description, students, hours, experience,
          features: featuresList,
          imageUrl: finalImageUrl, // Yeni veya eski resim linki
        },
      });
    } else {
      await prisma.aboutSection.create({
        data: {
          title, description, students, hours, experience,
          features: featuresList,
          imageUrl: finalImageUrl,
        },
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Güncelleme başarısız." };
  }
}