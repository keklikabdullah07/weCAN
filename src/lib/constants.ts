// src/lib/constants.ts
import {
  Shield,
  Zap,
  Clock,
  Users,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

// Menü Linkleri
export const NAV_LINKS = [
  { href: "#about", label: "Hakkımda" },
  { href: "#courses", label: "Dersler" },
  { href: "#features", label: "Neden Ben?" },
  { href: "#gallery", label: "Galeri" },
  { href: "#contact", label: "İletişim" },
];

// İstatistikler
export const STATS = [
  { value: "10+", label: "Yıllık Deneyim" },
  { value: "500+", label: "Mutlu Öğrenci" },
  { value: "2000+", label: "Saat Ders" },
];

// Özellikler (Neden Ben?)
export const FEATURES = [
  {
    icon: Shield,
    title: "Önce Güvenlik",
    desc: "Dersler, kasktan dizliğe kadar tam ekipman güvenliği ile başlar.",
  },
  {
    icon: Zap,
    title: "Kişisel Hız",
    desc: "Eğitimler öğrenme hızınıza göre şekillenir, asla zorlanmazsınız.",
  },
  {
    icon: Clock,
    title: "Esnek Saatler",
    desc: "Hafta içi veya hafta sonu, size uygun zaman dilimini planlarız.",
  },
  {
    icon: Users,
    title: "Tüm Yaş Grupları",
    desc: "Çocuklardan yetişkinlere herkes için yaş grubuna özel pedagoji.",
  },
];

// Fiyat Paketleri
export const PACKAGES = [
  {
    title: "Deneme Dersi",
    price: "250",
    unit: "/ saat",
    description: "İlk adımı atmak isteyenler için",
    features: [
      "Temel Denge Eğitimi",
      "Güvenlik Ekipmanı Bilgisi",
      "1'e 1 Sürüş Deneyimi",
    ],
    isPopular: false,
    buttonText: "Hemen Al",
  },
  {
    title: "Standart Paket",
    price: "1200",
    unit: "/ 4 Ders",
    description: "Patenini alıp gelenler için",
    features: [
      "İleri Sürüş ve Fren Teknikleri",
      "Araç ve Engeller",
      "Geri Kayma Başlangıç",
      "Esnek Program",
    ],
    isPopular: true,
    buttonText: "Satın Al",
  },
  {
    title: "Profesyonel Paket",
    price: "2200",
    unit: "/ 10 Ders",
    description: "Usta olmak isteyenler",
    features: [
      "Kentsel Paten Teknikleri",
      "Özgür Slalom Eğitimi",
      "Ders İçi Video Analiz",
    ],
    isPopular: false,
    buttonText: "İletişime Geç",
  },
];
