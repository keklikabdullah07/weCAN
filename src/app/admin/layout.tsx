"use client";

import Link from "next/link";
// 👇 1. Çıkış fonksiyonunu import ediyoruz
import { logout } from "@/actions/auth-actions";
import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
  Image as GalleryIcon,
  Search,
  Bell,
  Home,
  Feather,
  ContactRound, // Contact2Icon yerine ContactRound daha yaygın, yoksa değiştirebilirsin
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 font-sans">
      {/* SOL MENÜ (SIDEBAR) - Koyu Tema */}
      <aside className="w-72 bg-[#1e293b] border-r border-slate-800 flex-col hidden md:flex fixed h-full z-20">
        {/* Logo Alanı */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="font-bold text-white text-xl">W</span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              We CAN
            </h2>
            <p className="text-slate-400 text-xs font-medium">Admin Paneli</p>
          </div>
        </div>

        {/* Menü Linkleri */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Menü
          </p>

          {/* Linkler - Senin tasarımınla birebir aynı */}
          <Link
            href="/admin/homepage"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all group"
          >
            <Home size={20} />
            <span className="font-medium group-hover:translate-x-1 transition-transform">
              HomePage
            </span>
          </Link>
          
          <Link
            href="/admin/about"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all group"
          >
            <Users size={20} />
            <span className="font-medium group-hover:translate-x-1 transition-transform">
              Hakkımda & Bio
            </span>
          </Link>

          <Link
            href="/admin/packages"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all group"
          >
            <Package size={20} />
            <span className="font-medium group-hover:translate-x-1 transition-transform">
              Ders Paketleri
            </span>
          </Link>

          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all group"
          >
            <GalleryIcon size={20} />
            <span className="font-medium group-hover:translate-x-1 transition-transform">
              Galeri Yönetimi
            </span>
          </Link>

          <Link
            href="/admin/features"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all group"
          >
            <Feather size={20} />
            <span className="font-medium group-hover:translate-x-1 transition-transform">
              Neden Ben?
            </span>
          </Link>

          <Link
            href="/admin/contact"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all group"
          >
            <ContactRound size={20} />
            <span className="font-medium group-hover:translate-x-1 transition-transform">
              İletişim
            </span>
          </Link>
        </nav>

        {/* 👇 GÜNCELLENEN KISIM: Alt Profil Alanı (Çıkış Fonksiyonu Eklendi) */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => logout()} // Tıklanınca çıkış yap
            className="w-full bg-slate-800/50 p-3 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                AK
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">CanPaten.</p>
                <p className="text-xs text-slate-400">Yönetici</p>
              </div>
            </div>
            <LogOut
              size={18}
              className="text-slate-500 group-hover:text-red-400 transition-colors"
            />
          </button>
        </div>
      </aside>

      {/* SAĞ TARAF (HEADER + İÇERİK) */}
      {/* ml-72 ekledik çünkü sidebar fixed ve 72 birim genişliğinde */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden md:ml-72">
        {/* Topbar */}
        <header className="h-20 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-10 sticky top-0">
          {/* <div className="flex items-center gap-4 text-slate-400">
            <Search size={20} />
            <input
              type="text"
              placeholder="Admin içinde ara..."
              className="bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 w-64 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-slate-400 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </button>
            <div className="w-px h-8 bg-slate-800 mx-2"></div>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all">
              + Hızlı İşlem
            </button>
          </div> */}
        </header>

        {/* Scroll Edilebilir İçerik Alanı */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0f172a]">
          {children}
        </div>
      </main>
    </div>
  );
}