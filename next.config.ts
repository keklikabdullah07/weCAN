import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 1. YENİ EKLENEN KISIM: Dosya Yükleme Limitini Artırıyoruz
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Varsayılan 1MB idi, 5MB yaptık.
    },
  },

  // 👇 2. MEVCUT KISIM: Resim Gösterme İzinleri
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;