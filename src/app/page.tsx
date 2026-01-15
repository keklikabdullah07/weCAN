import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Features } from "@/components/sections/features";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { getHeroContent } from "@/actions/hero-actions";
import { getAboutContent } from "@/actions/about-actions";
import { getGalleryImages } from "@/actions/gallery-actions";
import { getFeatures } from "@/actions/feature-actions";
// 👇 1. İletişim ajanını import et
import { getContactSettings } from "@/actions/contact-actions";

export default async function Home() {
  // Hepsini tek seferde çekiyoruz (Bomba gibi çalışır)
  const [heroData, aboutData, galleryData, featuresData, contactData] =
    await Promise.all([
      getHeroContent(),
      getAboutContent(),
      getGalleryImages(),
      getFeatures(),
      getContactSettings(), // 👇 2. Veriyi çek
    ]);

  const heroContent = heroData.success ? heroData.data : null;
  const aboutContent = aboutData.success ? aboutData.data : null;
  const galleryImages = galleryData.success ? galleryData.data : null;
  const featuresList = featuresData.success ? featuresData.data : null;
  const contactSettings = contactData.success ? contactData.data : null; // 👇 3. Değişkene ata

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Pricing />
      <Features features={featuresList} />
      <Gallery images={galleryImages} />

      <Contact content={contactSettings} />
    </main>
  );
}
