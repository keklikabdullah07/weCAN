import { Users, TrendingUp, Calendar, CreditCard, ArrowUpRight, MoreHorizontal } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Üst Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Panel Genel Bakış</h1>
          <p className="text-slate-400">Web sitenizin anlık performans durumu.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-[#1e293b] text-slate-300 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500">
            <option>Son 30 Gün</option>
            <option>Bu Hafta</option>
            <option>Bugün</option>
          </select>
        </div>
      </div>

      {/* İstatistik Kartları (Koyu & Modern) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Kart 1 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={60} className="text-emerald-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <Users size={24} />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Toplam Ziyaretçi</h3>
          <p className="text-3xl font-bold text-white">1,248</p>
        </div>

        {/* Kart 2 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar size={60} className="text-blue-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <Calendar size={24} />
            </div>
            <span className="flex items-center gap-1 text-blue-400 text-xs font-bold bg-blue-500/10 px-2 py-1 rounded-full">
              +5% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Yeni Başvuru</h3>
          <p className="text-3xl font-bold text-white">28</p>
        </div>

        {/* Kart 3 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard size={60} className="text-purple-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <CreditCard size={24} />
            </div>
            <span className="flex items-center gap-1 text-red-400 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-full">
              -2% <TrendingUp size={12} className="rotate-180" />
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Aktif Paketler</h3>
          <p className="text-3xl font-bold text-white">12</p>
        </div>

         {/* Kart 4 */}
         <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-all group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={60} className="text-orange-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
              +18% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Dönüşüm Oranı</h3>
          <p className="text-3xl font-bold text-white">%4.2</p>
        </div>
      </div>

      {/* Büyük Grafik Kartı (Görseldeki gibi) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Ziyaretçi Analizi</h3>
            <button className="text-emerald-500 text-sm font-medium hover:underline">Raporu Gör</button>
          </div>
          {/* Sahte Grafik Alanı - CSS ile Wave Effect */}
          <div className="h-64 w-full bg-gradient-to-b from-emerald-500/10 to-transparent rounded-xl border border-slate-700/50 relative overflow-hidden flex items-end">
            {/* Temsili Çubuklar */}
             <div className="w-full h-full flex items-end justify-between px-4 pb-0 gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                    <div key={i} style={{height: `${h}%`}} className="w-full bg-slate-700/30 rounded-t-sm hover:bg-emerald-500 transition-all duration-300"></div>
                ))}
             </div>
          </div>
        </div>

        {/* Sağ Liste Kartı */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
           <h3 className="text-lg font-bold text-white mb-6">Son Başvurular</h3>
           <div className="space-y-4">
              {[
                  {name: "Ayşe Yılmaz", plan: "Grup Dersi", time: "2 dk önce"},
                  {name: "Mehmet Demir", plan: "Özel Ders", time: "15 dk önce"},
                  {name: "Canan Kara", plan: "Paket 2", time: "1 saat önce"},
                  {name: "Ali Vural", plan: "Grup Dersi", time: "3 saat önce"},
              ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                              {item.name.charAt(0)}
                          </div>
                          <div>
                              <p className="text-sm font-medium text-slate-200">{item.name}</p>
                              <p className="text-xs text-slate-500">{item.plan}</p>
                          </div>
                      </div>
                      <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 bg-slate-800 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors">
               Tümünü Görüntüle
           </button>
        </div>
      </div>
    </div>
  );
}