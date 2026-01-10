"use client";

import { DollarSign, Users, ShoppingBag, TrendingUp, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminDashboard() {
  const stats = [
    { title: "Toplam Gelir", value: "₺42,500.00", change: "+12.4%", icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
    { title: "Aktif Öğrenci", value: "1,280", change: "Canlı", icon: Users, color: "bg-indigo-100 text-indigo-600" },
    { title: "Satılan Paket", value: "452", change: "Stabil", icon: ShoppingBag, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Üst İstatistikler (Referanstaki Soft Kartlar) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-transparent hover:border-indigo-100 transition-all cursor-default group"
          >
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
               </div>
               <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-50 text-gray-500">
                  {stat.change}
               </span>
            </div>
            <div>
               <p className="text-sm font-medium text-gray-400 mb-1">{stat.title}</p>
               <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Alt Bölüm (Grafik ve Liste Yerleşimi) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Sol Geniş Alan (Grafik Taklidi) */}
         <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] min-h-[400px] flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-xl font-bold text-gray-800">Performans Özeti</h3>
                   <p className="text-sm text-gray-400">Son 30 günlük verileriniz.</p>
                </div>
                <button className="text-sm font-semibold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl hover:bg-gray-100">
                   Aylık Görünüm
                </button>
             </div>
             
             {/* Mor Grafik Çizgisi (CSS ile yapılmış basit bir görsel) */}
             <div className="mt-auto h-48 w-full flex items-end justify-between px-4 gap-2 opacity-80">
                 {[40, 60, 45, 70, 50, 80, 65, 90].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-t from-indigo-500/20 to-transparent rounded-t-2xl relative group" style={{ height: `${h}%` }}>
                       <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-500 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                 ))}
             </div>
         </div>

         {/* Sağ Liste Alanı */}
         <div className="bg-white p-6 rounded-[32px] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] h-full">
             <h3 className="text-lg font-bold text-gray-800 mb-6 px-2">Son Aktiviteler</h3>
             <div className="space-y-4">
                {[
                   { name: "Ahmet Y.", action: "Paket Satın Aldı", time: "2dk önce" },
                   { name: "Selin D.", action: "Kayıt Oldu", time: "15dk önce" },
                   { name: "Canan E.", action: "Mesaj Attı", time: "1s önce" },
                   { name: "Mehmet K.", action: "Yorum Yaptı", time: "3s önce" },
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                      <Avatar className="h-10 w-10 border border-gray-100">
                         <AvatarFallback className="bg-indigo-50 text-indigo-600 text-xs font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            {item.name.charAt(0)}
                         </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                         <p className="text-sm font-bold text-gray-800">{item.name}</p>
                         <p className="text-xs text-gray-400">{item.action}</p>
                      </div>
                      <span className="text-[10px] text-gray-300 font-medium">{item.time}</span>
                   </div>
                ))}
             </div>
             <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                Tümünü Gör
             </button>
         </div>

      </div>

    </div>
  );
}