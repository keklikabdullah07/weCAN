"use client";

import { useState, useEffect } from "react";
import { 
  Save, Trash2, Plus, Zap, Shield, Users, Trophy, Heart, Star, Clock, MapPin, Smile, CheckCircle, Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeatures, saveFeature, deleteFeature } from "@/actions/feature-actions";
import { toast } from "sonner";

// BU LİSTE ZİYARETÇİ SAYFASIYLA AYNI OLMALI
const ICON_OPTIONS = [
  { name: "Shield", icon: Shield, label: "Güvenlik" },
  { name: "Users", icon: Users, label: "İnsanlar" },
  { name: "Trophy", icon: Trophy, label: "Başarı" },
  { name: "Zap", icon: Zap, label: "Hız" },
  { name: "Heart", icon: Heart, label: "Sağlık" },
  { name: "Star", icon: Star, label: "Yıldız" },
  { name: "Clock", icon: Clock, label: "Zaman" },
  { name: "MapPin", icon: MapPin, label: "Konum" },
  { name: "Smile", icon: Smile, label: "Mutluluk" },
  { name: "CheckCircle", icon: CheckCircle, label: "Onay" },
];

export default function AdminFeaturesPage() {
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);
  
  const initialForm = { id: "", icon: "Shield", title: "", description: "" };
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  async function loadData() {
    const result = await getFeatures();
    if (result.success) setFeatures(result.data || []);
  }

  useEffect(() => { loadData(); }, []);

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
    // Sayfanın en üstüne kaydır (Mobil uyumluluk için)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if(!formData.title || !formData.description) return toast.info("Lütfen başlık ve açıklama girin.");
    
    setLoading(true);
    const res = await saveFeature(formData);
    setLoading(false);
    
    if (res.success) {
      toast.success(isEditing ? "✅ Özellik güncellendi!" : "✅ Yeni özellik eklendi!");
      setFormData(initialForm);
      setIsEditing(false);
      loadData();
    } else {
      toast.error("❌ Hata oluştu.");
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Bu özelliği silmek istediğine emin misin?")) return;
    await deleteFeature(id);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Özellikler Yönetimi</h1>
          <p className="text-slate-400">"Neden Ben?" bölümündeki kartları buradan yönet.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SOL: DÜZENLEME FORMU (5 birim genişlik) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sticky top-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              {isEditing ? <Edit className="text-blue-400" /> : <Plus className="text-emerald-500" />} 
              {isEditing ? "Özelliği Düzenle" : "Yeni Kart Ekle"}
            </h3>

            <div className="space-y-5">
              {/* İkon Seçici */}
              <div>
                <label className="text-sm font-medium text-slate-400 mb-3 block">İkon Seçin</label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setFormData({ ...formData, icon: opt.name })}
                      className={`group p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all border ${
                        formData.icon === opt.name 
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                          : "bg-[#0f172a] border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                      }`}
                      title={opt.label}
                    >
                      <opt.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Başlık Input */}
              <div>
                <label className="text-sm font-medium text-slate-400 mb-1 block">Başlık</label>
                <input 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="Örn: Güvenli Eğitim" 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" 
                />
              </div>

              {/* Açıklama Input */}
              <div>
                <label className="text-sm font-medium text-slate-400 mb-1 block">Açıklama</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  rows={4}
                  placeholder="Kısa ve etkileyici bir açıklama yazın..." 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none transition-all" 
                />
              </div>

              {/* Butonlar */}
              <div className="flex gap-3 pt-2">
                {isEditing && (
                  <Button 
                    onClick={() => { setIsEditing(false); setFormData(initialForm); }} 
                    variant="ghost" 
                    className="flex-1 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    İptal
                  </Button>
                )}
                <Button 
                  onClick={handleSave} 
                  disabled={loading} 
                  className={`flex-1 font-bold py-6 rounded-xl text-white shadow-lg transition-all ${isEditing ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'}`}
                >
                  {loading ? "İşleniyor..." : isEditing ? "Güncelle" : "Listeye Ekle"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ: LİSTE GÖRÜNÜMÜ (7 birim genişlik) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Mevcut Liste ({features.length})</h3>
          </div>

          {features.length === 0 && (
             <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-10 text-center">
                <Zap size={48} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-500">Henüz hiç özellik eklenmemiş.</p>
             </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((item) => {
              // İkonu Bul
              const IconComponent = ICON_OPTIONS.find(opt => opt.name === item.icon)?.icon || Zap;
              
              return (
                <div 
                  key={item.id} 
                  className="bg-[#1e293b] border border-slate-800 p-5 rounded-2xl group hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all relative flex flex-col h-full"
                >
                  {/* Aksiyon Butonları (Hoverda görünür) */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors" title="Düzenle">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Sil">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-3">
                    <IconComponent size={20} />
                  </div>
                  
                  <h4 className="text-white font-bold text-lg mb-2 pr-12 line-clamp-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}