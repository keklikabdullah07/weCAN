"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

// Rastgele paten görselleri (Unsplash'tan)
const images = [
  {
    src: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&q=80&w=800",
    alt: "Paten Eğitimi Başlangıç",
    className: "md:col-span-2 md:row-span-2", // Büyük resim
  },
  {
    src: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&q=80&w=800",
    alt: "Sahilde Sürüş",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&q=80&w=800",
    alt: "Akrobasi Denemeleri",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&q=80&w=800",
    alt: "Grup Dersi",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1471513671800-b09c87e1497c?auto=format&fit=crop&q=80&w=800",
    alt: "Gece Sürüşü",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function Gallery() {
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

        {/* Galeri Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl overflow-hidden group ${img.className}`}
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