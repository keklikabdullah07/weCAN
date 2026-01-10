import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    // items-center ve justify-between KALKTI.
    // Artık bölümler tam genişlik (full width) olacak.
    <main className="flex min-h-screen flex-col bg-slate-950">
      <Hero />
      <About />
      <Pricing />
      <Features />
      <Contact />
    </main>
  );
}
