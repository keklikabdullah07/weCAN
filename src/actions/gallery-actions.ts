"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// 1. Cloudinary Ayarlarını Yap
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Resimleri Getir (Aynı kaldı)
export async function getGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: images };
  } catch (error) {
    return { success: false, error: "Galeri yüklenemedi." };
  }
}

// 3. Resim Yükle ve Kaydet (Burası değişti!)
export async function addGalleryImage(formData: FormData) {
  try {
    // A. ÖNCE LİMİT KONTROLÜ
    const count = await prisma.galleryImage.count();
    if (count >= 5) {
      return { success: false, error: "Galeri limiti dolu! (Maksimum 5 resim)" };
    }

    // B. Formdan verileri al
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;
    const size = formData.get("size") as string;

    if (!file || file.size === 0) {
      return { success: false, error: "Dosya seçilmedi." };
    }

    // C. Dosyayı Buffer'a çevir (Cloudinary'ye göndermek için)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // D. Cloudinary'ye Yükle (Promise ile sarmalıyoruz)
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "we-can-paten" }, // Cloudinary'de bu klasöre kaydeder
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // E. Gelen Resim Linkini (URL) Veritabanına Yaz
    const className = size === "large" 
      ? "md:col-span-2 md:row-span-2" 
      : "md:col-span-1 md:row-span-1";

    await prisma.galleryImage.create({
      data: {
        src: uploadResult.secure_url, // Cloudinary'den gelen güvenli link
        alt: alt || "Galeri Görseli",
        className: className,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Upload Hatası:", error);
    return { success: false, error: "Resim yüklenirken hata oluştu." };
  }
}

// 4. Silme İşlemi (Aynı kaldı)
export async function deleteGalleryImage(id: string) {
  try {
    await prisma.galleryImage.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Silinemedi." };
  }
}