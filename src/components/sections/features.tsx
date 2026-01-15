"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Trophy, 
  Zap, 
  Heart, 
  Star, 
  Clock, 
  MapPin, 
  Smile, 
  CheckCircle 
} from "lucide-react";

// 1. İKON HARİTASI (İsim -> Bileşen)
// Buraya eklediğin her ikonu Admin panelinde de tanımlayacağız.
const ICON_MAP: any = {
  Shield, 
  Users, 
  Trophy, 
  Zap, 
  Heart, 
  Star, 
  Clock, 
  MapPin, 
  Smile,
  CheckCircle
};

// 2. VARSAYILAN VERİLER (Fallback)
// Veritabanı boşsa burası çalışır.
const DEFAULT_FEATURES = [
  { 
    icon: "Shield", 
    title: "Tam Güvenlik", 
    description: "Derslerde en üst düzey koruma ekipmanları ve güvenli sürüş teknikleri önceliğimizdir." 
  },
  { 
    icon: "Users", 
    title: "Birebir İlgi", 
    description: "Her öğrencinin seviyesine ve öğrenme hızına uygun, kişiselleştirilmiş antrenman programı." 
  },
  { 
    icon: "Trophy", 
    title: "Profesyonel Teknik", 
    description: "10 yıllık deneyimle, temelden ileri seviyeye doğru teknikleri en doğru şekilde öğrenin." 
  },
  { 
    icon: "Zap", 
    title: "Hızlı İlerleme", 
    description: "Özel metodolojimiz sayesinde, düşme korkusunu yenip kısa sürede şehre karışın." 
  },
];

interface FeaturesProps {
  features?: {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[] | null;
}

export function Features({ features }: FeaturesProps) {
  // Veri kontrolü: Veritabanından geleni al, yoksa varsayılanı kullan
  const displayFeatures = (features && features.length > 0) ? features : DEFAULT_FEATURES;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Başlık Bölümü */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 px-4 py-1 text-sm rounded-full">
              Farkımız Nedir?
            </Badge>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Sadece Paten Kaymayı Değil, <br />
            {/* DÜZELTME: bg-gradient-to-r kullanıldı */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              Güvenle Özgürleşmeyi Öğretiyorum
            </span>
          </motion.h2>
        </div>

        {/* Kartlar Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayFeatures.map((item, index) => {
            // String isminden İkon Bileşenini buluyoruz. Bulamazsa 'Zap' ikonunu koyar.
            const Icon = ICON_MAP[item.icon] || Zap;
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group cursor-default">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                      <Icon size={32} strokeWidth={1.5} className="transition-transform duration-500 group-hover:stroke-2" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {/* ARTIK SADECE DESCRIPTION KULLANIYORUZ */}
                      {item.description}
                    </p>

                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Alt Not */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
        >
            <p className="text-gray-400 text-sm">
                * Derslerimiz uluslararası güvenlik standartlarına uygun ekipmanlarla yapılmaktadır.
            </p>
        </motion.div>

      </div>
    </section>
  );
}