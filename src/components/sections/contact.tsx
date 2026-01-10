"use client";

import { useActionState } from "react";
import { sendEmail } from "@/actions/send-email";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook,
  Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
// Select bileşenlerini import ediyoruz
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState = {
  success: false,
  message: "",
};

export function Contact() {
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gray-50">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] -z-10 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-200/30 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hadi Konuşalım
          </h2>
          <p className="text-gray-500 text-lg">
            Aklına takılanlar mı var? Formu doldur, direkt bana düşsün.
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl shadow-indigo-100 border-none rounded-[2.5rem] bg-white flex flex-col lg:flex-row max-w-6xl mx-auto min-h-[600px]">
          {/* SOL TARAF (Bilgiler) */}
          <div className="bg-indigo-900 p-10 md:p-16 text-white lg:w-5/12 flex flex-col justify-between relative overflow-hidden">
             {/* ... Dekorasyonlar ... */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div>
              <h3 className="text-2xl font-bold mb-6">İletişim</h3>
              <p className="text-indigo-200 mb-8">Sorularınızı bekliyorum.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-orange-400"/> info@weCANcan.com
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-orange-400"/> +90 546 449 28 80
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-orange-400"/> Kadıköy, İstanbul
                </div>
              </div>
            </div>
            <div className="mt-12 flex gap-4">
              <Instagram size={20} className="hover:text-orange-400 cursor-pointer transition-colors"/> 
              <Twitter size={20} className="hover:text-orange-400 cursor-pointer transition-colors"/> 
              <Facebook size={20} className="hover:text-orange-400 cursor-pointer transition-colors"/>
            </div>
          </div>

          {/* SAĞ TARAF (FORM) */}
          <div className="p-10 md:p-16 lg:w-7/12 bg-white flex flex-col justify-center">
            {state.success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Harika!</h3>
                <p className="text-gray-500 text-lg">{state.message}</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="mt-8">
                  Yeni Mesaj Gönder
                </Button>
              </motion.div>
            ) : (
              <form action={formAction} className="space-y-6">
                {!state.success && state.message && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm">
                    <AlertCircle size={18} /> {state.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Adınız</label>
                    <Input name="name" placeholder="Adınız" required className="bg-gray-50 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Soyadınız</label>
                    <Input name="surname" placeholder="Soyadınız" required className="bg-gray-50 h-12 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">E-Posta</label>
                        <Input name="email" type="email" placeholder="ornek@email.com" required className="bg-gray-50 h-12 rounded-xl" />
                    </div>
                    
                    {/* YENİ: TELEFON ALANI */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Telefon</label>
                        <Input name="phone" type="tel" placeholder="0555 123 45 67" required className="bg-gray-50 h-12 rounded-xl" />
                    </div>
                </div>

                {/* YENİ: DERS SEÇİMİ (SELECT) */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">İlgilendiğiniz Ders</label>
                    {/* Select bileşeni 'name' prop'u sayesinde FormData'ya değer gönderir */}
                    <Select name="course" required>
                        <SelectTrigger className="bg-gray-50 h-12 rounded-xl w-full">
                            <SelectValue placeholder="Bir paket seçin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Deneme Dersi (250₺)">Deneme Dersi (250₺)</SelectItem>
                            <SelectItem value="Standart Paket (1200₺)">Standart Paket (1200₺)</SelectItem>
                            <SelectItem value="Profesyonel Paket (2200₺)">Profesyonel Paket (2200₺)</SelectItem>
                            <SelectItem value="Bilgi Almak İstiyorum">Sadece Bilgi Almak İstiyorum</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Mesajınız</label>
                  <Textarea
                    name="message"
                    placeholder="Mesajınızı buraya yazın..."
                    required
                    className="bg-gray-50 min-h-[120px] rounded-xl p-4 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all"
                >
                  {isPending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Gönderiliyor...</>
                  ) : (
                    <><Send className="mr-2 h-5 w-5" /> Mesajı Gönder</>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}