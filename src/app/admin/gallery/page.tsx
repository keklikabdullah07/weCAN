"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Image as ImageIcon, LayoutGrid, Maximize, AlertTriangle, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "@/actions/gallery-actions";
import Image from "next/image";
import { toast } from "sonner";

export default function AdminGalleryPage() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  
  // State artık sadece metinleri tutuyor, dosyayı form submit anında alacağız
  const [altText, setAltText] = useState("");
  const [size, setSize] = useState<"small" | "large">("small");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Limit kontrolü
  const MAX_IMAGES = 5;
  const isLimitReached = images.length >= MAX_IMAGES;

  async function loadData() {
    const result = await getGalleryImages();
    if (result.success) setImages(result.data || []);
  }

  useEffect(() => { loadData(); }, []);

  const handleAdd = async () => {
    if (isLimitReached) return toast.error("Kota dolu! Önce bir resim silmelisin.");
    if (!selectedFile) return toast.info("Lütfen bir resim dosyası seçin.");
    
    setLoading(true);

    // Form Verisi Oluştur (Dosya göndermek için FormData şart)
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("alt", altText);
    formData.append("size", size);

    const res = await addGalleryImage(formData); // Server Action'a gönder
    setLoading(false);

    if (res.success) {
      toast.success("✅ Resim yüklendi!");
      setAltText("");
      setSelectedFile(null); // Dosyayı temizle
      setSize("small");
      // Inputu da görsel olarak sıfırla
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if(fileInput) fileInput.value = "";
      
      loadData(); 
    } else {
      toast.error("❌ " + (res.error || "Hata oluştu."));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu resmi silmek istiyor musun?")) return;
    await deleteGalleryImage(id);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Galeri Yönetimi</h1>
          <p className="text-slate-400">Bilgisayarından fotoğraf yükle.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl font-bold border ${isLimitReached ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'}`}>
          Kota: {images.length} / {MAX_IMAGES}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL: YÜKLEME FORMU */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sticky top-6 shadow-xl relative overflow-hidden">
            
            {isLimitReached && (
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 border-2 border-red-500/50 rounded-2xl">
                <AlertTriangle size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Galeri Dolu!</h3>
                <p className="text-slate-300 text-sm">Yeni resim yüklemek için mevcutlardan birini silmelisin.</p>
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UploadCloud className="text-emerald-500" /> Fotoğraf Yükle
            </h3>

            <div className={`space-y-4 ${isLimitReached ? 'opacity-20 pointer-events-none' : ''}`}>
              
              {/* DOSYA SEÇME ALANI */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Fotoğraf Seç</label>
                <div className="relative">
                    <input 
                      id="fileInput"
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all cursor-pointer"
                    />
                </div>
                {selectedFile && (
                    <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                        <ImageIcon size={12}/> Seçildi: {selectedFile.name}
                    </p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Açıklama (Alt Text)</label>
                <input 
                  type="text" 
                  value={altText} 
                  onChange={(e) => setAltText(e.target.value)} 
                  placeholder="Örn: Gece Sürüşü" 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" 
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-3 block">Görünüm Boyutu</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSize("small")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${size === "small" ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-[#0f172a] border-slate-700 text-slate-500 hover:border-slate-500"}`}
                  >
                    <LayoutGrid size={20} />
                    <span className="text-xs font-bold">Küçük Kare</span>
                  </button>
                  <button 
                    onClick={() => setSize("large")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${size === "large" ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-[#0f172a] border-slate-700 text-slate-500 hover:border-slate-500"}`}
                  >
                    <Maximize size={20} />
                    <span className="text-xs font-bold">Büyük (2x2)</span>
                  </button>
                </div>
              </div>

              <Button onClick={handleAdd} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 rounded-xl font-bold mt-4 shadow-lg shadow-emerald-500/20">
                {loading ? "Yükleniyor..." : "Buluta Yükle & Kaydet"}
              </Button>
            </div>
          </div>
        </div>

        {/* SAĞ: GALERİ LİSTESİ */}
        <div className="lg:col-span-2">
           <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 min-h-[500px]">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-slate-400 text-sm font-bold uppercase">Mevcut Resimler</h3>
               <span className="text-xs text-slate-500">Maksimum 5 adet</span>
             </div>
             
             {images.length === 0 ? (
               <div className="text-center py-20 text-slate-500">
                 <UploadCloud size={48} className="mx-auto mb-4 opacity-20" />
                 <p>Henüz resim yüklenmemiş.</p>
               </div>
             ) : (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
                 {images.map((img) => (
                   <div 
                    key={img.id} 
                    className={`relative group rounded-xl overflow-hidden border border-slate-700 ${img.className === "md:col-span-2 md:row-span-2" ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
                   >
                     <Image src={img.src} alt={img.alt} fill className="object-cover" />
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors" title="Sil">
                         <Trash2 size={18} />
                       </button>
                     </div>
                     {img.className.includes("col-span-2") && (
                        <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">BÜYÜK</span>
                     )}
                   </div>
                 ))}
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}