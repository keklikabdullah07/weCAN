"use client";

import { useState, useEffect } from "react";
import { Save, Trash2, Plus, Package, Edit, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getPackages,
  savePackage,
  deletePackage,
} from "@/actions/pricing-actions";
import { toast } from "sonner";

export default function AdminPricingPage() {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);

  // Form State
  const initialForm = {
    id: "",
    title: "",
    description: "",
    price: 0,
    unit: "/ Aylık",
    isPopular: false,
    buttonText: "Satın Al",
    features: "", // Textarea için string
  };
  const [formData, setFormData] = useState(initialForm);

  // Verileri Yükle
  async function loadData() {
    const result = await getPackages();
    if (result.success) setPackages(result.data || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Form İşlemleri
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (pkg: any) => {
    setFormData({
      ...pkg,
      features: pkg.features.join("\n"), // Array'i string'e çevir
    });
    window.scrollTo({ top: 500, behavior: "smooth" }); // Forma kaydır
  };

  const handleNew = () => {
    setFormData(initialForm);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await savePackage(formData);
    if (res.success) {
      toast.success("✅ Paket kaydedildi!");
      loadData();
      setFormData(initialForm);
    } else {
      toast.error("❌ Hata oluştu.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu paketi silmek istediğine emin misin?")) return;
    await deletePackage(id);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ders Paketleri</h1>
          <p className="text-slate-400">
            Fiyatları ve paket içeriklerini buradan yönet.
          </p>
        </div>
        <Button
          onClick={handleNew}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Paket Ekle
        </Button>
      </div>

      {/* LİSTE GÖRÜNÜMÜ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => handleEdit(pkg)}
            className={`cursor-pointer group relative bg-[#1e293b] border transition-all rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 ${
              pkg.id === formData.id
                ? "border-emerald-500 ring-1 ring-emerald-500"
                : "border-slate-800 hover:border-slate-600"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800 rounded-xl text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <Package size={24} />
              </div>
              {pkg.isPopular && (
                <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full border border-yellow-500/20">
                  Popüler
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
            <p className="text-slate-400 text-sm mb-4 h-10 line-clamp-2">
              {pkg.description}
            </p>
            <div className="text-2xl font-bold text-white">
              ₺{pkg.price}{" "}
              <span className="text-sm text-slate-500 font-normal">
                {pkg.unit}
              </span>
            </div>
          </div>
        ))}

        {/* Yeni Ekle Kartı */}
        <div
          onClick={handleNew}
          className="cursor-pointer border-2 border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-emerald-500 hover:text-emerald-500 transition-all min-h-[200px]"
        >
          <Plus size={40} className="mb-2" />
          <span className="font-medium">Yeni Paket Oluştur</span>
        </div>
      </div>

      {/* DÜZENLEME FORMU */}
      <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-8 mt-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Edit className="text-emerald-500" />
            {formData.id ? "Paketi Düzenle" : "Yeni Paket Oluştur"}
          </h3>
          {formData.id && (
            <Button
              onClick={() => handleDelete(formData.id)}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Trash2 size={16} /> Sil
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400">Paket Adı</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                placeholder="Örn: Özel Ders"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Açıklama</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                placeholder="Kısa açıklama..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Fiyat (TL)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Birim</label>
                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                  placeholder="/ Ders"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-xl border border-slate-700">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="w-5 h-5 accent-emerald-500"
              />
              <label className="text-sm text-slate-300">
                Bu paketi "Popüler" olarak işaretle
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400">
                Özellikler (Her satıra bir tane)
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={8}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none resize-none"
                placeholder="- Kask Dahil&#10;- Haftada 2 Gün&#10;- Video Analizi"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Buton Yazısı</label>
              <input
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-emerald-500/20"
          >
            {loading ? "Kaydediliyor..." : "Kaydet ve Yayınla"}
          </Button>
        </div>
      </div>
    </div>
  );
}
