"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Props tipi tanımı
interface AboutProps {
  content?: {
    title: string;
    description: string;
    imageUrl: string;
    students: string;
    hours: string;
    experience: string;
    features: string[];
  } | null;
}

export function About({ content }: AboutProps) {
  // Varsayılan Değerler (Fallback)
  const title = content?.title || "Paten Kaymak Sadece Bir Spor Değil, Bir Özgürlüktür.";
  const description = content?.description || "Merhaba! Ben Can. Profesyonel paten eğitmeniyim.";
  const imageUrl = content?.imageUrl || "/file.jpg";
  const features = content?.features || ["Güvenli Eğitim", "Kişiye Özel Program"];
  
  const stats = [
    { label: "Mutlu Öğrenci", value: content?.students || "500+", icon: Users },
    { label: "Ders Saati", value: content?.hours || "2000+", icon: Clock },
    { label: "Yıllık Deneyim", value: content?.experience || "10+", icon: Award },
  ];

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* SOL TARA: RESİM */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white z-10">
              <Image
                src={imageUrl}
                alt="Can - Paten Eğitmeni"
                width={600}
                height={800}
                className="object-cover w-full h-125 lg:h-150 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-medium text-orange-300 mb-1 uppercase tracking-wider">
                  Profesyonel Eğitmen
                </p>
                <h3 className="text-3xl font-bold">Can</h3>
              </div>
            </div>
            {/* Dekoratif Çerçeve */}
            <div className="absolute top-8 -left-8 w-full h-full border-4 border-indigo-100 rounded-[2.5rem] -z-10 hidden md:block"></div>
            
            {/* Yüzen Kart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-12 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20 animate-bounce-slow"
            >
              <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <Award size={28} strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Profesyonel</p>
                <p className="text-indigo-900 font-bold text-sm">Eğitmen</p>
              </div>
            </motion.div>
          </motion.div>

          {/* SAĞ TARAF: İÇERİK */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div>
              <Badge variant="outline" className="border-indigo-200 text-indigo-600 bg-indigo-50 mb-4 px-4 py-1 text-sm rounded-full">
                Hakkımda
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 whitespace-pre-line">
                {title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Özellik Listesi (Maddeler) */}
            <div className="space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, i) => (
                <Card key={i} className="border-none shadow-lg bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
                    <stat.icon className="w-8 h-8 text-indigo-300 mb-2 group-hover:text-indigo-600 transition-colors" />
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}