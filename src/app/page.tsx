import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Pricing } from "@/components/sections/pricing";
import { Features } from "@/components/sections/features";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />

      <About />

      <Pricing />

      <Features />

      <Contact />
    </main>
  );
}
