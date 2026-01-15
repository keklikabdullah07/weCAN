"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Type, FileText, MousePointer2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHeroContent, updateHeroContent } from "@/actions/hero-actions"; // 👇 Az önce yazdığımız ajan
import { toast } from "sonner";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(false);
  
  // Form verisi
  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    description: "",
    buttonText: ""
  });

  // Sayfa yüklenince mevcut veriyi çek
  useEffect(() => {
    async function loadData() {
      const result = await getHeroContent();
      if (result.success && result.data) {
        setFormData({
          badge: result.data.badge,
          title: result.data.title,
          description: result.data.description,
          buttonText: result.data.buttonText
        });
      }
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Gerçek güncelleme işlemi
    const result = await updateHeroContent(formData);
    
    setLoading(false);

    if (result.success) {
      toast.success("✅ Ana sayfa başarıyla güncellendi!");
    } else {
      toast.error("❌ Hata: " + result.error);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Üst Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ana Sayfa Yönetimi</h1>
          <p className="text-slate-400">Sitenin giriş (Hero) bölümündeki yazıları buradan düzenleyebilirsin.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-6 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-3"
        >
          {loading ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
          {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: EDİTÖR */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Type className="text-emerald-500" />
              Hero Bölümü Metinleri
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <BadgeCheck size={16} /> Rozet Metni
                </label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Type size={16} /> Ana Başlık (H1)
                </label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-bold text-lg resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <FileText size={16} /> Açıklama Metni
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <MousePointer2 size={16} /> Buton Yazısı
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: CANLI ÖNİZLEME */}
        <div className="lg:col-span-1">
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sticky top-8">
            <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Canlı Önizleme</h3>
            
            <div className="bg-indigo-950 rounded-2xl p-6 text-center border border-indigo-900 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 -right-10 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] text-indigo-200 mb-3 border border-white/10">
                  {formData.badge || "Yükleniyor..."}
                </span>
                <h4 className="text-xl font-bold text-white mb-3 leading-tight">
                  {formData.title}
                </h4>
                <p className="text-xs text-indigo-200 mb-4 leading-relaxed line-clamp-3">
                  {formData.description}
                </p>
                <button className="bg-white text-indigo-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  {formData.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}