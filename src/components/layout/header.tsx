"use client"; // Sheet etkileşimi için client directive gerekli

import Link from "next/link";
import {
  Menu,
  Instagram,
  Twitter,
  Facebook,
  Home,
  User,
  Package,
  Zap,
  MessageCircle,
  ChevronRight,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "#about", label: "Hakkımda", icon: User },
  { href: "#courses", label: "Ders Paketleri", icon: Package },
  { href: "#features", label: "Neden Ben?", icon: Zap },
  { href: "#gallery", label: "Galeri", icon: Image },
  { href: "#contact", label: "İletişim", icon: MessageCircle },
];

export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group select-none">
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

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          {NAV_ITEMS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-indigo-600 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Link href="#contact">Hemen Başla</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl"
              >
                <Menu size={28} strokeWidth={1.5} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] flex flex-col h-full border-l border-white/20 bg-white/90 backdrop-blur-2xl p-0 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

              <SheetHeader className="px-6 pt-8 pb-6 text-left border-b border-gray-100/50">
                <SheetTitle className="flex items-center gap-3">
                  <Logo className="h-8 w-auto" />
                  <span className="text-indigo-950 font-bold text-xl">
                    We CAN
                  </span>
                </SheetTitle>
                <SheetDescription className="text-gray-500 text-sm pl-1">
                  Profesyonel Paten Eğitimi
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col p-4 gap-2 flex-grow overflow-y-auto">
                {NAV_ITEMS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-indigo-100 border border-transparent hover:border-indigo-50 transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <link.icon size={20} strokeWidth={2} />
                      </div>
                      <span className="text-lg font-semibold text-gray-600 group-hover:text-indigo-900 flex-grow">
                        {link.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-t from-white/80 to-transparent space-y-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-[1.02] transition-all"
                  >
                    <Link href="#contact">Randevu Al</Link>
                  </Button>
                </SheetClose>

                <div className="flex justify-center gap-4 pt-2">
                  {[Instagram, Twitter, Facebook].map((Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="p-3 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all"
                    >
                      <Icon size={18} />
                    </Link>
                  ))}
                </div>

                <p className="text-center text-xs text-gray-400 font-medium pt-2">
                  © 2026 Abdullah Keklik Tüm hakları saklıdır.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
