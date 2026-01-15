import { Users, DollarSign, CalendarCheck, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // Şimdilik sahte verilerle tasarımı görelim
  const stats = [
    { label: "Toplam Öğrenci", value: "124", icon: Users, color: "bg-blue-500" },
    { label: "Aylık Kazanç", value: "₺45,250", icon: DollarSign, color: "bg-green-500" },
    { label: "Tamamlanan Ders", value: "850+", icon: CalendarCheck, color: "bg-purple-500" },
    { label: "Büyüme Oranı", value: "%18", icon: TrendingUp, color: "bg-orange-500" },
  ];

  const recentStudents = [
    { name: "Ahmet Yılmaz", plan: "Başlangıç Paketi", date: "Bugün, 14:30", status: "Onaylandı" },
    { name: "Zeynep Demir", plan: "Pro Paket", date: "Dün, 09:15", status: "Bekliyor" },
    { name: "Mehmet Kaya", plan: "Grup Dersi", date: "12 Ocak", status: "Tamamlandı" },
    { name: "Ayşe Çelik", plan: "Başlangıç Paketi", date: "10 Ocak", status: "Onaylandı" },
  ];

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Hoş Geldin, Şampiyon 👋</h1>
        <p className="text-slate-500">İşte We CAN Paten Akademisi'nin güncel durumu.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg shadow-indigo-100`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Son Kayıtlar Tablosu */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-900">Son Başvurular</h3>
          <button className="text-sm text-indigo-600 font-medium hover:underline">Tümünü Gör</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="p-4 font-medium">Öğrenci Adı</th>
                <th className="p-4 font-medium">Paket</th>
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentStudents.map((student, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{student.name}</td>
                  <td className="p-4 text-slate-600">{student.plan}</td>
                  <td className="p-4 text-slate-500 text-sm">{student.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === "Onaylandı" ? "bg-green-100 text-green-700" :
                      student.status === "Bekliyor" ? "bg-yellow-100 text-yellow-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}