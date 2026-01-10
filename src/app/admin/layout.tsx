"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  BarChart2
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sidebar açık mı kapalı mı?
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Menü Linkleri
  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/inventory", label: "Envanter", icon: Package },
    { href: "/admin/customers", label: "Müşteriler", icon: Users },
    { href: "/admin/analytics", label: "Analizler", icon: BarChart2 },
    { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    // ZEMİN: Referans görseldeki açık gri/mavi ton (#F0F3F8)
    // p-4 gap-4: Sidebar ve içeriğin ekrandan kopuk (floating) durmasını sağlar
    <div className="flex h-screen w-full bg-[#F0F3F8] p-4 gap-5 font-sans overflow-hidden transition-all duration-300">
      
      {/* --- SIDEBAR (SOL BLOK) --- */}
      <aside 
        className={`relative bg-white rounded-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col shrink-0 transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-[100px] px-0 items-center" : "w-[280px] px-6"
        }`}
      >
        
        {/* Toggle (Aç/Kapa) Butonu - Çizgi Üzerinde */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-12 z-50 h-8 w-8 bg-white rounded-full shadow-md border border-indigo-50 flex items-center justify-center text-[#6C5DD3] hover:scale-110 transition-transform"
        >
           {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* 1. Logo Alanı */}
        <div className={`h-32 flex items-center ${isCollapsed ? "justify-center" : "gap-4"}`}>
           <div className="bg-[#6C5DD3] h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
             <Logo className="h-6 w-6 text-white" />
           </div>
           
           {/* İsim sadece açıksa görünür */}
           <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
               <span className="font-extrabold text-2xl text-[#11142D] tracking-tight">SkatePro</span>
           </div>
        </div>

        {/* 2. Menü Linkleri */}
        <nav className="flex-1 space-y-3 py-4 overflow-y-auto overflow-x-hidden w-full">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : ""}
                className={`flex items-center h-14 rounded-[20px] transition-all duration-300 group ${
                   isCollapsed ? "justify-center w-14 mx-auto" : "px-5 w-full gap-4"
                } ${
                  isActive
                    ? "bg-[#6C5DD3] text-white shadow-xl shadow-indigo-200" // Aktif: Mor
                    : "text-[#808191] hover:text-[#6C5DD3] hover:bg-indigo-50" // Pasif
                }`}
              >
                {/* İkon */}
                <item.icon 
                   size={24} 
                   strokeWidth={isActive ? 2.5 : 2} 
                   className="shrink-0 transition-transform duration-300 group-hover:scale-110" 
                />
                
                {/* Yazı */}
                <span className={`font-bold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}>
                    {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Alt Profil Alanı */}
        <div className={`mb-8 transition-all duration-300 ${isCollapsed ? "px-2" : ""}`}>
           <div className={`flex items-center bg-[#F7F7F9] p-2 rounded-[24px] ${isCollapsed ? "justify-center h-14 w-14" : "gap-3 pr-4"}`}>
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
                 <AvatarImage src={session?.user?.image || ""} />
                 <AvatarFallback className="bg-[#FF754C] text-white font-bold">A</AvatarFallback>
              </Avatar>
              
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"}`}>
                 <span className="text-sm font-bold text-[#11142D] truncate">{session?.user?.name || "Yönetici"}</span>
                 <span className="text-xs text-[#808191] font-semibold truncate">Admin</span>
              </div>

              <button 
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className={`ml-auto text-[#808191] hover:text-red-500 transition-colors ${isCollapsed ? "hidden" : "block"}`}
              >
                 <LogOut size={18} />
              </button>
           </div>
        </div>
      </aside>


      {/* --- SAĞ İÇERİK (HEADER + MAIN) --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F0F3F8]">
        
        {/* Header (Yuvarlak ve Beyaz) */}
        <header className="h-24 flex items-center justify-between shrink-0 px-4">
           {/* Arama Alanı */}
           <div className="relative w-full max-w-lg hidden md:block">
              <Search className="absolute left-6 top-5 h-5 w-5 text-[#808191]" />
              <input 
                 type="text" 
                 placeholder="Analizler, siparişler veya öğrenciler arasında arayın..."
                 className="w-full h-14 pl-16 pr-6 bg-white rounded-[24px] text-sm font-semibold text-[#11142D] placeholder-[#B2B3BD] outline-none shadow-sm focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all"
              />
           </div>

           {/* Bildirim İkonu */}
           <div className="flex items-center gap-6 ml-auto">
              <button className="h-14 w-14 bg-white rounded-[20px] flex items-center justify-center text-[#808191] shadow-sm hover:text-[#6C5DD3] transition-colors relative">
                 <Bell size={24} />
                 <span className="absolute top-4 right-4 h-2.5 w-2.5 bg-[#FF754C] border-2 border-white rounded-full"></span>
              </button>
           </div>
        </header>

        {/* Scroll Edilebilir İçerik */}
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scroll-smooth">
           {children}
        </div>

      </main>

    </div>
  );
}