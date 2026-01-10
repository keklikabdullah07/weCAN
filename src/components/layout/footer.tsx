import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { Logo } from "../shared/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mb-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 group select-none"
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Logo className="h-11 w-auto" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-2xl text-indigo-950 tracking-tighter leading-none -mb-1">
                  We CAN
                </span>
                <span className="text-sm font-bold text-orange-500 tracking-widest uppercase ml-0.5 leading-none">
                  Paten
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              İstanbul'un en kapsamlı profesyonel paten eğitimi. Güvenli,
              eğlenceli ve teknik odaklı derslerle özgürlüğe sürün.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <span>Kadıköy, İstanbul</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Hızlı Erişim</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="#about"
                  className="hover:text-indigo-600 transition"
                >
                  Hakkımda
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-indigo-600 transition"
                >
                  Ders Paketleri
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-indigo-600 transition"
                >
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-indigo-600 transition"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Takipte Kalın</h3>
            <div className="flex gap-4 mb-6">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                <Facebook size={20} />
              </Link>
            </div>
            <a
              href="mailto:info@skatepro.com"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition"
            >
              <Mail className="h-4 w-4" />
              info@skatepro.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Abdullah Keklik Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
