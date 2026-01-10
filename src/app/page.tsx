import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950">
      {/* Sadece Hero bileşeni hazır olduğu için şimdilik bunu açıyoruz */}
      <Hero />

      {/* Diğer bölümler hazır oldukça yorum satırlarını kaldırırsın */}
      <About />
      <Pricing />
      <Features />
      <Contact />
    </main>
  );
}
