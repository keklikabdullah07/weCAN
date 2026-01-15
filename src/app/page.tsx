import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Features } from "@/components/sections/features";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    // DEĞİŞEN KISIM: bg-slate-950 -> bg-white yaptık.
    <main className="flex min-h-screen flex-col bg-white">
      
      <Hero />
      <About />
      <Pricing />
      <Features />
      <Gallery />
      <Contact />
      
    </main>
  );
}