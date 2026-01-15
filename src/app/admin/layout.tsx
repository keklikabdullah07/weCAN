import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  CreditCard 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SOL MENÜ (SIDEBAR) */}
      <aside className="w-64 bg-indigo-950 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-indigo-800">
          <h2 className="text-2xl font-bold tracking-tight">We CAN</h2>
          <p className="text-indigo-400 text-xs tracking-widest uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-indigo-900/50 text-white rounded-xl transition-all hover:bg-indigo-800">
            <LayoutDashboard size={20} />
            <span className="font-medium">Genel Bakış</span>
          </Link>
          
          <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 text-indigo-300 hover:bg-indigo-900 hover:text-white rounded-xl transition-all">
            <Users size={20} />
            <span className="font-medium">Öğrenciler</span>
          </Link>

          <Link href="/admin/calendar" className="flex items-center gap-3 px-4 py-3 text-indigo-300 hover:bg-indigo-900 hover:text-white rounded-xl transition-all">
            <Calendar size={20} />
            <span className="font-medium">Takvim</span>
          </Link>

          <Link href="/admin/payments" className="flex items-center gap-3 px-4 py-3 text-indigo-300 hover:bg-indigo-900 hover:text-white rounded-xl transition-all">
            <CreditCard size={20} />
            <span className="font-medium">Ödemeler</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-indigo-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* SAĞ TARAF (İÇERİK ALANI) */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}