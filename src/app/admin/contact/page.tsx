"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContactSettings, updateContactSettings } from "@/actions/contact-actions";
import { toast } from "sonner";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    instagram: "",
    twitter: "",
    facebook: ""
  });

  useEffect(() => {
    async function loadData() {
      const result = await getContactSettings();
      if (result.success && result.data) {
        setFormData({
            email: result.data.email,
            phone: result.data.phone,
            address: result.data.address,
            instagram: result.data.instagram,
            twitter: result.data.twitter,
            facebook: result.data.facebook
        });
      }
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await updateContactSettings(formData);
    setLoading(false);
    if (result.success) toast.success("✅ İletişim bilgileri güncellendi!");
    else toast.error("❌ Hata oluştu.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">İletişim Ayarları</h1>
          <p className="text-slate-400">Telefon, adres ve sosyal medya hesaplarını buradan yönet.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-6 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all gap-3">
          {loading ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
          Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SOL: İLETİŞİM BİLGİLERİ */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Mail className="text-emerald-500"/> Temel Bilgiler
          </h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Mail size={14}/> E-Posta Adresi</label>
            <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Phone size={14}/> Telefon Numarası</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><MapPin size={14}/> Adres</label>
            <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
          </div>
        </div>

        {/* SAĞ: SOSYAL MEDYA */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Instagram className="text-emerald-500"/> Sosyal Medya Linkleri
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Instagram size={14}/> Instagram URL</label>
            <input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Twitter size={14}/> Twitter / X URL</label>
            <input name="twitter" value={formData.twitter} onChange={handleChange} placeholder="https://twitter.com/..." className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Facebook size={14}/> Facebook URL</label>
            <input name="facebook" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/..." className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
          </div>
        </div>

      </div>
    </div>
  );
}