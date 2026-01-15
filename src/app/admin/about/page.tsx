"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, User, Image as ImageIcon, Award, List, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAboutContent, updateAboutContent } from "@/actions/about-actions";
import Image from "next/image";
import { toast } from "sonner";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false);
  
  // Form verileri
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "", // Mevcut resim linki
    students: "",
    hours: "",
    experience: "",
    features: ""
  });

  // Yeni seçilen dosya
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Önizleme için geçici URL
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const result = await getAboutContent();
      if (result.success && result.data) {
        setFormData({
          title: result.data.title,
          description: result.data.description,
          imageUrl: result.data.imageUrl,
          students: result.data.students,
          hours: result.data.hours,
          experience: result.data.experience,
          features: result.data.features.join("\n")
        });
      }
    }
    loadData();
  }, []);

  // Dosya seçilince çalışır
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Seçilen resmin önizlemesini oluştur
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);

    // FormData oluştur (Dosya göndermek için şart)
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("students", formData.students);
    data.append("hours", formData.hours);
    data.append("experience", formData.experience);
    data.append("features", formData.features);
    data.append("currentImageUrl", formData.imageUrl); // Eski resim linkini de gönder

    if (selectedFile) {
        data.append("imageFile", selectedFile); // Yeni dosya varsa ekle
    }

    const result = await updateAboutContent(data);
    
    setLoading(false);
    if (result.success) {
        toast.success("✅ Hakkımda bölümü güncellendi!");
        // Sayfayı yenilemeye gerek yok ama temiz bir deneyim için verileri tazeleyebiliriz
        if(selectedFile) setSelectedFile(null); 
    }
    else {
        toast.error("❌ Hata oluştu.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hakkımda Yönetimi</h1>
          <p className="text-slate-400">Profil bilgileri ve fotoğrafı buradan düzenle.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-6 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all gap-3">
          {loading ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
          {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SOL: METİNLER VE RESİM */}
        <div className="space-y-6">
            
            {/* RESİM YÜKLEME ALANI */}
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ImageIcon className="text-emerald-500"/> Profil Fotoğrafı</h3>
                
                <div className="flex items-start gap-6">
                    {/* Önizleme Kutusu */}
                    <div className="w-32 h-40 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden relative shrink-0">
                        {(previewUrl || formData.imageUrl) ? (
                            <Image 
                                src={previewUrl || formData.imageUrl} 
                                alt="Profil" 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <User size={32} />
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-400 mb-2">Yeni Fotoğraf Yükle</label>
                        <div className="relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all cursor-pointer"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            * Önerilen: Dikey formatta, net bir fotoğraf. (Max 5MB)
                        </p>
                    </div>
                </div>
            </div>

            {/* METİN ALANLARI */}
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><User className="text-emerald-500"/> Genel Bilgiler</h3>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Başlık</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Açıklama (Bio)</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:border-emerald-500 outline-none resize-none" />
                </div>
            </div>
        </div>

        {/* SAĞ: İSTATİSTİKLER VE ÖZELLİKLER */}
        <div className="space-y-6">
            {/* İstatistikler */}
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Award className="text-emerald-500"/> İstatistikler</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">Öğrenci</label>
                        <input type="text" name="students" value={formData.students} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-white text-center font-bold" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">Ders Saati</label>
                        <input type="text" name="hours" value={formData.hours} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-white text-center font-bold" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">Deneyim</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-white text-center font-bold" />
                    </div>
                </div>
            </div>

            {/* Özellikler */}
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><List className="text-emerald-500"/> Özellik Listesi</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Her satıra bir özellik yazın:</label>
                    <textarea name="features" value={formData.features} onChange={handleChange} rows={5} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:border-emerald-500 outline-none resize-none font-mono text-sm" placeholder="- Güvenli Eğitim&#10;- Ekipman Desteği" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}