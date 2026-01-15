"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

// Props Tanımı
interface GalleryProps {
  images?: {
    id: string;
    src: string;
    alt: string;
    className: string;
  }[] | null;
}

// Varsayılan Resimler
const defaultImages = [
  {
    id: "def1",
    src: "https://images.unsplash.com/photo-1552318415-bc6d50100d3d?auto=format&fit=crop&q=80&w=800",
    alt: "Paten Eğitimi",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "def2",
    src: "https://images.unsplash.com/photo-1502014822147-1aed80671e0a?auto=format&fit=crop&q=80&w=800",
    alt: "Sahil",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "def3",
    src: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&q=80&w=800",
    alt: "Akrobasi",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "def4",
    src: "https://images.unsplash.com/photo-1565128939626-4e50d1cb801f?auto=format&fit=crop&q=80&w=800",
    alt: "Grup",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "def5",
    src: "https://images.unsplash.com/photo-1534335552399-57788107954a?auto=format&fit=crop&q=80&w=800",
    alt: "Gece",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function Gallery({ images }: GalleryProps) {
  const displayImages = (images && images.length > 0) ? images : defaultImages;

  return (
    <section id="gallery" className="py-20 bg-white text-slate-900">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1 text-indigo-600 text-sm font-medium mb-4">
            <ImageIcon size={16} />
            <span>Anları Yakala</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Derslerden Kareler
          </h2>
          <p className="text-slate-500 text-lg">
            Sadece teknik değil, dostluk ve eğlence de öğretiyoruz. İşte
            ekibimizden bazı anlar.
          </p>
        </div>

        {/* 👇 GÜNCELLENEN KISIM BURASI 👇
            - h-[800px] ve md:h-[600px] SİLİNDİ (Artık yükseklik serbest)
            - md:grid-rows-2 SİLİNDİ (Satır sayısı serbest)
            - auto-rows-[300px] EKLENDİ (Her yeni satır 300px yüksekliğinde olacak)
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {displayImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              // className içindeki col-span ayarları veritabanından geliyor, 
              // ama row-span-2 dediğimizde artık 300px * 2 = 600px yer kaplayacak
              className={`relative rounded-3xl overflow-hidden group min-h-[300px] ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}